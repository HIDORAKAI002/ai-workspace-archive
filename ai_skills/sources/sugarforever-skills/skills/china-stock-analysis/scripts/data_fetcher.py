#!/usr/bin/env python3
"""
A股数据获取模块
使用akshare获取股票财务数据、行情数据、股东信息等

依赖: pip install akshare pandas
"""

import argparse
import json
import sys
import time
import os
from datetime import datetime, timedelta
from typing import Optional, Callable
from functools import wraps

try:
    import akshare as ak
    import pandas as pd
except ImportError:
    print("错误: 请先安装依赖库")
    print("pip install akshare pandas")
    sys.exit(1)


def retry_on_failure(max_retries: int = 3, delay: float = 1.0):
    """网络请求重试装饰器"""
    def decorator(func: Callable):
        @wraps(func)
        def wrapper(*args, **kwargs):
            last_error = None
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_error = e
                    if attempt < max_retries - 1:
                        time.sleep(delay * (attempt + 1))  # 递增等待
            return {"error": f"重试{max_retries}次后失败: {str(last_error)}"}
        return wrapper
    return decorator


def safe_float(value) -> Optional[float]:
    """安全转换为浮点数"""
    if value is None or value == '' or value == '--':
        return None
    try:
        if pd.isna(value):
            return None
        if isinstance(value, str):
            value = value.replace('%', '').replace(',', '').replace('亿', '')
        return float(value)
    except (ValueError, TypeError):
        return None


def get_cache_path(code: str, data_type: str) -> str:
    """获取缓存文件路径"""
    cache_dir = os.path.join(os.path.dirname(__file__), '.cache')
    os.makedirs(cache_dir, exist_ok=True)
    today = datetime.now().strftime('%Y%m%d')
    return os.path.join(cache_dir, f"{code}_{data_type}_{today}.json")


def load_cache(code: str, data_type: str) -> Optional[dict]:
    """加载缓存数据（当天有效）"""
    cache_path = get_cache_path(code, data_type)
    if os.path.exists(cache_path):
        try:
            with open(cache_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            return None
    return None


def save_cache(code: str, data_type: str, data: dict):
    """保存缓存数据"""
    cache_path = get_cache_path(code, data_type)
    try:
        with open(cache_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, default=str)
    except IOError:
        pass


@retry_on_failure(max_retries=2, delay=1.0)
def get_stock_info(code: str) -> dict:
    """获取股票基本信息"""
    try:
        df = ak.stock_individual_info_em(symbol=code)
        info = {}
        for _, row in df.iterrows():
            info[row['item']] = row['value']
        return {
            "code": code,
            "name": info.get("股票简称", ""),
            "industry": info.get("行业", ""),
            "market_cap": safe_float(info.get("总市值")),
            "float_cap": safe_float(info.get("流通市值")),
            "total_shares": safe_float(info.get("总股本")),
            "float_shares": safe_float(info.get("流通股")),
            "pe_ttm": safe_float(info.get("市盈率(动态)")),
            "pb": safe_float(info.get("市净率")),
            "listing_date": info.get("上市时间", "")
        }
    except Exception as e:
        return {"code": code, "error": str(e)}


@retry_on_failure(max_retries=2, delay=1.0)
def get_financial_data(code: str, years: int = 3) -> dict:
    """获取财务数据（资产负债表、利润表、现金流量表）"""
    max_records = min(years * 4, 12)
    result = {
        "balance_sheet": [],
        "income_statement": [],
        "cash_flow": []
    }

    fetch_configs = [
        ("balance_sheet", ak.stock_balance_sheet_by_report_em),
        ("income_statement", ak.stock_profit_sheet_by_report_em),
        ("cash_flow", ak.stock_cash_flow_sheet_by_report_em),
    ]

    for key, fetch_func in fetch_configs:
        try:
            df = fetch_func(symbol=code)
            if df is not None and not df.empty:
                result[key] = df.head(max_records).to_dict(orient='records')
        except Exception as e:
            result[f"{key}_error"] = str(e)

    return result


def get_financial_indicators(code: str, limit: int = 8) -> dict:
    """获取财务指标，优先使用快速API，失败时降级到备用API"""
    apis = [ak.stock_financial_abstract, ak.stock_financial_analysis_indicator]

    for api in apis:
        try:
            df = api(symbol=code)
            if df is not None and not df.empty:
                return df.head(limit).to_dict(orient='records')
        except Exception:
            continue

    return []


def get_valuation_data(code: str) -> dict:
    """获取估值数据"""
    result = {}

    try:
        df = ak.stock_a_ttm_lyr(symbol=code)
        if df is None or df.empty:
            return result

        latest = df.iloc[-1].to_dict()
        result["latest"] = latest
        result["history_count"] = len(df)

        for col in ['pe_ttm', 'pb']:
            val = latest.get(col)
            if val and not pd.isna(val):
                result[f"{col}_percentile"] = (df[col].dropna() < val).mean() * 100

    except Exception as e:
        result["error"] = str(e)
        result["note"] = "估值历史数据获取失败，将使用基本信息中的估值"

    return result


@retry_on_failure(max_retries=2, delay=1.0)
def get_holder_data(code: str) -> dict:
    """获取股东信息"""
    result = {}

    try:
        df_top10 = ak.stock_gdfx_top_10_em(symbol=code)
        if df_top10 is not None and not df_top10.empty:
            result["top_10_holders"] = df_top10.head(10).to_dict(orient='records')
    except Exception as e:
        result["top_10_holders_error"] = str(e)

    try:
        df_holder_num = ak.stock_zh_a_gdhs(symbol=code)
        if df_holder_num is not None and not df_holder_num.empty:
            result["holder_count_history"] = df_holder_num.head(10).to_dict(orient='records')
    except Exception as e:
        result["holder_count_error"] = str(e)

    return result


@retry_on_failure(max_retries=2, delay=1.0)
def get_dividend_data(code: str) -> dict:
    """获取分红数据，优先使用主API，失败时降级到备用API"""
    apis = [
        lambda c: ak.stock_dividend_cninfo(symbol=c),
        lambda c: ak.stock_history_dividend_detail(symbol=c, indicator="分红"),
    ]

    for api in apis:
        try:
            df = api(code)
            if df is not None and not df.empty:
                return {
                    "dividend_history": df.to_dict(orient='records'),
                    "dividend_count": len(df)
                }
        except Exception:
            continue

    return {"dividend_history": [], "dividend_count": 0}


@retry_on_failure(max_retries=2, delay=1.0)
def get_price_data(code: str, days: int = 60) -> dict:
    """获取价格数据"""
    try:
        end_date = datetime.now().strftime('%Y%m%d')
        start_date = (datetime.now() - timedelta(days=days)).strftime('%Y%m%d')

        df = ak.stock_zh_a_hist(symbol=code, period="daily",
                                start_date=start_date, end_date=end_date, adjust="qfq")
        if df is not None and not df.empty:
            latest = df.iloc[-1]
            return {
                "latest_price": safe_float(latest['收盘']),
                "latest_date": str(latest['日期']),
                "price_change_pct": safe_float(latest['涨跌幅']),
                "volume": safe_float(latest['成交量']),
                "turnover": safe_float(latest['成交额']),
                "high_60d": safe_float(df['最高'].max()),
                "low_60d": safe_float(df['最低'].min()),
                "avg_volume_20d": safe_float(df.tail(20)['成交量'].mean()),
                "price_data": df.tail(30).to_dict(orient='records')  # 只保留30天
            }
        return {}
    except Exception as e:
        return {"error": str(e)}


@retry_on_failure(max_retries=2, delay=1.0)
def get_index_constituents(index_name: str) -> list:
    """获取指数成分股"""
    index_map = {
        "hs300": "000300",
        "zz500": "000905",
        "zz1000": "000852",
        "cyb": "399006",
        "kcb": "000688"
    }

    index_code = index_map.get(index_name)
    if not index_code:
        return []

    try:
        df = ak.index_stock_cons(symbol=index_code)
        if df is not None and not df.empty:
            return df['品种代码'].tolist()
        return []
    except Exception as e:
        print(f"获取指数成分股失败: {e}")
        return []


def get_all_a_stocks() -> list:
    """获取全部A股代码"""
    try:
        df = ak.stock_zh_a_spot_em()
        if df is not None and not df.empty:
            return df['代码'].tolist()
        return []
    except Exception as e:
        print(f"获取全部A股失败: {e}")
        return []


def fetch_stock_data(code: str, data_type: str = "all", years: int = 3, use_cache: bool = True) -> dict:
    """获取单只股票的数据"""
    # 尝试加载缓存
    if use_cache:
        cached = load_cache(code, data_type)
        if cached:
            print(f"使用缓存数据: {code}")
            return cached

    result = {
        "code": code,
        "fetch_time": datetime.now().isoformat(),
        "data_type": data_type
    }

    print(f"正在获取 {code} 的数据...")

    if data_type in ["all", "basic"]:
        print("  - 获取基本信息...")
        result["basic_info"] = get_stock_info(code)

    if data_type in ["all", "financial"]:
        print("  - 获取财务数据...")
        result["financial_data"] = get_financial_data(code, years)
        print("  - 获取财务指标...")
        result["financial_indicators"] = get_financial_indicators(code)

    if data_type in ["all", "valuation"]:
        print("  - 获取估值数据...")
        result["valuation"] = get_valuation_data(code)
        print("  - 获取价格数据...")
        result["price"] = get_price_data(code)

    if data_type in ["all", "holder"]:
        print("  - 获取股东数据...")
        result["holder"] = get_holder_data(code)
        print("  - 获取分红数据...")
        result["dividend"] = get_dividend_data(code)

    # 保存缓存
    if use_cache:
        save_cache(code, data_type, result)

    print(f"数据获取完成: {code}")
    return result


def fetch_multiple_stocks(codes: list, data_type: str = "basic") -> dict:
    """获取多只股票数据"""
    result = {
        "fetch_time": datetime.now().isoformat(),
        "stocks": [],
        "success_count": 0,
        "fail_count": 0
    }

    total = len(codes)
    for i, code in enumerate(codes):
        print(f"[{i+1}/{total}] 获取 {code}...")
        try:
            stock_data = fetch_stock_data(code, data_type, use_cache=True)
            if "error" not in stock_data.get("basic_info", {}):
                result["stocks"].append(stock_data)
                result["success_count"] += 1
            else:
                result["fail_count"] += 1
        except Exception as e:
            print(f"  获取失败: {e}")
            result["fail_count"] += 1

        # 避免请求过快
        if i < total - 1:
            time.sleep(0.5)

    return result


def main():
    parser = argparse.ArgumentParser(description="A股数据获取工具")
    parser.add_argument("--code", type=str, help="股票代码 (如: 600519)")
    parser.add_argument("--codes", type=str, help="多个股票代码，逗号分隔 (如: 600519,000858)")
    parser.add_argument("--data-type", type=str, default="basic",
                       choices=["all", "basic", "financial", "valuation", "holder"],
                       help="数据类型 (默认: basic)")
    parser.add_argument("--years", type=int, default=3, help="获取多少年的历史数据 (默认: 3)")
    parser.add_argument("--scope", type=str, help="筛选范围: hs300/zz500/cyb/kcb/all")
    parser.add_argument("--no-cache", action="store_true", help="不使用缓存")
    parser.add_argument("--output", type=str, help="输出文件路径 (JSON)")

    args = parser.parse_args()

    result = {}

    if args.code:
        result = fetch_stock_data(args.code, args.data_type, args.years,
                                   use_cache=not args.no_cache)
    elif args.codes:
        codes = [c.strip() for c in args.codes.split(",")]
        result = fetch_multiple_stocks(codes, args.data_type)
    elif args.scope:
        if args.scope == "all":
            codes = get_all_a_stocks()
        else:
            codes = get_index_constituents(args.scope)
        result = {"scope": args.scope, "stocks": codes, "count": len(codes)}
    else:
        print("请提供 --code, --codes 或 --scope 参数")
        sys.exit(1)

    # 输出结果
    output = json.dumps(result, ensure_ascii=False, indent=2, default=str)

    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(output)
        print(f"\n数据已保存到: {args.output}")
    else:
        print(output)


if __name__ == "__main__":
    main()
