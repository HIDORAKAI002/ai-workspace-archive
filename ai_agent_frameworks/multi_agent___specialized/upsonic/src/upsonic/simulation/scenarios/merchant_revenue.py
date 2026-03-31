"""
Merchant Revenue Forecast Simulation.

This module provides a simulation scenario for forecasting e-commerce
merchant revenue over time.
"""

from __future__ import annotations

from typing import Any, Dict, List, Optional, Type

from pydantic import BaseModel, Field

from upsonic.simulation.base import BaseSimulationObject, SimulationStepOutput


class MerchantRevenueStepOutput(BaseModel):
    """
    Output schema for each merchant revenue simulation step.
    """
    step: int = Field(description="Current simulation step number")
    reasoning: str = Field(
        description="Detailed reasoning for the revenue prediction, including factors considered"
    )
    confidence: float = Field(
        default=0.7,
        ge=0.0,
        le=1.0,
        description="Confidence level in the prediction (0.0-1.0)"
    )
    monthly_recurring_revenue: float = Field(
        description="Predicted Monthly Recurring Revenue (MRR) in USD"
    )
    daily_revenue: float = Field(
        description="Predicted daily revenue in USD"
    )
    customer_count: int = Field(
        default=0,
        description="Estimated number of active customers"
    )
    average_order_value: float = Field(
        default=0.0,
        description="Average order value in USD"
    )
    churn_rate: float = Field(
        default=0.0,
        ge=0.0,
        le=1.0,
        description="Estimated customer churn rate"
    )
    growth_rate: float = Field(
        default=0.0,
        description="Day-over-day growth rate as decimal"
    )
    market_sentiment: str = Field(
        default="neutral",
        description="Market sentiment (positive, neutral, negative)"
    )
    key_factors: List[str] = Field(
        default_factory=list,
        description="Key factors influencing this prediction"
    )
    risks: List[str] = Field(
        default_factory=list,
        description="Identified risks for this period"
    )
    
    class Config:
        arbitrary_types_allowed = True


class MerchantRevenueForecastSimulation(BaseSimulationObject):
    """
    Simulation for forecasting e-commerce merchant revenue.
    
    This simulation models the revenue trajectory of a merchant over time,
    taking into account:
    - Business characteristics (sector, location, size)
    - Market dynamics and seasonality
    - Growth patterns and trends
    - Customer behavior and churn
    
    Example:
        ```python
        from upsonic.simulation import Simulation
        from upsonic.simulation.scenarios import MerchantRevenueForecastSimulation
        
        sim_object = MerchantRevenueForecastSimulation(
            merchant_name="TechCo",
            shareholders=["Alice", "Bob"],
            sector="E-commerce",
            location="San Francisco",
            current_monthly_revenue_usd=50000
        )
        
        simulation = Simulation(
            sim_object,
            model="openai/gpt-4o",
            time_step="daily",
            simulation_duration=100,
            metrics_to_track=["monthly recurring revenue"]
        )
        
        result = simulation.run()
        ```
    """
    
    def __init__(
        self,
        merchant_name: str,
        shareholders: Optional[List[str]] = None,
        sector: str = "E-commerce",
        location: str = "United States",
        current_monthly_revenue_usd: float = 10000.0,
        current_customer_count: int = 100,
        average_order_value: float = 50.0,
        founding_year: Optional[int] = None,
        business_model: str = "B2C",
        product_category: Optional[str] = None,
        additional_context: Optional[str] = None
    ):
        """
        Initialize the merchant revenue forecast simulation.
        
        Args:
            merchant_name: Name of the merchant/company
            shareholders: List of shareholder names
            sector: Business sector (e.g., "E-commerce", "SaaS", "Retail")
            location: Business location/headquarters
            current_monthly_revenue_usd: Current monthly recurring revenue in USD
            current_customer_count: Current number of active customers
            average_order_value: Average order value in USD
            founding_year: Year the business was founded
            business_model: Business model type (B2C, B2B, B2B2C, etc.)
            product_category: Primary product category
            additional_context: Any additional context about the business
        """
        self.merchant_name = merchant_name
        self.shareholders = shareholders or []
        self.sector = sector
        self.location = location
        self.current_monthly_revenue_usd = current_monthly_revenue_usd
        self.current_customer_count = current_customer_count
        self.average_order_value = average_order_value
        self.founding_year = founding_year
        self.business_model = business_model
        self.product_category = product_category
        self.additional_context = additional_context
    
    @property
    def name(self) -> str:
        """Get the simulation name."""
        return "MerchantRevenueForecast"
    
    @property
    def description(self) -> str:
        """Get the simulation description."""
        return f"Revenue forecast simulation for {self.merchant_name} ({self.sector})"
    
    def get_initial_state(self) -> Dict[str, Any]:
        """Get initial state with current metrics."""
        # Calculate estimated daily revenue from MRR
        estimated_daily_revenue = self.current_monthly_revenue_usd / 30
        
        return {
            "monthly recurring revenue": self.current_monthly_revenue_usd,
            "monthly_recurring_revenue": self.current_monthly_revenue_usd,
            "daily_revenue": estimated_daily_revenue,
            "customer_count": self.current_customer_count,
            "average_order_value": self.average_order_value,
            "churn_rate": 0.02,  # Default 2% churn
            "growth_rate": 0.0,
        }
    
    def build_step_prompt(
        self,
        step: int,
        previous_state: Dict[str, Any],
        metrics_to_track: List[str],
        time_step_unit: str
    ) -> str:
        """Build the prompt for a simulation step."""
        
        # Get previous values
        prev_mrr = previous_state.get("monthly_recurring_revenue", 
                                       previous_state.get("monthly recurring revenue", 
                                                         self.current_monthly_revenue_usd))
        prev_daily = previous_state.get("daily_revenue", prev_mrr / 30)
        prev_customers = previous_state.get("customer_count", self.current_customer_count)
        prev_aov = previous_state.get("average_order_value", self.average_order_value)
        prev_churn = previous_state.get("churn_rate", 0.02)
        prev_growth = previous_state.get("growth_rate", 0.0)
        
        prompt = f"""
You are an expert financial analyst and business strategist simulating the business trajectory of a real e-commerce company.

## Company Profile
- **Name**: {self.merchant_name}
- **Sector**: {self.sector}
- **Location**: {self.location}
- **Business Model**: {self.business_model}
{f'- **Product Category**: {self.product_category}' if self.product_category else ''}
{f'- **Founded**: {self.founding_year}' if self.founding_year else ''}
{f'- **Shareholders**: {", ".join(self.shareholders)}' if self.shareholders else ''}
{f'- **Additional Context**: {self.additional_context}' if self.additional_context else ''}

## Current Simulation State
- **Simulation {time_step_unit.capitalize()}**: {step}
- **Previous MRR**: ${prev_mrr:,.2f}
- **Previous Daily Revenue**: ${prev_daily:,.2f}
- **Customer Count**: {prev_customers:,}
- **Average Order Value**: ${prev_aov:.2f}
- **Churn Rate**: {prev_churn:.2%}
- **Previous Growth Rate**: {prev_growth:+.2%}

## Your Task
Predict the business metrics for {time_step_unit} {step} of the simulation.

Consider these factors:
1. **Seasonality**: Day of week, time of month, holidays, seasons
2. **Market Dynamics**: Competition, market trends, economic conditions
3. **Business Lifecycle**: Growth stage, market penetration, saturation
4. **Customer Behavior**: Retention, acquisition, spending patterns
5. **Random Variance**: Natural business fluctuations (but keep realistic)

## Guidelines for Realistic Predictions
- Daily growth should typically be between -5% and +5% for established businesses
- Startups may see higher variance (+/- 10-20%)
- Consider compounding effects over time
- Revenue should have natural ups and downs, not just steady growth
- Account for weekday vs weekend differences
- Consider monthly billing cycles for MRR

## Required Predictions
Provide predictions for the following metrics: {', '.join(metrics_to_track)}

Be specific and quantitative. Justify your predictions with reasoning based on the factors above.
"""
        
        return prompt
    
    def get_step_output_schema(self) -> Type[BaseModel]:
        """Return the output schema for step predictions."""
        return MerchantRevenueStepOutput
    
    def extract_metrics(
        self,
        step_output: BaseModel,
        metrics_to_track: List[str]
    ) -> Dict[str, Any]:
        """Extract metrics from step output."""
        result: Dict[str, Any] = {}
        
        # Map common metric names to model fields
        field_mapping = {
            "monthly recurring revenue": "monthly_recurring_revenue",
            "mrr": "monthly_recurring_revenue",
            "monthly_recurring_revenue": "monthly_recurring_revenue",
            "daily revenue": "daily_revenue",
            "daily_revenue": "daily_revenue",
            "customer count": "customer_count",
            "customer_count": "customer_count",
            "customers": "customer_count",
            "average order value": "average_order_value",
            "aov": "average_order_value",
            "churn rate": "churn_rate",
            "churn": "churn_rate",
            "growth rate": "growth_rate",
            "growth": "growth_rate",
        }
        
        for metric in metrics_to_track:
            normalized = metric.lower().strip()
            field_name = field_mapping.get(normalized, normalized.replace(" ", "_"))
            
            if hasattr(step_output, field_name):
                result[metric] = getattr(step_output, field_name)
        
        # Always include core metrics even if not explicitly tracked
        if hasattr(step_output, 'monthly_recurring_revenue'):
            result['monthly_recurring_revenue'] = step_output.monthly_recurring_revenue
        if hasattr(step_output, 'daily_revenue'):
            result['daily_revenue'] = step_output.daily_revenue
        if hasattr(step_output, 'customer_count'):
            result['customer_count'] = step_output.customer_count
        if hasattr(step_output, 'average_order_value'):
            result['average_order_value'] = step_output.average_order_value
        if hasattr(step_output, 'churn_rate'):
            result['churn_rate'] = step_output.churn_rate
        if hasattr(step_output, 'growth_rate'):
            result['growth_rate'] = step_output.growth_rate
        
        return result
    
    def validate_metrics(
        self,
        metrics: Dict[str, Any],
        step: int
    ) -> Dict[str, Any]:
        """Validate and bound metrics to realistic ranges."""
        validated = metrics.copy()
        
        # Ensure revenue is non-negative
        for key in ['monthly_recurring_revenue', 'daily_revenue', 'monthly recurring revenue']:
            if key in validated and validated[key] is not None:
                validated[key] = max(0, float(validated[key]))
        
        # Ensure customer count is non-negative integer
        if 'customer_count' in validated and validated['customer_count'] is not None:
            validated['customer_count'] = max(0, int(validated['customer_count']))
        
        # Bound churn rate to 0-1
        if 'churn_rate' in validated and validated['churn_rate'] is not None:
            validated['churn_rate'] = max(0, min(1, float(validated['churn_rate'])))
        
        # Bound growth rate to reasonable range (-50% to +100%)
        if 'growth_rate' in validated and validated['growth_rate'] is not None:
            validated['growth_rate'] = max(-0.5, min(1.0, float(validated['growth_rate'])))
        
        return validated
    
    def get_context_for_step(self, step: int) -> Optional[str]:
        """
        Add contextual events for specific steps.
        
        Override this method in subclasses to inject specific events
        like holidays, marketing campaigns, or external factors.
        """
        # Example: Add holiday context
        if step % 30 == 0:  # Monthly milestone
            return "End of month - expect higher activity due to billing cycles."
        elif step % 7 == 0:  # Weekly
            return "Start of new week - typical business patterns resume."
        
        return None
