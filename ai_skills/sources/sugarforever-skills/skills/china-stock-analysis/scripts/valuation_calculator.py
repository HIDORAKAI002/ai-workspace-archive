#!/usr/bin/env python3
"""
A股估值计算器
提供DCF、DDM、相对估值等多种估值方法

依赖: pip install pandas numpy
"""

import argparse
import json
import sys
from datetime import datetime
from typing import Optional, Dict

try:
    import pandas as pd
    import numpy as np
except ImportError:
    print("错误: 请先安装依赖库")
    print("pip install pandas numpy")
    sys.exit(1)


class ValuationCalculator:
    """估值计算器"""

    def __init__(self, stock_data: Dict = None):
        self.stock_data = stock_data or {}
        self.results = {}

    def load_data(self, file_path: str):
        """从JSON文件加载股票数据"""
        with open(file_path, 'r', encoding='utf-8') as f:
            self.stock_data = json.load(f)

    def dcf_valuation(self, discount_rate: float = 10,
                      forecast_years: int = 5,
                      terminal_growth: float = 3) -> Dict:
        """
        DCF现金流折现估值

        参数:
            discount_rate: 折现率 (%)
            forecast_years: 预测期年数
            terminal_growth: 永续增长率 (%)
        """
        result = {
            "method": "DCF现金流折现",
            "parameters": {
                "discount_rate": discount_rate,
                "forecast_years": forecast_years,
                "terminal_growth": terminal_growth
            },
            "calculation": {},
            "intrinsic_value": None,
            "per_share_value": None
        }

        # 获取现金流数据
        cash_flow = self.stock_data.get('financial_data', {}).get('cash_flow', [])
        basic_info = self.stock_data.get('basic_info', {})

        if not cash_flow:
            result["error"] = "无法获取现金流数据"
            return result

        try:
            # 计算历史自由现金流
            fcf_history = []
            for cf in cash_flow[:4]:  # 最近4个季度
                ocf = self._safe_float(cf.get('经营活动产生的现金流量净额', 0))
                capex = abs(self._safe_float(cf.get('购建固定资产、无形资产和其他长期资产支付的现金', 0)))
                if ocf is not None:
                    fcf = ocf - capex
                    fcf_history.append(fcf)

            if not fcf_history:
                result["error"] = "无法计算自由现金流"
                return result

            # 年化FCF (简单年化)
            annual_fcf = sum(fcf_history)
            result["calculation"]["当前年化FCF"] = annual_fcf

            # 估算增长率 (使用历史净利润增长率)
            indicators = self.stock_data.get('financial_indicators', [])
            growth_rate = 10  # 默认10%
            if indicators:
                hist_growth = self._safe_float(indicators[0].get('净利润增长率'))
                if hist_growth and -50 < hist_growth < 100:
                    growth_rate = min(max(hist_growth, 0), 30)  # 限制在0-30%之间

            result["calculation"]["预计增长率"] = growth_rate

            # 预测未来现金流
            r = discount_rate / 100
            g = growth_rate / 100
            tg = terminal_growth / 100

            pv_fcf = 0
            future_fcf = []
            for year in range(1, forecast_years + 1):
                fcf = annual_fcf * ((1 + g) ** year)
                pv = fcf / ((1 + r) ** year)
                pv_fcf += pv
                future_fcf.append({"year": year, "fcf": fcf, "pv": pv})

            result["calculation"]["预测期现金流现值"] = pv_fcf
            result["calculation"]["future_fcf"] = future_fcf

            # 终值计算 (Gordon模型)
            terminal_fcf = annual_fcf * ((1 + g) ** forecast_years) * (1 + tg)
            terminal_value = terminal_fcf / (r - tg)
            pv_terminal = terminal_value / ((1 + r) ** forecast_years)

            result["calculation"]["终值"] = terminal_value
            result["calculation"]["终值现值"] = pv_terminal

            # 总价值
            total_value = pv_fcf + pv_terminal
            result["intrinsic_value"] = total_value

            # 每股价值
            total_shares = self._parse_shares(basic_info.get('total_shares', ''))
            if total_shares:
                per_share = total_value / total_shares
                result["per_share_value"] = per_share

        except Exception as e:
            result["error"] = str(e)

        return result

    def ddm_valuation(self, required_return: float = 10,
                      dividend_growth: float = None) -> Dict:
        """
        DDM股息折现估值 (Gordon模型)

        参数:
            required_return: 要求回报率 (%)
            dividend_growth: 股息增长率 (%)，如果为None则自动计算
        """
        result = {
            "method": "DDM股息折现",
            "parameters": {
                "required_return": required_return
            },
            "calculation": {},
            "intrinsic_value": None,
            "per_share_value": None
        }

        # 获取分红数据
        dividend = self.stock_data.get('dividend', {})
        dividend_history = dividend.get('dividend_history', [])
        basic_info = self.stock_data.get('basic_info', {})

        if not dividend_history:
            result["error"] = "无分红历史数据"
            result["note"] = "该公司可能分红较少或不稳定，不适合DDM估值"
            return result

        try:
            # 计算最近股息
            recent_dividends = []
            for d in dividend_history[:5]:  # 最近5年
                div = self._safe_float(d.get('每股股利', d.get('派息', 0)))
                if div and div > 0:
                    recent_dividends.append(div)

            if len(recent_dividends) < 2:
                result["error"] = "分红数据不足，无法使用DDM"
                return result

            current_dividend = recent_dividends[0]
            result["calculation"]["当前每股股息"] = current_dividend

            # 计算股息增长率
            if dividend_growth is None:
                if len(recent_dividends) >= 2:
                    # 计算复合增长率
                    years = len(recent_dividends) - 1
                    cagr = (recent_dividends[0] / recent_dividends[-1]) ** (1 / years) - 1
                    dividend_growth = cagr * 100
                else:
                    dividend_growth = 3  # 默认3%

            # 限制增长率
            dividend_growth = min(max(dividend_growth, 0), required_return - 1)
            result["parameters"]["dividend_growth"] = dividend_growth
            result["calculation"]["股息增长率"] = dividend_growth

            # Gordon模型: P = D1 / (r - g)
            r = required_return / 100
            g = dividend_growth / 100
            d1 = current_dividend * (1 + g)

            if r <= g:
                result["error"] = "增长率不能大于或等于要求回报率"
                return result

            per_share_value = d1 / (r - g)
            result["per_share_value"] = per_share_value
            result["calculation"]["下期预期股息(D1)"] = d1

            # 总价值
            total_shares = self._parse_shares(basic_info.get('total_shares', ''))
            if total_shares:
                result["intrinsic_value"] = per_share_value * total_shares

        except Exception as e:
            result["error"] = str(e)

        return result

    def _assess_percentile(self, percentile: float) -> str:
        """根据分位数评估估值水平"""
        if percentile < 20:
            return "处于历史低位，可能被低估"
        elif percentile < 40:
            return "处于历史较低水平"
        elif percentile < 60:
            return "处于历史中等水平"
        elif percentile < 80:
            return "处于历史较高水平"
        return "处于历史高位，估值偏贵"

    def relative_valuation(self) -> Dict:
        """相对估值法，与行业均值和历史均值对比"""
        result = {
            "method": "相对估值",
            "current_valuation": {},
            "comparison": {},
            "assessment": {}
        }

        valuation = self.stock_data.get('valuation', {})
        price = self.stock_data.get('price', {})
        basic_info = self.stock_data.get('basic_info', {})

        try:
            current_pe = self._safe_float(basic_info.get('pe_ttm'))
            current_pb = self._safe_float(basic_info.get('pb'))

            if not current_pe and valuation.get('latest'):
                current_pe = self._safe_float(valuation['latest'].get('pe'))
                current_pb = self._safe_float(valuation['latest'].get('pb'))

            result["current_valuation"] = {
                "PE_TTM": current_pe,
                "PB": current_pb,
                "当前价格": price.get('latest_price')
            }

            pe_percentile = valuation.get('pe_percentile')
            pb_percentile = valuation.get('pb_percentile')

            result["comparison"]["PE历史分位数"] = pe_percentile
            result["comparison"]["PB历史分位数"] = pb_percentile

            # 估值评估
            if pe_percentile is not None:
                result["assessment"]["PE评估"] = self._assess_percentile(pe_percentile)
            if pb_percentile is not None:
                result["assessment"]["PB评估"] = self._assess_percentile(pb_percentile)

            # 计算基于历史均值的合理价格
            current_price = price.get('latest_price', 0)
            if current_pe and pe_percentile and pe_percentile > 0 and current_price and current_pe > 0:
                fair_pe = current_pe * (50 / pe_percentile)
                fair_price_pe = current_price * (fair_pe / current_pe)
                result["comparison"]["基于PE的合理价格"] = round(fair_price_pe, 2)

        except Exception as e:
            result["error"] = str(e)

        return result

    def calculate_margin_of_safety(self, intrinsic_value: float,
                                    current_price: float,
                                    margin_pct: float = 30) -> Dict:
        """计算安全边际"""
        result = {
            "intrinsic_value": intrinsic_value,
            "current_price": current_price,
            "margin_of_safety_required": margin_pct
        }

        if not (intrinsic_value and current_price):
            return result

        actual_margin = (intrinsic_value - current_price) / intrinsic_value * 100
        safety_price = intrinsic_value * (1 - margin_pct / 100)

        result["actual_margin_of_safety"] = round(actual_margin, 2)
        result["safety_price"] = round(safety_price, 2)

        if current_price < safety_price:
            result["conclusion"] = "低估 - 当前价格低于安全边际价格，具有投资价值"
        elif current_price < intrinsic_value:
            result["conclusion"] = "合理偏低 - 当前价格低于内在价值，但未达到安全边际"
        else:
            result["conclusion"] = "高估 - 当前价格高于内在价值"

        return result

    def comprehensive_valuation(self, discount_rate: float = 10,
                                 terminal_growth: float = 3,
                                 margin_of_safety: float = 30) -> Dict:
        """综合估值，结合多种方法得出估值结论"""
        result = {
            "code": self.stock_data.get('code', ''),
            "name": self.stock_data.get('basic_info', {}).get('name', ''),
            "valuation_date": datetime.now().isoformat(),
            "methods": {},
            "summary": {}
        }

        # 获取当前价格
        current_price = self.stock_data.get('price', {}).get('latest_price')

        # DCF估值
        dcf = self.dcf_valuation(discount_rate=discount_rate,
                                  terminal_growth=terminal_growth)
        result["methods"]["DCF"] = dcf

        # DDM估值
        ddm = self.ddm_valuation()
        result["methods"]["DDM"] = ddm

        # 相对估值
        relative = self.relative_valuation()
        result["methods"]["相对估值"] = relative

        # 汇总估值结果
        valuations = []
        if dcf.get('per_share_value'):
            valuations.append(("DCF", dcf['per_share_value']))
        if ddm.get('per_share_value'):
            valuations.append(("DDM", ddm['per_share_value']))
        if relative.get('comparison', {}).get('基于PE的合理价格'):
            valuations.append(("相对估值", relative['comparison']['基于PE的合理价格']))

        if valuations:
            avg_value = sum(v[1] for v in valuations) / len(valuations)
            result["summary"]["平均内在价值"] = round(avg_value, 2)
            result["summary"]["估值方法数"] = len(valuations)
            result["summary"]["各方法估值"] = {k: round(v, 2) for k, v in valuations}

            # 安全边际计算
            if current_price:
                margin = self.calculate_margin_of_safety(
                    avg_value, current_price, margin_of_safety
                )
                result["summary"]["安全边际分析"] = margin
                result["summary"]["当前价格"] = current_price
                result["summary"]["建议买入价"] = margin.get('safety_price')
                result["summary"]["投资结论"] = margin.get('conclusion')

        return result

    def _safe_float(self, value) -> Optional[float]:
        """安全转换为浮点数"""
        if value is None or value == '' or value == '--':
            return None
        try:
            if isinstance(value, str):
                value = value.replace('%', '').replace(',', '').replace('亿', '')
            return float(value)
        except (ValueError, TypeError):
            return None

    def _parse_shares(self, shares_str: str) -> Optional[float]:
        """解析股份数"""
        if not shares_str:
            return None
        try:
            if '亿' in str(shares_str):
                return float(shares_str.replace('亿', '')) * 100000000
            elif '万' in str(shares_str):
                return float(shares_str.replace('万', '')) * 10000
            else:
                return float(shares_str)
        except (ValueError, TypeError):
            return None


def main():
    parser = argparse.ArgumentParser(description="A股估值计算器")
    parser.add_argument("--input", type=str, help="输入数据文件 (JSON)")
    parser.add_argument("--code", type=str, help="股票代码 (如果不提供input)")
    parser.add_argument("--methods", type=str, default="all",
                       help="估值方法: dcf/ddm/relative/all")
    parser.add_argument("--discount-rate", type=float, default=10,
                       help="折现率 (%)")
    parser.add_argument("--terminal-growth", type=float, default=3,
                       help="永续增长率 (%)")
    parser.add_argument("--margin-of-safety", type=float, default=30,
                       help="安全边际要求 (%)")
    parser.add_argument("--output", type=str, help="输出文件路径 (JSON)")

    args = parser.parse_args()

    calculator = ValuationCalculator()

    if args.input:
        calculator.load_data(args.input)
    elif args.code:
        # 如果只提供代码，需要先获取数据
        print("请先使用 data_fetcher.py 获取数据，然后使用 --input 参数")
        sys.exit(1)
    else:
        print("请提供 --input 或 --code 参数")
        sys.exit(1)

    # 执行估值
    valuation_methods = {
        "dcf": lambda: calculator.dcf_valuation(
            discount_rate=args.discount_rate,
            terminal_growth=args.terminal_growth
        ),
        "ddm": calculator.ddm_valuation,
        "relative": calculator.relative_valuation,
    }

    if args.methods in valuation_methods:
        result = valuation_methods[args.methods]()
    else:
        result = calculator.comprehensive_valuation(
            discount_rate=args.discount_rate,
            terminal_growth=args.terminal_growth,
            margin_of_safety=args.margin_of_safety
        )

    # 输出
    output_json = json.dumps(result, ensure_ascii=False, indent=2, default=str)

    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(output_json)
        print(f"估值结果已保存到: {args.output}")
    else:
        print(output_json)


if __name__ == "__main__":
    main()
