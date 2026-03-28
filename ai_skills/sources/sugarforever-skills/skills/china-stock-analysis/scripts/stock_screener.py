#!/usr/bin/env python3
"""
A股股票筛选器
根据多种财务指标筛选符合条件的股票

依赖: pip install akshare pandas numpy
"""

import argparse
import json
import sys
import time
from datetime import datetime
from typing import List, Dict
from functools import wraps

try:
    import akshare as ak
    import pandas as pd
    import numpy as np
except ImportError:
    print("错误: 请先安装依赖库")
    print("pip install akshare pandas numpy")
    sys.exit(1)


def retry_on_failure(max_retries: int = 3, delay: float = 1.0):
    """网络请求重试装饰器"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            last_error = None
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_error = e
                    if attempt < max_retries - 1:
                        print(f"  重试 ({attempt + 1}/{max_retries})...")
                        time.sleep(delay * (attempt + 1))
            raise last_error
        return wrapper
    return decorator


INDEX_CODE_MAP = {
    "hs300": "000300",
    "zz500": "000905",
    "zz1000": "000852",
    "cyb": "399006",
    "kcb": "000688"
}


class StockScreener:
    """股票筛选器"""

    def __init__(self):
        self.all_stocks_data = None

    def load_stock_data(self, scope: str = "hs300", custom_codes: List[str] = None) -> pd.DataFrame:
        """加载股票数据"""
        print(f"正在加载股票数据 (范围: {scope})...")

        try:
            if scope == "all":
                df = ak.stock_zh_a_spot_em()
            elif scope in INDEX_CODE_MAP:
                df = self._get_index_stocks_data(INDEX_CODE_MAP[scope])
            elif scope.startswith("custom:") or custom_codes:
                codes = custom_codes or scope.replace("custom:", "").split(",")
                df = self._get_custom_stocks_data(codes)
            else:
                df = ak.stock_zh_a_spot_em()

            self.all_stocks_data = df
            print(f"已加载 {len(df)} 只股票数据")
            return df

        except Exception as e:
            print(f"加载数据失败: {e}")
            return pd.DataFrame()

    @retry_on_failure(max_retries=3, delay=2.0)
    def _get_all_stocks_realtime(self) -> pd.DataFrame:
        """获取全部A股实时数据（带重试）"""
        return ak.stock_zh_a_spot_em()

    @retry_on_failure(max_retries=3, delay=2.0)
    def _get_index_constituents(self, index_code: str) -> list:
        """获取指数成分股列表（带重试）"""
        df = ak.index_stock_cons(symbol=index_code)
        return df['品种代码'].tolist()

    def _get_index_stocks_data(self, index_code: str) -> pd.DataFrame:
        """获取指数成分股数据"""
        try:
            # 获取成分股列表
            print(f"  获取指数 {index_code} 成分股...")
            codes = self._get_index_constituents(index_code)
            print(f"  成分股数量: {len(codes)}")

            # 获取实时数据
            print("  获取实时行情...")
            all_stocks = self._get_all_stocks_realtime()
            df = all_stocks[all_stocks['代码'].isin(codes)]
            return df
        except Exception as e:
            print(f"获取指数成分股失败: {e}")
            return pd.DataFrame()

    def _get_custom_stocks_data(self, codes: List[str]) -> pd.DataFrame:
        """获取自定义股票列表数据"""
        try:
            all_stocks = self._get_all_stocks_realtime()
            df = all_stocks[all_stocks['代码'].isin(codes)]
            return df
        except Exception as e:
            print(f"获取自定义股票数据失败: {e}")
            return pd.DataFrame()

    def _apply_numeric_filter(self, df: pd.DataFrame, column: str,
                               min_val: float = None, max_val: float = None) -> pd.DataFrame:
        """应用数值筛选条件"""
        if column not in df.columns:
            return df

        numeric_col = pd.to_numeric(df[column], errors='coerce')
        if min_val is not None:
            df = df[numeric_col >= min_val]
        if max_val is not None:
            df = df[numeric_col <= max_val]
        return df

    def _find_column(self, df: pd.DataFrame, candidates: List[str]) -> str:
        """从候选列名中找到存在的列"""
        for col in candidates:
            if col in df.columns:
                return col
        return None

    def apply_filters(self, df: pd.DataFrame, filters: Dict) -> pd.DataFrame:
        """应用筛选条件"""
        filtered = df.copy()

        # PE筛选
        filtered = self._apply_numeric_filter(
            filtered, '市盈率-动态',
            min_val=filters.get('pe_min'),
            max_val=filters.get('pe_max')
        )

        # PB筛选
        filtered = self._apply_numeric_filter(
            filtered, '市净率',
            min_val=filters.get('pb_min'),
            max_val=filters.get('pb_max')
        )

        # ROE筛选
        if filters.get('roe_min') is not None:
            roe_col = self._find_column(filtered, ['净资产收益率', 'ROE', '加权净资产收益率'])
            if roe_col:
                filtered = self._apply_numeric_filter(filtered, roe_col, min_val=filters['roe_min'])

        # 资产负债率筛选
        filtered = self._apply_numeric_filter(
            filtered, '资产负债率',
            max_val=filters.get('debt_ratio_max')
        )

        # 总市值筛选（转换为亿）
        if '总市值' in filtered.columns:
            if filters.get('market_cap_min') is not None or filters.get('market_cap_max') is not None:
                filtered['总市值_亿'] = pd.to_numeric(filtered['总市值'], errors='coerce') / 1e8
                filtered = self._apply_numeric_filter(
                    filtered, '总市值_亿',
                    min_val=filters.get('market_cap_min'),
                    max_val=filters.get('market_cap_max')
                )

        return filtered

    def _get_numeric_value(self, row: pd.Series, column: str) -> float:
        """从行中获取数值，无效返回 NaN"""
        return pd.to_numeric(row.get(column, np.nan), errors='coerce')

    def calculate_score(self, row: pd.Series) -> float:
        """计算综合评分 (0-100)"""
        score = 50

        try:
            # PE评分 (越低越好, 负数除外)
            pe = self._get_numeric_value(row, '市盈率-动态')
            if not np.isnan(pe) and pe > 0:
                if pe < 10:
                    score += 15
                elif pe < 15:
                    score += 10
                elif pe < 20:
                    score += 5
                elif pe > 50:
                    score -= 10

            # PB评分
            pb = self._get_numeric_value(row, '市净率')
            if not np.isnan(pb) and pb > 0:
                if 0.5 < pb < 1.5:
                    score += 10
                elif 1.5 <= pb < 3:
                    score += 5
                elif pb > 5:
                    score -= 5

            # ROE评分
            roe_col = self._find_column(row.index.to_frame(), ['净资产收益率', 'ROE', '加权净资产收益率'])
            if roe_col:
                roe = self._get_numeric_value(row, roe_col)
                if not np.isnan(roe):
                    if roe > 20:
                        score += 15
                    elif roe > 15:
                        score += 10
                    elif roe > 10:
                        score += 5
                    elif roe < 5:
                        score -= 5

            # 涨跌幅评分 (下跌可能是机会)
            change = self._get_numeric_value(row, '涨跌幅')
            if not np.isnan(change):
                if -5 < change < 0:
                    score += 3
                elif change < -5:
                    score += 5

        except Exception:
            pass

        return max(0, min(100, score))

    def screen(self, scope: str = "hs300", filters: Dict = None,
              sort_by: str = "score", top_n: int = None) -> List[Dict]:
        """执行筛选"""
        # 加载数据
        if scope.startswith("custom:"):
            codes = scope.replace("custom:", "").split(",")
            df = self.load_stock_data(scope="custom", custom_codes=codes)
        else:
            df = self.load_stock_data(scope=scope)

        if df.empty:
            return []

        # 应用筛选条件
        if filters:
            df = self.apply_filters(df, filters)

        if df.empty:
            return []

        # 计算评分
        df['评分'] = df.apply(self.calculate_score, axis=1)

        # 排序
        if sort_by == "score":
            df = df.sort_values('评分', ascending=False)
        elif sort_by == "pe":
            pe_col = '市盈率-动态' if '市盈率-动态' in df.columns else None
            if pe_col:
                df = df.sort_values(pe_col, ascending=True)
        elif sort_by == "pb":
            if '市净率' in df.columns:
                df = df.sort_values('市净率', ascending=True)
        elif sort_by == "market_cap":
            if '总市值' in df.columns:
                df = df.sort_values('总市值', ascending=False)

        # 限制数量
        if top_n:
            df = df.head(top_n)

        # 转换为结果列表
        results = []
        for _, row in df.iterrows():
            result = {
                "代码": row.get('代码', ''),
                "名称": row.get('名称', ''),
                "最新价": row.get('最新价', ''),
                "涨跌幅": row.get('涨跌幅', ''),
                "市盈率": row.get('市盈率-动态', ''),
                "市净率": row.get('市净率', ''),
                "总市值(亿)": round(float(row.get('总市值', 0)) / 100000000, 2) if row.get('总市值') else '',
                "评分": row.get('评分', 50)
            }
            results.append(result)

        return results


def main():
    parser = argparse.ArgumentParser(description="A股股票筛选器")
    parser.add_argument("--scope", type=str, default="hs300",
                       help="筛选范围: all/hs300/zz500/zz1000/cyb/kcb/custom:代码1,代码2")
    parser.add_argument("--pe-max", type=float, help="最大PE")
    parser.add_argument("--pe-min", type=float, help="最小PE")
    parser.add_argument("--pb-max", type=float, help="最大PB")
    parser.add_argument("--pb-min", type=float, help="最小PB")
    parser.add_argument("--roe-min", type=float, help="最小ROE (%)")
    parser.add_argument("--debt-ratio-max", type=float, help="最大资产负债率 (%)")
    parser.add_argument("--dividend-min", type=float, help="最小股息率 (%)")
    parser.add_argument("--market-cap-min", type=float, help="最小市值 (亿)")
    parser.add_argument("--market-cap-max", type=float, help="最大市值 (亿)")
    parser.add_argument("--sort-by", type=str, default="score",
                       choices=["score", "pe", "pb", "market_cap"],
                       help="排序方式")
    parser.add_argument("--top", type=int, default=50, help="返回前N只股票")
    parser.add_argument("--output", type=str, help="输出文件路径 (JSON)")

    args = parser.parse_args()

    # 构建筛选条件
    filter_keys = [
        'pe_max', 'pe_min', 'pb_max', 'pb_min', 'roe_min',
        'debt_ratio_max', 'dividend_min', 'market_cap_min', 'market_cap_max'
    ]
    filters = {
        k: getattr(args, k.replace('-', '_'))
        for k in filter_keys
        if getattr(args, k.replace('-', '_')) is not None
    }

    # 执行筛选
    screener = StockScreener()
    results = screener.screen(
        scope=args.scope,
        filters=filters if filters else None,
        sort_by=args.sort_by,
        top_n=args.top
    )

    # 输出结果
    output = {
        "screen_time": datetime.now().isoformat(),
        "scope": args.scope,
        "filters": filters,
        "count": len(results),
        "results": results
    }

    output_json = json.dumps(output, ensure_ascii=False, indent=2, default=str)

    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(output_json)
        print(f"筛选结果已保存到: {args.output}")
        print(f"共筛选出 {len(results)} 只股票")
    else:
        print(output_json)


if __name__ == "__main__":
    main()
