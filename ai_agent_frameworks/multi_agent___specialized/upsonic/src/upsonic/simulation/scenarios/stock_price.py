"""
Stock Price Forecast Simulation.

This module provides a simulation scenario for forecasting stock prices.
"""

from __future__ import annotations

from typing import Any, Dict, List, Optional, Type

from pydantic import BaseModel, Field

from upsonic.simulation.base import BaseSimulationObject


class StockPriceStepOutput(BaseModel):
    """
    Output schema for each stock price simulation step.
    """
    step: int = Field(description="Current simulation step number")
    reasoning: str = Field(
        description="Detailed reasoning for the price prediction"
    )
    confidence: float = Field(
        default=0.5,
        ge=0.0,
        le=1.0,
        description="Confidence level in the prediction"
    )
    stock_price: float = Field(
        description="Predicted stock price in base currency"
    )
    price_change: float = Field(
        default=0.0,
        description="Change from previous price"
    )
    percent_change: float = Field(
        default=0.0,
        description="Percentage change from previous price"
    )
    trading_volume: int = Field(
        default=0,
        description="Estimated trading volume"
    )
    market_sentiment: str = Field(
        default="neutral",
        description="Market sentiment (bullish, neutral, bearish)"
    )
    volatility_index: float = Field(
        default=0.0,
        description="Volatility indicator (0-100)"
    )
    support_level: float = Field(
        default=0.0,
        description="Identified support price level"
    )
    resistance_level: float = Field(
        default=0.0,
        description="Identified resistance price level"
    )
    key_catalysts: List[str] = Field(
        default_factory=list,
        description="Key catalysts affecting price"
    )
    risks: List[str] = Field(
        default_factory=list,
        description="Identified risks"
    )
    
    class Config:
        arbitrary_types_allowed = True


class StockPriceForecastSimulation(BaseSimulationObject):
    """
    Simulation for forecasting stock/asset prices.
    
    This simulation models price movements over time, considering:
    - Market dynamics and trends
    - Technical analysis factors
    - Fundamental analysis
    - Market sentiment
    
    Example:
        ```python
        from upsonic.simulation import Simulation
        from upsonic.simulation.scenarios import StockPriceForecastSimulation
        
        sim_object = StockPriceForecastSimulation(
            ticker_symbol="AAPL",
            company_name="Apple Inc.",
            current_price=180.0,
            sector="Technology"
        )
        
        simulation = Simulation(
            sim_object,
            model="openai/gpt-4o",
            time_step="daily",
            simulation_duration=30,
            metrics_to_track=["stock price", "trading volume"]
        )
        
        result = simulation.run()
        ```
    """
    
    def __init__(
        self,
        ticker_symbol: str,
        company_name: str,
        current_price: float,
        sector: str = "Technology",
        market_cap: Optional[float] = None,
        pe_ratio: Optional[float] = None,
        dividend_yield: Optional[float] = None,
        beta: float = 1.0,
        average_volume: int = 1000000,
        high_52_week: Optional[float] = None,
        low_52_week: Optional[float] = None,
        currency: str = "USD",
        exchange: str = "NASDAQ",
        additional_context: Optional[str] = None
    ):
        """
        Initialize the stock price forecast simulation.
        
        Args:
            ticker_symbol: Stock ticker symbol (e.g., "AAPL")
            company_name: Full company name
            current_price: Current stock price
            sector: Industry sector
            market_cap: Market capitalization
            pe_ratio: Price-to-earnings ratio
            dividend_yield: Dividend yield percentage
            beta: Stock beta (volatility relative to market)
            average_volume: Average daily trading volume
            high_52_week: 52-week high price
            low_52_week: 52-week low price
            currency: Price currency
            exchange: Stock exchange
            additional_context: Additional context
        """
        self.ticker_symbol = ticker_symbol
        self.company_name = company_name
        self.current_price = current_price
        self.sector = sector
        self.market_cap = market_cap
        self.pe_ratio = pe_ratio
        self.dividend_yield = dividend_yield
        self.beta = beta
        self.average_volume = average_volume
        self.high_52_week = high_52_week or current_price * 1.2
        self.low_52_week = low_52_week or current_price * 0.8
        self.currency = currency
        self.exchange = exchange
        self.additional_context = additional_context
    
    @property
    def name(self) -> str:
        return "StockPriceForecast"
    
    @property
    def description(self) -> str:
        return f"Stock price forecast for {self.ticker_symbol} ({self.company_name})"
    
    def get_initial_state(self) -> Dict[str, Any]:
        return {
            "stock_price": self.current_price,
            "stock price": self.current_price,
            "price_change": 0.0,
            "percent_change": 0.0,
            "trading_volume": self.average_volume,
            "trading volume": self.average_volume,
            "volatility_index": 20.0,  # Default VIX-like value
            "support_level": self.low_52_week,
            "resistance_level": self.high_52_week,
        }
    
    def build_step_prompt(
        self,
        step: int,
        previous_state: Dict[str, Any],
        metrics_to_track: List[str],
        time_step_unit: str
    ) -> str:
        prev_price = previous_state.get("stock_price", 
                                        previous_state.get("stock price", self.current_price))
        prev_volume = previous_state.get("trading_volume",
                                         previous_state.get("trading volume", self.average_volume))
        prev_volatility = previous_state.get("volatility_index", 20.0)
        
        prompt = f"""
You are an expert financial analyst simulating stock price movements.

## Stock Profile
- **Ticker**: {self.ticker_symbol}
- **Company**: {self.company_name}
- **Sector**: {self.sector}
- **Exchange**: {self.exchange}
- **Beta**: {self.beta}
{f'- **P/E Ratio**: {self.pe_ratio}' if self.pe_ratio else ''}
{f'- **Market Cap**: ${self.market_cap:,.0f}' if self.market_cap else ''}
{f'- **Dividend Yield**: {self.dividend_yield:.2%}' if self.dividend_yield else ''}

## Price Context
- **52-Week High**: ${self.high_52_week:.2f}
- **52-Week Low**: ${self.low_52_week:.2f}
- **Average Volume**: {self.average_volume:,}

## Current Simulation State
- **Simulation {time_step_unit.capitalize()}**: {step}
- **Previous Price**: ${prev_price:.2f} {self.currency}
- **Previous Volume**: {prev_volume:,}
- **Volatility Index**: {prev_volatility:.1f}

## Your Task
Predict the stock metrics for {time_step_unit} {step}.

Consider:
1. **Technical Analysis**: Support/resistance levels, moving averages, patterns
2. **Market Sentiment**: Overall market direction, sector performance
3. **Volatility**: Beta suggests {'higher' if self.beta > 1 else 'lower'} than market volatility
4. **Volume**: Unusual volume may indicate significant moves
5. **Random Walk**: Stock prices have inherent randomness

## Guidelines
- Daily price movements are typically within +/- 3% for most stocks
- High beta stocks may move +/- 5% or more
- Consider the 52-week range as context
- Volume spikes often accompany significant price moves

Predict: {', '.join(metrics_to_track)}
"""
        
        return prompt
    
    def get_step_output_schema(self) -> Type[BaseModel]:
        return StockPriceStepOutput
    
    def extract_metrics(
        self,
        step_output: BaseModel,
        metrics_to_track: List[str]
    ) -> Dict[str, Any]:
        result: Dict[str, Any] = {}
        
        field_mapping = {
            "stock price": "stock_price",
            "stock_price": "stock_price",
            "price": "stock_price",
            "trading volume": "trading_volume",
            "trading_volume": "trading_volume",
            "volume": "trading_volume",
            "volatility": "volatility_index",
            "volatility_index": "volatility_index",
            "price change": "price_change",
            "percent change": "percent_change",
        }
        
        for metric in metrics_to_track:
            normalized = metric.lower().strip()
            field_name = field_mapping.get(normalized, normalized.replace(" ", "_"))
            
            if hasattr(step_output, field_name):
                result[metric] = getattr(step_output, field_name)
        
        # Always include core metrics
        if hasattr(step_output, 'stock_price'):
            result['stock_price'] = step_output.stock_price
        if hasattr(step_output, 'trading_volume'):
            result['trading_volume'] = step_output.trading_volume
        if hasattr(step_output, 'volatility_index'):
            result['volatility_index'] = step_output.volatility_index
        
        return result
    
    def validate_metrics(
        self,
        metrics: Dict[str, Any],
        step: int
    ) -> Dict[str, Any]:
        validated = metrics.copy()
        
        # Ensure price is positive
        for key in ['stock_price', 'stock price']:
            if key in validated and validated[key] is not None:
                validated[key] = max(0.01, float(validated[key]))
        
        # Ensure volume is non-negative
        for key in ['trading_volume', 'trading volume']:
            if key in validated and validated[key] is not None:
                validated[key] = max(0, int(validated[key]))
        
        return validated
