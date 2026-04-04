"""
User Growth Simulation.

This module provides a simulation scenario for forecasting user/customer growth
for digital products and platforms.
"""

from __future__ import annotations

from typing import Any, Dict, List, Optional, Type

from pydantic import BaseModel, Field

from upsonic.simulation.base import BaseSimulationObject


class UserGrowthStepOutput(BaseModel):
    """
    Output schema for each user growth simulation step.
    """
    step: int = Field(description="Current simulation step number")
    reasoning: str = Field(
        description="Detailed reasoning for the growth prediction"
    )
    confidence: float = Field(
        default=0.7,
        ge=0.0,
        le=1.0,
        description="Confidence level in the prediction"
    )
    total_users: int = Field(
        description="Total registered users"
    )
    active_users: int = Field(
        description="Daily/Monthly active users (depending on time step)"
    )
    new_signups: int = Field(
        default=0,
        description="New user signups this period"
    )
    churned_users: int = Field(
        default=0,
        description="Users who churned this period"
    )
    retention_rate: float = Field(
        default=0.9,
        ge=0.0,
        le=1.0,
        description="User retention rate"
    )
    activation_rate: float = Field(
        default=0.5,
        ge=0.0,
        le=1.0,
        description="Signup to active user conversion rate"
    )
    viral_coefficient: float = Field(
        default=0.0,
        ge=0.0,
        description="Average referrals per user"
    )
    engagement_score: float = Field(
        default=0.0,
        ge=0.0,
        le=100.0,
        description="User engagement score (0-100)"
    )
    growth_rate: float = Field(
        default=0.0,
        description="Period-over-period growth rate"
    )
    acquisition_channel: str = Field(
        default="organic",
        description="Primary acquisition channel this period"
    )
    key_factors: List[str] = Field(
        default_factory=list,
        description="Key factors affecting growth"
    )
    
    class Config:
        arbitrary_types_allowed = True


class UserGrowthSimulation(BaseSimulationObject):
    """
    Simulation for forecasting user/customer growth.
    
    This simulation models user growth dynamics for digital products:
    - Signup patterns and acquisition
    - Activation and engagement
    - Retention and churn
    - Viral growth and referrals
    
    Example:
        ```python
        from upsonic.simulation import Simulation
        from upsonic.simulation.scenarios import UserGrowthSimulation
        
        sim_object = UserGrowthSimulation(
            product_name="MyApp",
            product_type="Mobile App",
            current_total_users=10000,
            current_active_users=3000,
            industry="Social Media"
        )
        
        simulation = Simulation(
            sim_object,
            model="openai/gpt-4o",
            time_step="weekly",
            simulation_duration=52,  # One year
            metrics_to_track=["total users", "active users", "retention rate"]
        )
        
        result = simulation.run()
        ```
    """
    
    def __init__(
        self,
        product_name: str,
        product_type: str = "SaaS",
        current_total_users: int = 1000,
        current_active_users: int = 500,
        industry: str = "Technology",
        target_market: str = "B2C",
        pricing_model: str = "Freemium",
        launch_date: Optional[str] = None,
        marketing_budget: Optional[float] = None,
        competitors: Optional[List[str]] = None,
        unique_value_prop: Optional[str] = None,
        additional_context: Optional[str] = None
    ):
        """
        Initialize the user growth simulation.
        
        Args:
            product_name: Name of the product/platform
            product_type: Type of product (SaaS, Mobile App, Platform, etc.)
            current_total_users: Current total registered users
            current_active_users: Current active users
            industry: Industry/vertical
            target_market: Target market (B2C, B2B, B2B2C)
            pricing_model: Pricing model (Freemium, Subscription, etc.)
            launch_date: Product launch date
            marketing_budget: Monthly marketing budget
            competitors: List of competitor names
            unique_value_prop: Unique value proposition
            additional_context: Additional context
        """
        self.product_name = product_name
        self.product_type = product_type
        self.current_total_users = current_total_users
        self.current_active_users = current_active_users
        self.industry = industry
        self.target_market = target_market
        self.pricing_model = pricing_model
        self.launch_date = launch_date
        self.marketing_budget = marketing_budget
        self.competitors = competitors or []
        self.unique_value_prop = unique_value_prop
        self.additional_context = additional_context
    
    @property
    def name(self) -> str:
        return "UserGrowthForecast"
    
    @property
    def description(self) -> str:
        return f"User growth forecast for {self.product_name} ({self.product_type})"
    
    def get_initial_state(self) -> Dict[str, Any]:
        retention_rate = self.current_active_users / max(1, self.current_total_users)
        
        return {
            "total_users": self.current_total_users,
            "total users": self.current_total_users,
            "active_users": self.current_active_users,
            "active users": self.current_active_users,
            "new_signups": 0,
            "churned_users": 0,
            "retention_rate": retention_rate,
            "retention rate": retention_rate,
            "activation_rate": 0.5,
            "viral_coefficient": 0.3,
            "engagement_score": 50.0,
            "growth_rate": 0.0,
        }
    
    def build_step_prompt(
        self,
        step: int,
        previous_state: Dict[str, Any],
        metrics_to_track: List[str],
        time_step_unit: str
    ) -> str:
        prev_total = previous_state.get("total_users", 
                                        previous_state.get("total users", self.current_total_users))
        prev_active = previous_state.get("active_users",
                                         previous_state.get("active users", self.current_active_users))
        prev_retention = previous_state.get("retention_rate",
                                            previous_state.get("retention rate", 0.9))
        prev_growth = previous_state.get("growth_rate", 0.0)
        prev_viral = previous_state.get("viral_coefficient", 0.3)
        
        prompt = f"""
You are an expert growth analyst simulating user growth for a digital product.

## Product Profile
- **Name**: {self.product_name}
- **Type**: {self.product_type}
- **Industry**: {self.industry}
- **Target Market**: {self.target_market}
- **Pricing Model**: {self.pricing_model}
{f'- **Launch Date**: {self.launch_date}' if self.launch_date else ''}
{f'- **Marketing Budget**: ${self.marketing_budget:,.0f}/month' if self.marketing_budget else ''}
{f'- **Competitors**: {", ".join(self.competitors)}' if self.competitors else ''}
{f'- **Value Proposition**: {self.unique_value_prop}' if self.unique_value_prop else ''}

## Current Simulation State
- **Simulation {time_step_unit.capitalize()}**: {step}
- **Total Users**: {prev_total:,}
- **Active Users**: {prev_active:,}
- **Retention Rate**: {prev_retention:.1%}
- **Previous Growth Rate**: {prev_growth:+.1%}
- **Viral Coefficient**: {prev_viral:.2f}

## Your Task
Predict user growth metrics for {time_step_unit} {step}.

Consider:
1. **Acquisition**: Organic growth, paid acquisition, viral growth
2. **Activation**: New signups becoming active users
3. **Retention**: Users returning vs churning
4. **Virality**: Users referring others (K-factor)
5. **Seasonality**: {time_step_unit}ly patterns, holidays, events
6. **Market Dynamics**: Competition, market saturation, trends

## Growth Patterns by Stage
- Early Stage: High growth variance, low retention
- Growth Stage: Rapid scaling, improving metrics
- Mature Stage: Slower growth, stable retention
- Decline: Negative growth, falling retention

## Guidelines
- {self.target_market} products typically have {
    'higher volume, lower retention' if self.target_market == 'B2C' 
    else 'lower volume, higher retention'
}
- {self.pricing_model} models affect user behavior and retention
- Consider realistic bounds for {time_step_unit}ly changes

Predict: {', '.join(metrics_to_track)}
"""
        
        return prompt
    
    def get_step_output_schema(self) -> Type[BaseModel]:
        return UserGrowthStepOutput
    
    def extract_metrics(
        self,
        step_output: BaseModel,
        metrics_to_track: List[str]
    ) -> Dict[str, Any]:
        result: Dict[str, Any] = {}
        
        field_mapping = {
            "total users": "total_users",
            "total_users": "total_users",
            "users": "total_users",
            "active users": "active_users",
            "active_users": "active_users",
            "dau": "active_users",
            "mau": "active_users",
            "new signups": "new_signups",
            "new_signups": "new_signups",
            "signups": "new_signups",
            "retention rate": "retention_rate",
            "retention_rate": "retention_rate",
            "retention": "retention_rate",
            "churn": "churned_users",
            "churned users": "churned_users",
            "growth rate": "growth_rate",
            "growth_rate": "growth_rate",
            "engagement": "engagement_score",
            "viral": "viral_coefficient",
        }
        
        for metric in metrics_to_track:
            normalized = metric.lower().strip()
            field_name = field_mapping.get(normalized, normalized.replace(" ", "_"))
            
            if hasattr(step_output, field_name):
                result[metric] = getattr(step_output, field_name)
        
        # Always include core metrics
        for field in ['total_users', 'active_users', 'new_signups', 'churned_users', 
                      'retention_rate', 'growth_rate', 'engagement_score']:
            if hasattr(step_output, field):
                result[field] = getattr(step_output, field)
        
        return result
    
    def validate_metrics(
        self,
        metrics: Dict[str, Any],
        step: int
    ) -> Dict[str, Any]:
        validated = metrics.copy()
        
        # Ensure user counts are non-negative integers
        for key in ['total_users', 'total users', 'active_users', 'active users', 
                    'new_signups', 'churned_users']:
            if key in validated and validated[key] is not None:
                validated[key] = max(0, int(validated[key]))
        
        # Bound rates to 0-1
        for key in ['retention_rate', 'retention rate', 'activation_rate']:
            if key in validated and validated[key] is not None:
                validated[key] = max(0, min(1, float(validated[key])))
        
        # Bound engagement score to 0-100
        if 'engagement_score' in validated and validated['engagement_score'] is not None:
            validated['engagement_score'] = max(0, min(100, float(validated['engagement_score'])))
        
        # Ensure active users doesn't exceed total users
        total = validated.get('total_users', validated.get('total users', float('inf')))
        for key in ['active_users', 'active users']:
            if key in validated and validated[key] is not None:
                validated[key] = min(validated[key], total)
        
        return validated
