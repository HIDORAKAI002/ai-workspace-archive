# {{stock_name}} ({{stock_code}}) 投资分析报告

**分析日期**: {{analysis_date}}
**分析级别**: {{analysis_level}}
**综合评分**: {{overall_score}}/100

---

## 一、公司概况

| 项目 | 内容 |
|------|------|
| 股票代码 | {{stock_code}} |
| 股票名称 | {{stock_name}} |
| 所属行业 | {{industry}} |
| 总市值 | {{market_cap}} |
| 流通市值 | {{float_cap}} |
| 上市日期 | {{listing_date}} |

### 主营业务

{{main_business}}

---

## 二、财务健康分析

### 2.1 盈利能力

| 指标 | 当前值 | 行业均值 | 评价 |
|------|--------|----------|------|
| ROE | {{roe}}% | {{industry_roe}}% | {{roe_assessment}} |
| ROA | {{roa}}% | {{industry_roa}}% | {{roa_assessment}} |
| 毛利率 | {{gross_margin}}% | {{industry_gross_margin}}% | {{gross_margin_assessment}} |
| 净利率 | {{net_margin}}% | {{industry_net_margin}}% | {{net_margin_assessment}} |

**杜邦分析**:
- 净利率: {{net_margin}}%
- 资产周转率: {{asset_turnover}}
- 权益乘数: {{equity_multiplier}}
- **ROE驱动因素**: {{roe_driver}}

### 2.2 偿债能力

| 指标 | 当前值 | 参考标准 | 状态 |
|------|--------|----------|------|
| 资产负债率 | {{debt_ratio}}% | < 60% | {{debt_ratio_status}} |
| 流动比率 | {{current_ratio}} | > 1.5 | {{current_ratio_status}} |
| 速动比率 | {{quick_ratio}} | > 1 | {{quick_ratio_status}} |
| 利息覆盖倍数 | {{interest_coverage}} | > 3 | {{interest_coverage_status}} |

### 2.3 运营效率

| 指标 | 当前值 | 趋势 |
|------|--------|------|
| 应收账款周转天数 | {{ar_days}}天 | {{ar_trend}} |
| 存货周转天数 | {{inventory_days}}天 | {{inventory_trend}} |
| 总资产周转率 | {{asset_turnover}} | {{asset_turnover_trend}} |

---

## 三、成长性分析

### 3.1 增长指标

| 指标 | 最近一期 | 近3年平均 | 趋势 |
|------|----------|-----------|------|
| 营收增长率 | {{revenue_growth}}% | {{avg_revenue_growth}}% | {{revenue_trend}} |
| 净利润增长率 | {{profit_growth}}% | {{avg_profit_growth}}% | {{profit_trend}} |
| EPS增长率 | {{eps_growth}}% | {{avg_eps_growth}}% | {{eps_trend}} |

### 3.2 成长性评估

{{growth_assessment}}

---

## 四、估值分析

### 4.1 当前估值

| 指标 | 当前值 | 历史分位数 | 行业均值 |
|------|--------|------------|----------|
| PE (TTM) | {{pe_ttm}} | {{pe_percentile}}% | {{industry_pe}} |
| PB | {{pb}} | {{pb_percentile}}% | {{industry_pb}} |
| PS | {{ps}} | {{ps_percentile}}% | {{industry_ps}} |

### 4.2 内在价值估算

| 估值方法 | 每股价值 | 说明 |
|----------|----------|------|
| DCF现金流折现 | ¥{{dcf_value}} | 折现率{{discount_rate}}%，永续增长{{terminal_growth}}% |
| DDM股息折现 | ¥{{ddm_value}} | 股息增长率{{dividend_growth}}% |
| 相对估值 | ¥{{relative_value}} | 基于历史PE均值 |
| **平均估值** | **¥{{avg_value}}** | - |

### 4.3 安全边际

| 项目 | 数值 |
|------|------|
| 当前价格 | ¥{{current_price}} |
| 平均内在价值 | ¥{{avg_value}} |
| 安全边际 | {{margin_of_safety}}% |
| 建议买入价 | ¥{{safety_price}} |

**估值结论**: {{valuation_conclusion}}

---

## 五、风险提示

### 5.1 财务异常检测

**风险等级**: {{risk_level}}

{{#if anomalies}}
| 异常类型 | 描述 | 严重程度 |
|----------|------|----------|
{{#each anomalies}}
| {{this.type}} | {{this.description}} | {{this.severity}} |
{{/each}}
{{else}}
未检测到明显财务异常
{{/if}}

### 5.2 股东相关风险

{{#if holder_risks}}
{{#each holder_risks}}
- {{this}}
{{/each}}
{{else}}
- 暂无明显股东相关风险
{{/if}}

### 5.3 行业/政策风险

{{industry_risks}}

---

## 六、投资结论

### 综合评分

| 维度 | 评分 | 权重 | 加权得分 |
|------|------|------|----------|
| 盈利能力 | {{profitability_score}}/100 | 30% | {{profitability_weighted}} |
| 财务安全 | {{safety_score}}/100 | 20% | {{safety_weighted}} |
| 成长性 | {{growth_score}}/100 | 25% | {{growth_weighted}} |
| 估值水平 | {{valuation_score}}/100 | 25% | {{valuation_weighted}} |
| **综合评分** | **{{overall_score}}/100** | - | - |

### 投资建议

{{investment_recommendation}}

### 关键观察点

{{#each key_observations}}
- {{this}}
{{/each}}

---

## 免责声明

本报告基于公开财务数据分析，仅供参考，不构成投资建议。投资有风险，入市需谨慎。

**数据来源**: akshare (公开财务数据)
**分析工具**: china-stock-analysis skill
**报告生成时间**: {{report_time}}

---

# 报告模板使用说明

上述模板中的 `{{变量名}}` 需要在生成报告时替换为实际值。

## 报告级别说明

### 摘要级 (Summary)
只包含：
- 基本信息
- 关键财务指标
- 投资结论

### 标准级 (Standard)
包含：
- 完整财务分析
- 估值分析
- 风险提示
- 投资建议

### 深度级 (Deep)
在标准级基础上增加：
- 历史数据趋势图描述
- 详细财务报表分析
- 竞争对手对比
- 行业深度分析

## 评分标准

### 盈利能力评分
- ROE > 20%: +15分
- ROE 15-20%: +10分
- ROE 10-15%: +5分
- ROE < 10%: 0分

### 财务安全评分
- 无风险指标: +10分
- 每个风险指标: -5分

### 成长性评分
- 增长率 > 20%: +15分
- 增长率 10-20%: +10分
- 增长率 0-10%: +5分
- 负增长: -5分

### 估值水平评分
- 历史分位数 < 20%: +15分 (低估)
- 历史分位数 20-40%: +10分
- 历史分位数 40-60%: +5分
- 历史分位数 60-80%: 0分
- 历史分位数 > 80%: -10分 (高估)
