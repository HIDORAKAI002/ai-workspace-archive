"""
Tests for the Simulation framework.

Tests these:
- Simulation imports and initialization
- BaseSimulationObject functionality
- MerchantRevenueForecastSimulation
- TimeStep and TimeStepManager
- SimulationResult (all attributes and methods)
- All Report types (Summary, Detailed, Visual, Statistical)
- All report export methods (to_pdf, to_csv, to_html, to_json, show, save_all)
"""

import os
import json
import tempfile
import pytest
from pydantic import BaseModel
from datetime import datetime




@pytest.fixture
def merchant_simulation():
    """Create a MerchantRevenueForecastSimulation fixture."""
    from upsonic.simulation.scenarios import MerchantRevenueForecastSimulation
    return MerchantRevenueForecastSimulation(
        merchant_name="TechCo",
        shareholders=["Alice", "Bob", "Charlie"],
        sector="E-commerce",
        location="San Francisco",
        current_monthly_revenue_usd=50000,
        current_customer_count=500,
        average_order_value=100.0,
        founding_year=2020,
        business_model="B2C",
        product_category="Electronics",
        additional_context="Fast-growing startup in tech space"
    )


@pytest.fixture
def mock_simulation_result(merchant_simulation):
    """Create a mock SimulationResult for testing reports."""
    from upsonic.simulation.result import SimulationResult, SimulationStepRecord
    from upsonic.simulation.base import SimulationConfig
    from upsonic.simulation.time_step import TimeStep, TimeStepManager
    
    config = SimulationConfig(
        simulation_object=merchant_simulation,
        model="openai/gpt-4o",
        time_step="daily",
        simulation_duration=5,
        metrics_to_track=["monthly recurring revenue", "daily_revenue", "customer_count"],
        temperature=0.7
    )
    
    # Create realistic mock steps
    steps = [
        SimulationStepRecord(
            step=0, timestamp="2024-01-01", prompt="", raw_response="",
            parsed_response=None, 
            metrics={
                "monthly recurring revenue": 50000,
                "daily_revenue": 1666.67,
                "customer_count": 500
            },
            execution_time=0, success=True, error=None
        ),
        SimulationStepRecord(
            step=1, timestamp="2024-01-02", prompt="Test prompt 1", 
            raw_response='{"step": 1, "monthly_recurring_revenue": 50500}',
            parsed_response=None,
            metrics={
                "monthly recurring revenue": 50500,
                "daily_revenue": 1683.33,
                "customer_count": 505
            },
            execution_time=1.2, success=True, error=None
        ),
        SimulationStepRecord(
            step=2, timestamp="2024-01-03", prompt="Test prompt 2",
            raw_response='{"step": 2, "monthly_recurring_revenue": 51000}',
            parsed_response=None,
            metrics={
                "monthly recurring revenue": 51000,
                "daily_revenue": 1700.00,
                "customer_count": 510
            },
            execution_time=1.1, success=True, error=None
        ),
        SimulationStepRecord(
            step=3, timestamp="2024-01-04", prompt="Test prompt 3",
            raw_response='{"step": 3, "monthly_recurring_revenue": 51200}',
            parsed_response=None,
            metrics={
                "monthly recurring revenue": 51200,
                "daily_revenue": 1706.67,
                "customer_count": 512
            },
            execution_time=1.3, success=True, error=None
        ),
        SimulationStepRecord(
            step=4, timestamp="2024-01-05", prompt="Test prompt 4",
            raw_response='{"step": 4, "monthly_recurring_revenue": 52000}',
            parsed_response=None,
            metrics={
                "monthly recurring revenue": 52000,
                "daily_revenue": 1733.33,
                "customer_count": 520
            },
            execution_time=1.0, success=True, error=None
        ),
        SimulationStepRecord(
            step=5, timestamp="2024-01-06", prompt="Test prompt 5",
            raw_response='{"step": 5, "monthly_recurring_revenue": 52500}',
            parsed_response=None,
            metrics={
                "monthly recurring revenue": 52500,
                "daily_revenue": 1750.00,
                "customer_count": 525
            },
            execution_time=1.15, success=True, error=None
        ),
    ]
    
    time_manager = TimeStepManager(TimeStep.DAILY, start_date=datetime(2024, 1, 1))
    
    return SimulationResult(
        simulation_id="test-simulation-id-12345",
        simulation_object=merchant_simulation,
        config=config,
        steps=steps,
        start_time=1704067200.0,  # 2024-01-01 00:00:00
        end_time=1704067210.75,   # ~10.75 seconds later
        time_manager=time_manager,
        metrics_to_track=["monthly recurring revenue", "daily_revenue", "customer_count"]
    )


@pytest.fixture
def temp_dir():
    """Create a temporary directory for file output tests."""
    with tempfile.TemporaryDirectory() as tmpdir:
        yield tmpdir



class TestSimulationImports:
    """Test that all simulation classes can be imported."""
    
    def test_import_simulation_from_main(self):
        """Test importing Simulation from main package."""
        from upsonic import Simulation
        assert Simulation is not None
    
    def test_import_simulation_from_module(self):
        """Test importing from simulation module."""
        from upsonic.simulation import Simulation, BaseSimulationObject, TimeStep
        assert Simulation is not None
        assert BaseSimulationObject is not None
        assert TimeStep is not None
    
    def test_import_simulation_result(self):
        """Test importing SimulationResult."""
        from upsonic.simulation import SimulationResult
        assert SimulationResult is not None
    
    def test_import_all_scenarios(self):
        """Test importing all pre-built scenarios."""
        from upsonic.simulation.scenarios import (
            MerchantRevenueForecastSimulation,
            StockPriceForecastSimulation,
            UserGrowthSimulation
        )
        assert MerchantRevenueForecastSimulation is not None
        assert StockPriceForecastSimulation is not None
        assert UserGrowthSimulation is not None
    
    def test_import_report_classes(self):
        """Test importing report classes."""
        from upsonic.simulation.result import (
            BaseReport,
            SummaryReport,
            DetailedReport,
            VisualReport,
            StatisticalReport,
            ReportsCollection
        )
        assert BaseReport is not None
        assert SummaryReport is not None
        assert DetailedReport is not None
        assert VisualReport is not None
        assert StatisticalReport is not None
        assert ReportsCollection is not None


# ============================================================================
# MERCHANT REVENUE FORECAST SIMULATION TESTS
# ============================================================================

class TestMerchantRevenueForecastSimulation:
    """Comprehensive tests for MerchantRevenueForecastSimulation."""
    
    def test_init_with_all_params(self):
        """Test initialization with all parameters."""
        from upsonic.simulation.scenarios import MerchantRevenueForecastSimulation
        
        sim = MerchantRevenueForecastSimulation(
            merchant_name="TechCo",
            shareholders=["Alice", "Bob"],
            sector="E-commerce",
            location="San Francisco",
            current_monthly_revenue_usd=50000,
            current_customer_count=500,
            average_order_value=100.0,
            founding_year=2020,
            business_model="B2C",
            product_category="Electronics",
            additional_context="Fast-growing startup"
        )
        
        assert sim.merchant_name == "TechCo"
        assert sim.shareholders == ["Alice", "Bob"]
        assert sim.sector == "E-commerce"
        assert sim.location == "San Francisco"
        assert sim.current_monthly_revenue_usd == 50000
        assert sim.current_customer_count == 500
        assert sim.average_order_value == 100.0
        assert sim.founding_year == 2020
        assert sim.business_model == "B2C"
        assert sim.product_category == "Electronics"
        assert sim.additional_context == "Fast-growing startup"
    
    def test_init_with_minimal_params(self):
        """Test initialization with minimal parameters."""
        from upsonic.simulation.scenarios import MerchantRevenueForecastSimulation
        
        sim = MerchantRevenueForecastSimulation(merchant_name="SimpleCo")
        
        assert sim.merchant_name == "SimpleCo"
        assert sim.shareholders == []
        assert sim.sector == "E-commerce"  # Default
        assert sim.location == "United States"  # Default
        assert sim.current_monthly_revenue_usd == 10000.0  # Default
        assert sim.current_customer_count == 100  # Default
        assert sim.average_order_value == 50.0  # Default
        assert sim.founding_year is None
        assert sim.business_model == "B2C"  # Default
        assert sim.product_category is None
        assert sim.additional_context is None
    
    def test_name_property(self, merchant_simulation):
        """Test name property."""
        assert merchant_simulation.name == "MerchantRevenueForecast"
        assert isinstance(merchant_simulation.name, str)
    
    def test_description_property(self, merchant_simulation):
        """Test description property."""
        description = merchant_simulation.description
        assert "TechCo" in description
        assert "E-commerce" in description
        assert isinstance(description, str)
    
    def test_get_initial_state(self, merchant_simulation):
        """Test get_initial_state method."""
        state = merchant_simulation.get_initial_state()
        
        assert isinstance(state, dict)
        assert "monthly recurring revenue" in state
        assert "monthly_recurring_revenue" in state
        assert "daily_revenue" in state
        assert "customer_count" in state
        assert "average_order_value" in state
        assert "churn_rate" in state
        assert "growth_rate" in state
        
        # Check values
        assert state["monthly_recurring_revenue"] == 50000
        assert state["customer_count"] == 500
        assert state["average_order_value"] == 100.0
        assert state["churn_rate"] == 0.02
        assert state["growth_rate"] == 0.0
        
        # Check daily revenue calculation
        expected_daily = 50000 / 30
        assert abs(state["daily_revenue"] - expected_daily) < 0.01
    
    def test_build_step_prompt(self, merchant_simulation):
        """Test build_step_prompt method."""
        previous_state = merchant_simulation.get_initial_state()
        metrics = ["monthly recurring revenue", "customer_count"]
        
        prompt = merchant_simulation.build_step_prompt(
            step=1,
            previous_state=previous_state,
            metrics_to_track=metrics,
            time_step_unit="day"
        )
        
        assert isinstance(prompt, str)
        assert "TechCo" in prompt
        assert "E-commerce" in prompt
        assert "San Francisco" in prompt
        assert "B2C" in prompt
        assert "Electronics" in prompt
        assert "$50,000" in prompt or "50000" in prompt
        assert "500" in prompt  # customer count
        assert "day" in prompt.lower()
        assert "monthly recurring revenue" in prompt.lower()
    
    def test_get_step_output_schema(self, merchant_simulation):
        """Test get_step_output_schema method."""
        schema = merchant_simulation.get_step_output_schema()
        
        assert issubclass(schema, BaseModel)
        
        # Check schema has expected fields
        field_names = list(schema.model_fields.keys())
        assert "step" in field_names
        assert "reasoning" in field_names
        assert "monthly_recurring_revenue" in field_names
        assert "daily_revenue" in field_names
        assert "customer_count" in field_names
    
    def test_extract_metrics(self, merchant_simulation):
        """Test extract_metrics method."""
        from upsonic.simulation.scenarios.merchant_revenue import MerchantRevenueStepOutput
        
        # Create a mock step output
        step_output = MerchantRevenueStepOutput(
            step=1,
            reasoning="Test reasoning",
            confidence=0.8,
            monthly_recurring_revenue=55000.0,
            daily_revenue=1833.33,
            customer_count=550,
            average_order_value=100.0,
            churn_rate=0.02,
            growth_rate=0.05,
            market_sentiment="positive",
            key_factors=["growth", "retention"],
            risks=["competition"]
        )
        
        metrics_to_track = ["monthly recurring revenue", "customer_count", "growth_rate"]
        extracted = merchant_simulation.extract_metrics(step_output, metrics_to_track)
        
        assert isinstance(extracted, dict)
        assert "monthly recurring revenue" in extracted or "monthly_recurring_revenue" in extracted
        assert extracted.get("monthly_recurring_revenue", extracted.get("monthly recurring revenue")) == 55000.0
        assert extracted.get("customer_count") == 550
        assert extracted.get("growth_rate") == 0.05
    
    def test_validate_metrics(self, merchant_simulation):
        """Test validate_metrics method."""
        # Test with valid metrics
        metrics = {
            "monthly_recurring_revenue": 50000.0,
            "daily_revenue": 1666.67,
            "customer_count": 500,
            "churn_rate": 0.02,
            "growth_rate": 0.05
        }
        validated = merchant_simulation.validate_metrics(metrics, step=1)
        assert validated["monthly_recurring_revenue"] == 50000.0
        
        # Test with negative revenue (should be corrected)
        metrics_negative = {"monthly_recurring_revenue": -1000}
        validated_negative = merchant_simulation.validate_metrics(metrics_negative, step=1)
        assert validated_negative["monthly_recurring_revenue"] >= 0
        
        # Test with out-of-bounds churn rate
        metrics_churn = {"churn_rate": 1.5}
        validated_churn = merchant_simulation.validate_metrics(metrics_churn, step=1)
        assert 0 <= validated_churn["churn_rate"] <= 1
        
        # Test with out-of-bounds growth rate
        metrics_growth = {"growth_rate": 2.0}
        validated_growth = merchant_simulation.validate_metrics(metrics_growth, step=1)
        assert validated_growth["growth_rate"] <= 1.0
    
    def test_get_context_for_step(self, merchant_simulation):
        """Test get_context_for_step method."""
        # Test monthly milestone
        context_30 = merchant_simulation.get_context_for_step(30)
        assert context_30 is not None
        assert "month" in context_30.lower()
        
        # Test weekly context
        context_7 = merchant_simulation.get_context_for_step(7)
        assert context_7 is not None
        assert "week" in context_7.lower()
        
        # Test regular step (may return None)
        context_5 = merchant_simulation.get_context_for_step(5)
        # Can be None for regular steps
    
    def test_to_dict(self, merchant_simulation):
        """Test to_dict serialization method."""
        data = merchant_simulation.to_dict()
        
        assert isinstance(data, dict)
        assert data["name"] == "MerchantRevenueForecast"
        assert "TechCo" in data["description"]
        assert data["type"] == "MerchantRevenueForecastSimulation"
        assert data["merchant_name"] == "TechCo"
        assert data["shareholders"] == ["Alice", "Bob", "Charlie"]
        assert data["sector"] == "E-commerce"
        assert data["current_monthly_revenue_usd"] == 50000


# ============================================================================
# TIME STEP TESTS
# ============================================================================

class TestTimeStep:
    """Test TimeStep enum and utilities."""
    
    def test_time_step_enum_values(self):
        """Test all TimeStep enum values."""
        from upsonic.simulation.time_step import TimeStep
        
        assert TimeStep.HOURLY.value == "hourly"
        assert TimeStep.DAILY.value == "daily"
        assert TimeStep.WEEKLY.value == "weekly"
        assert TimeStep.MONTHLY.value == "monthly"
        assert TimeStep.QUARTERLY.value == "quarterly"
        assert TimeStep.YEARLY.value == "yearly"
    
    def test_time_step_from_string(self):
        """Test converting string to TimeStep."""
        from upsonic.simulation.time_step import TimeStep
        
        assert TimeStep.from_string("daily") == TimeStep.DAILY
        assert TimeStep.from_string("WEEKLY") == TimeStep.WEEKLY
        assert TimeStep.from_string("Monthly") == TimeStep.MONTHLY
        
        with pytest.raises(ValueError):
            TimeStep.from_string("invalid")
    
    def test_time_step_display_name(self):
        """Test display_name property."""
        from upsonic.simulation.time_step import TimeStep
        
        assert TimeStep.DAILY.display_name == "Daily"
        assert TimeStep.MONTHLY.display_name == "Monthly"
    
    def test_time_step_singular_unit(self):
        """Test singular_unit property."""
        from upsonic.simulation.time_step import TimeStep
        
        assert TimeStep.HOURLY.singular_unit == "hour"
        assert TimeStep.DAILY.singular_unit == "day"
        assert TimeStep.WEEKLY.singular_unit == "week"
        assert TimeStep.MONTHLY.singular_unit == "month"
        assert TimeStep.QUARTERLY.singular_unit == "quarter"
        assert TimeStep.YEARLY.singular_unit == "year"
    
    def test_time_step_plural_unit(self):
        """Test plural_unit property."""
        from upsonic.simulation.time_step import TimeStep
        
        assert TimeStep.HOURLY.plural_unit == "hours"
        assert TimeStep.DAILY.plural_unit == "days"
        assert TimeStep.WEEKLY.plural_unit == "weeks"
        assert TimeStep.MONTHLY.plural_unit == "months"
        assert TimeStep.QUARTERLY.plural_unit == "quarters"
        assert TimeStep.YEARLY.plural_unit == "years"
    
    def test_time_step_get_timedelta(self):
        """Test get_timedelta method."""
        from upsonic.simulation.time_step import TimeStep
        from datetime import timedelta
        
        assert TimeStep.HOURLY.get_timedelta(1) == timedelta(hours=1)
        assert TimeStep.DAILY.get_timedelta(1) == timedelta(days=1)
        assert TimeStep.WEEKLY.get_timedelta(1) == timedelta(weeks=1)
        assert TimeStep.DAILY.get_timedelta(5) == timedelta(days=5)


class TestTimeStepManager:
    """Test TimeStepManager functionality."""
    
    def test_init(self):
        """Test TimeStepManager initialization."""
        from upsonic.simulation.time_step import TimeStep, TimeStepManager
        from datetime import datetime
        
        start = datetime(2024, 1, 1)
        manager = TimeStepManager(TimeStep.DAILY, start_date=start)
        
        assert manager.time_step == TimeStep.DAILY
        assert manager.start_date == start
    
    def test_get_timestamp_for_step(self):
        """Test get_timestamp_for_step method."""
        from upsonic.simulation.time_step import TimeStep, TimeStepManager
        from datetime import datetime
        
        start = datetime(2024, 1, 1)
        manager = TimeStepManager(TimeStep.DAILY, start_date=start)
        
        assert manager.get_timestamp_for_step(0) == datetime(2024, 1, 1)
        assert manager.get_timestamp_for_step(1) == datetime(2024, 1, 2)
        assert manager.get_timestamp_for_step(5) == datetime(2024, 1, 6)
    
    def test_format_timestamp_daily(self):
        """Test format_timestamp for daily time step."""
        from upsonic.simulation.time_step import TimeStep, TimeStepManager
        from datetime import datetime
        
        manager = TimeStepManager(TimeStep.DAILY, start_date=datetime(2024, 1, 1))
        
        assert manager.format_timestamp(0) == "2024-01-01"
        assert manager.format_timestamp(1) == "2024-01-02"
    
    def test_format_timestamp_weekly(self):
        """Test format_timestamp for weekly time step."""
        from upsonic.simulation.time_step import TimeStep, TimeStepManager
        from datetime import datetime
        
        manager = TimeStepManager(TimeStep.WEEKLY, start_date=datetime(2024, 1, 1))
        
        assert "Week of 2024-01-01" in manager.format_timestamp(0)
    
    def test_format_timestamp_monthly(self):
        """Test format_timestamp for monthly time step."""
        from upsonic.simulation.time_step import TimeStep, TimeStepManager
        from datetime import datetime
        
        manager = TimeStepManager(TimeStep.MONTHLY, start_date=datetime(2024, 1, 15))
        
        assert "January 2024" in manager.format_timestamp(0)
    
    def test_get_step_description(self):
        """Test get_step_description method."""
        from upsonic.simulation.time_step import TimeStep, TimeStepManager
        from datetime import datetime
        
        manager = TimeStepManager(TimeStep.DAILY, start_date=datetime(2024, 1, 1))
        desc = manager.get_step_description(1)
        
        assert "Daily" in desc
        assert "step 1" in desc
    
    def test_get_time_context(self):
        """Test get_time_context method."""
        from upsonic.simulation.time_step import TimeStep, TimeStepManager
        from datetime import datetime
        
        manager = TimeStepManager(TimeStep.DAILY, start_date=datetime(2024, 1, 1))
        context = manager.get_time_context(0)
        
        assert context["step"] == 0
        assert context["year"] == 2024
        assert context["month"] == 1
        assert context["day"] == 1
        assert context["month_name"] == "January"
        assert context["is_year_start"] == True
        assert "timestamp" in context
        assert "day_of_week" in context
        assert "quarter" in context
        assert "is_weekend" in context
    
    def test_generate_timeline(self):
        """Test generate_timeline method."""
        from upsonic.simulation.time_step import TimeStep, TimeStepManager
        from datetime import datetime
        
        manager = TimeStepManager(TimeStep.DAILY, start_date=datetime(2024, 1, 1))
        timeline = manager.generate_timeline(5)
        
        assert len(timeline) == 6  # 0 through 5 inclusive
        assert timeline[0]["step"] == 0
        assert timeline[5]["step"] == 5


# ============================================================================
# SIMULATION CONFIG TESTS
# ============================================================================

class TestSimulationConfig:
    """Test SimulationConfig validation."""
    
    def test_valid_config(self, merchant_simulation):
        """Test valid configuration."""
        from upsonic.simulation.base import SimulationConfig
        
        config = SimulationConfig(
            simulation_object=merchant_simulation,
            model="openai/gpt-4o",
            time_step="daily",
            simulation_duration=100,
            metrics_to_track=["monthly recurring revenue"],
            temperature=0.7,
            retry_on_error=True,
            max_retries=3,
            show_progress=True
        )
        
        assert config.model == "openai/gpt-4o"
        assert config.time_step == "daily"
        assert config.simulation_duration == 100
        assert config.temperature == 0.7
        assert config.retry_on_error == True
        assert config.max_retries == 3
    
    def test_invalid_time_step(self, merchant_simulation):
        """Test invalid time step raises error."""
        from upsonic.simulation.base import SimulationConfig
        
        with pytest.raises(ValueError, match="Invalid time_step"):
            SimulationConfig(
                simulation_object=merchant_simulation,
                time_step="invalid"
            )
    
    def test_invalid_duration(self, merchant_simulation):
        """Test invalid duration raises error."""
        from upsonic.simulation.base import SimulationConfig
        
        with pytest.raises(ValueError, match="positive integer"):
            SimulationConfig(
                simulation_object=merchant_simulation,
                simulation_duration=0
            )
        
        with pytest.raises(ValueError, match="positive integer"):
            SimulationConfig(
                simulation_object=merchant_simulation,
                simulation_duration=-5
            )
    
    def test_invalid_temperature(self, merchant_simulation):
        """Test invalid temperature raises error."""
        from upsonic.simulation.base import SimulationConfig
        
        with pytest.raises(ValueError, match="temperature"):
            SimulationConfig(
                simulation_object=merchant_simulation,
                temperature=3.0
            )
    
    def test_invalid_max_retries(self, merchant_simulation):
        """Test invalid max_retries raises error."""
        from upsonic.simulation.base import SimulationConfig
        
        with pytest.raises(ValueError, match="max_retries"):
            SimulationConfig(
                simulation_object=merchant_simulation,
                max_retries=-1
            )


# ============================================================================
# SIMULATION RESULT TESTS
# ============================================================================

class TestSimulationResult:
    """Test SimulationResult attributes and methods."""
    
    def test_simulation_id(self, mock_simulation_result):
        """Test simulation_id property."""
        assert mock_simulation_result.simulation_id == "test-simulation-id-12345"
        assert isinstance(mock_simulation_result.simulation_id, str)
    
    def test_simulation_object(self, mock_simulation_result):
        """Test simulation_object property."""
        sim_obj = mock_simulation_result.simulation_object
        assert sim_obj.name == "MerchantRevenueForecast"
        assert sim_obj.merchant_name == "TechCo"
    
    def test_config(self, mock_simulation_result):
        """Test config property."""
        config = mock_simulation_result.config
        assert config.model == "openai/gpt-4o"
        assert config.time_step == "daily"
        assert config.simulation_duration == 5
    
    def test_steps(self, mock_simulation_result):
        """Test steps property."""
        steps = mock_simulation_result.steps
        assert len(steps) == 6  # 0 through 5
        assert steps[0].step == 0
        assert steps[5].step == 5
    
    def test_start_time(self, mock_simulation_result):
        """Test start_time property."""
        assert mock_simulation_result.start_time == 1704067200.0
        assert isinstance(mock_simulation_result.start_time, float)
    
    def test_end_time(self, mock_simulation_result):
        """Test end_time property."""
        assert mock_simulation_result.end_time == 1704067210.75
        assert isinstance(mock_simulation_result.end_time, float)
    
    def test_metrics_to_track(self, mock_simulation_result):
        """Test metrics_to_track property."""
        metrics = mock_simulation_result.metrics_to_track
        assert "monthly recurring revenue" in metrics
        assert "daily_revenue" in metrics
        assert "customer_count" in metrics
    
    def test_duration(self, mock_simulation_result):
        """Test duration computed property."""
        duration = mock_simulation_result.duration
        assert duration == 10.75
        assert isinstance(duration, float)
    
    def test_total_steps(self, mock_simulation_result):
        """Test total_steps computed property."""
        assert mock_simulation_result.total_steps == 5
    
    def test_successful_steps(self, mock_simulation_result):
        """Test successful_steps computed property."""
        assert mock_simulation_result.successful_steps == 5
    
    def test_failed_steps(self, mock_simulation_result):
        """Test failed_steps computed property."""
        assert mock_simulation_result.failed_steps == 0
    
    def test_get_metric_series(self, mock_simulation_result):
        """Test get_metric_series method."""
        series = mock_simulation_result.get_metric_series("monthly recurring revenue")
        
        assert len(series) == 6
        assert series[0] == 50000
        assert series[-1] == 52500
    
    def test_get_final_metrics(self, mock_simulation_result):
        """Test get_final_metrics method."""
        final = mock_simulation_result.get_final_metrics()
        
        assert final["monthly recurring revenue"] == 52500
        assert final["daily_revenue"] == 1750.00
        assert final["customer_count"] == 525
    
    def test_get_initial_metrics(self, mock_simulation_result):
        """Test get_initial_metrics method."""
        initial = mock_simulation_result.get_initial_metrics()
        
        assert initial["monthly recurring revenue"] == 50000
        assert initial["customer_count"] == 500
    
    def test_to_dict(self, mock_simulation_result):
        """Test to_dict serialization method."""
        data = mock_simulation_result.to_dict()
        
        assert isinstance(data, dict)
        assert data["simulation_id"] == "test-simulation-id-12345"
        assert data["total_steps"] == 5
        assert data["successful_steps"] == 5
        assert data["failed_steps"] == 0
        assert data["duration"] == 10.75
        assert "steps" in data
        assert len(data["steps"]) == 6
        assert "simulation_object" in data
        assert "config" in data
    
    def test_to_json(self, mock_simulation_result, temp_dir):
        """Test to_json export method."""
        file_path = os.path.join(temp_dir, "result.json")
        
        # Test chaining - should return self
        returned = mock_simulation_result.to_json(file_path)
        assert returned is mock_simulation_result
        
        # Verify file was created
        assert os.path.exists(file_path)
        
        # Verify content
        with open(file_path, 'r') as f:
            data = json.load(f)
        
        assert data["simulation_id"] == "test-simulation-id-12345"
        assert data["total_steps"] == 5


# ============================================================================
# STEP RECORD TESTS
# ============================================================================

class TestSimulationStepRecord:
    """Test SimulationStepRecord functionality."""
    
    def test_step_record_attributes(self):
        """Test SimulationStepRecord attributes."""
        from upsonic.simulation.result import SimulationStepRecord
        
        record = SimulationStepRecord(
            step=1,
            timestamp="2024-01-02",
            prompt="Test prompt",
            raw_response='{"value": 100}',
            parsed_response=None,
            metrics={"value": 100, "count": 50},
            execution_time=1.5,
            success=True,
            error=None
        )
        
        assert record.step == 1
        assert record.timestamp == "2024-01-02"
        assert record.prompt == "Test prompt"
        assert record.raw_response == '{"value": 100}'
        assert record.parsed_response is None
        assert record.metrics == {"value": 100, "count": 50}
        assert record.execution_time == 1.5
        assert record.success == True
        assert record.error is None
    
    def test_step_record_to_dict(self):
        """Test to_dict method."""
        from upsonic.simulation.result import SimulationStepRecord
        
        record = SimulationStepRecord(
            step=2,
            timestamp="2024-01-03",
            prompt="Prompt 2",
            raw_response="{}",
            parsed_response=None,
            metrics={"revenue": 50000},
            execution_time=2.0,
            success=True,
            error=None
        )
        
        data = record.to_dict()
        
        assert data["step"] == 2
        assert data["timestamp"] == "2024-01-03"
        assert data["metrics"]["revenue"] == 50000
        assert data["success"] == True


# ============================================================================
# REPORT TESTS - CHAINABLE METHODS
# ============================================================================

class TestSummaryReport:
    """Test SummaryReport class."""
    
    def test_report_type(self, mock_simulation_result):
        """Test report_type property."""
        report = mock_simulation_result.report("summary")
        assert report.report_type == "summary"
    
    def test_to_dict(self, mock_simulation_result):
        """Test to_dict method."""
        report = mock_simulation_result.report("summary")
        data = report.to_dict()
        
        assert isinstance(data, dict)
        assert data["simulation_name"] == "MerchantRevenueForecast"
        assert data["total_steps"] == 5
        assert data["successful_steps"] == 5
        assert data["failed_steps"] == 0
        assert "initial_metrics" in data
        assert "final_metrics" in data
        assert "metric_changes" in data
        
        # Check metric changes calculation
        changes = data["metric_changes"]
        assert "monthly recurring revenue" in changes
        assert changes["monthly recurring revenue"]["initial"] == 50000
        assert changes["monthly recurring revenue"]["final"] == 52500
        assert changes["monthly recurring revenue"]["change"] == 2500
    
    def test_to_json_chainable(self, mock_simulation_result, temp_dir):
        """Test to_json is chainable."""
        report = mock_simulation_result.report("summary")
        file_path = os.path.join(temp_dir, "summary.json")
        
        returned = report.to_json(file_path)
        assert returned is report  # Chainable
        assert os.path.exists(file_path)
        
        with open(file_path, 'r') as f:
            data = json.load(f)
        assert data["simulation_name"] == "MerchantRevenueForecast"
    
    def test_to_csv_chainable(self, mock_simulation_result, temp_dir):
        """Test to_csv is chainable."""
        report = mock_simulation_result.report("summary")
        file_path = os.path.join(temp_dir, "summary.csv")
        
        returned = report.to_csv(file_path)
        assert returned is report  # Chainable
        assert os.path.exists(file_path)
    
    def test_to_html_chainable(self, mock_simulation_result, temp_dir):
        """Test to_html is chainable."""
        report = mock_simulation_result.report("summary")
        file_path = os.path.join(temp_dir, "summary.html")
        
        returned = report.to_html(file_path)
        assert returned is report  # Chainable
        assert os.path.exists(file_path)
        
        with open(file_path, 'r') as f:
            content = f.read()
        
        assert "<html>" in content
        assert "MerchantRevenueForecast" in content
        assert "TechCo" in content or "Overview" in content


class TestDetailedReport:
    """Test DetailedReport class."""
    
    def test_report_type(self, mock_simulation_result):
        """Test report_type property."""
        report = mock_simulation_result.report("detailed")
        assert report.report_type == "detailed"
    
    def test_to_dict(self, mock_simulation_result):
        """Test to_dict method."""
        report = mock_simulation_result.report("detailed")
        data = report.to_dict()
        
        assert "steps" in data
        assert len(data["steps"]) == 6
        assert data["steps"][0]["step"] == 0
        assert data["simulation_id"] == "test-simulation-id-12345"
    
    def test_to_csv_chainable(self, mock_simulation_result, temp_dir):
        """Test to_csv exports step-by-step data."""
        report = mock_simulation_result.report("detailed")
        file_path = os.path.join(temp_dir, "detailed.csv")
        
        returned = report.to_csv(file_path)
        assert returned is report  # Chainable
        assert os.path.exists(file_path)
        
        # Verify CSV has data
        import csv
        with open(file_path, 'r') as f:
            reader = csv.DictReader(f)
            rows = list(reader)
        
        assert len(rows) == 6
        assert rows[0]["step"] == "0"
    
    def test_to_html_chainable(self, mock_simulation_result, temp_dir):
        """Test to_html is chainable."""
        report = mock_simulation_result.report("detailed")
        file_path = os.path.join(temp_dir, "detailed.html")
        
        returned = report.to_html(file_path)
        assert returned is report  # Chainable
        assert os.path.exists(file_path)
        
        with open(file_path, 'r') as f:
            content = f.read()
        
        assert "<table>" in content


class TestVisualReport:
    """Test VisualReport class."""
    
    def test_report_type(self, mock_simulation_result):
        """Test report_type property."""
        report = mock_simulation_result.report("visual")
        assert report.report_type == "visual"
    
    def test_to_dict(self, mock_simulation_result):
        """Test to_dict method contains series data."""
        report = mock_simulation_result.report("visual")
        data = report.to_dict()
        
        assert "timestamps" in data
        assert "series" in data
        assert len(data["timestamps"]) == 6
        assert "monthly recurring revenue" in data["series"]
    
    def test_to_html_chainable(self, mock_simulation_result, temp_dir):
        """Test to_html generates Chart.js visualization."""
        report = mock_simulation_result.report("visual")
        file_path = os.path.join(temp_dir, "visual.html")
        
        returned = report.to_html(file_path)
        assert returned is report  # Chainable
        assert os.path.exists(file_path)
        
        with open(file_path, 'r') as f:
            content = f.read()
        
        assert "chart.js" in content.lower() or "Chart" in content
        assert "canvas" in content
    
    def test_to_json_chainable(self, mock_simulation_result, temp_dir):
        """Test to_json is chainable."""
        report = mock_simulation_result.report("visual")
        file_path = os.path.join(temp_dir, "visual.json")
        
        returned = report.to_json(file_path)
        assert returned is report  # Chainable
        assert os.path.exists(file_path)


class TestStatisticalReport:
    """Test StatisticalReport class."""
    
    def test_report_type(self, mock_simulation_result):
        """Test report_type property."""
        report = mock_simulation_result.report("statistical")
        assert report.report_type == "statistical"
    
    def test_to_dict_statistics(self, mock_simulation_result):
        """Test to_dict calculates statistics correctly."""
        report = mock_simulation_result.report("statistical")
        data = report.to_dict()
        
        assert "statistics" in data
        stats = data["statistics"]
        
        # Check monthly recurring revenue statistics
        assert "monthly recurring revenue" in stats
        mrr_stats = stats["monthly recurring revenue"]
        
        assert "count" in mrr_stats
        assert "min" in mrr_stats
        assert "max" in mrr_stats
        assert "mean" in mrr_stats
        assert "median" in mrr_stats
        assert "stdev" in mrr_stats
        assert "variance" in mrr_stats
        assert "range" in mrr_stats
        assert "trend_slope" in mrr_stats
        assert "trend_direction" in mrr_stats
        
        # Verify calculated values
        assert mrr_stats["min"] == 50000
        assert mrr_stats["max"] == 52500
        assert mrr_stats["count"] == 6
        assert mrr_stats["trend_direction"] == "up"
    
    def test_to_html_chainable(self, mock_simulation_result, temp_dir):
        """Test to_html is chainable."""
        report = mock_simulation_result.report("statistical")
        file_path = os.path.join(temp_dir, "statistical.html")
        
        returned = report.to_html(file_path)
        assert returned is report  # Chainable
        assert os.path.exists(file_path)
        
        with open(file_path, 'r') as f:
            content = f.read()
        
        assert "Statistical" in content or "Mean" in content
    
    def test_to_json_chainable(self, mock_simulation_result, temp_dir):
        """Test to_json is chainable."""
        report = mock_simulation_result.report("statistical")
        file_path = os.path.join(temp_dir, "stats.json")
        
        returned = report.to_json(file_path)
        assert returned is report  # Chainable
        assert os.path.exists(file_path)


class TestReportsCollection:
    """Test ReportsCollection and save_all method."""
    
    def test_reports_returns_collection(self, mock_simulation_result):
        """Test reports() returns a collection."""
        from upsonic.simulation.result import ReportsCollection
        
        collection = mock_simulation_result.reports()
        assert isinstance(collection, ReportsCollection)
    
    def test_collection_iteration(self, mock_simulation_result):
        """Test collection can be iterated."""
        collection = mock_simulation_result.reports()
        report_types = [r.report_type for r in collection]
        
        assert "summary" in report_types
        assert "detailed" in report_types
        assert "visual" in report_types
        assert "statistical" in report_types
    
    def test_collection_getitem(self, mock_simulation_result):
        """Test collection supports [] access."""
        collection = mock_simulation_result.reports()
        
        summary = collection["summary"]
        assert summary.report_type == "summary"
        
        visual = collection["visual"]
        assert visual.report_type == "visual"
    
    def test_save_all_json(self, mock_simulation_result, temp_dir):
        """Test save_all with JSON format."""
        collection = mock_simulation_result.reports()
        
        returned = collection.save_all(directory=temp_dir, format="json")
        assert returned is collection  # Chainable
        
        # Check all files were created
        assert os.path.exists(os.path.join(temp_dir, "summary_report.json"))
        assert os.path.exists(os.path.join(temp_dir, "detailed_report.json"))
        assert os.path.exists(os.path.join(temp_dir, "visual_report.json"))
        assert os.path.exists(os.path.join(temp_dir, "statistical_report.json"))
    
    def test_save_all_html(self, mock_simulation_result, temp_dir):
        """Test save_all with HTML format."""
        collection = mock_simulation_result.reports()
        
        returned = collection.save_all(directory=temp_dir, format="html")
        assert returned is collection  # Chainable
        
        assert os.path.exists(os.path.join(temp_dir, "summary_report.html"))
        assert os.path.exists(os.path.join(temp_dir, "detailed_report.html"))
        assert os.path.exists(os.path.join(temp_dir, "visual_report.html"))
        assert os.path.exists(os.path.join(temp_dir, "statistical_report.html"))
    
    def test_save_all_csv(self, mock_simulation_result, temp_dir):
        """Test save_all with CSV format."""
        collection = mock_simulation_result.reports()
        
        returned = collection.save_all(directory=temp_dir, format="csv")
        assert returned is collection  # Chainable
        
        assert os.path.exists(os.path.join(temp_dir, "summary_report.csv"))
        assert os.path.exists(os.path.join(temp_dir, "detailed_report.csv"))
    
    def test_save_all_creates_directory(self, mock_simulation_result, temp_dir):
        """Test save_all creates output directory if it doesn't exist."""
        new_dir = os.path.join(temp_dir, "new_reports_dir")
        assert not os.path.exists(new_dir)
        
        collection = mock_simulation_result.reports()
        collection.save_all(directory=new_dir, format="json")
        
        assert os.path.exists(new_dir)
        assert os.path.exists(os.path.join(new_dir, "summary_report.json"))


# ============================================================================
# SIMULATION CLASS TESTS
# ============================================================================

class TestSimulation:
    """Test Simulation class initialization and properties."""
    
    def test_init(self, merchant_simulation):
        """Test Simulation initialization."""
        from upsonic.simulation import Simulation
        
        simulation = Simulation(
            merchant_simulation,
            model="openai/gpt-4o",
            time_step="daily",
            simulation_duration=100,
            metrics_to_track=["monthly recurring revenue"],
            temperature=0.7,
            retry_on_error=True,
            max_retries=3,
            show_progress=False
        )
        
        assert simulation.simulation_object is merchant_simulation
        assert simulation.duration == 100
        assert simulation.metrics_to_track == ["monthly recurring revenue"]
        assert simulation.is_running == False
    
    def test_simulation_id(self, merchant_simulation):
        """Test simulation_id is generated."""
        from upsonic.simulation import Simulation
        
        simulation = Simulation(merchant_simulation, simulation_duration=10)
        
        assert simulation.simulation_id is not None
        assert len(simulation.simulation_id) > 0
    
    def test_time_step_property(self, merchant_simulation):
        """Test time_step property."""
        from upsonic.simulation import Simulation
        from upsonic.simulation.time_step import TimeStep
        
        simulation = Simulation(merchant_simulation, time_step="weekly")
        
        assert simulation.time_step == TimeStep.WEEKLY


# ============================================================================
# CHAINED OPERATIONS TEST
# ============================================================================

class TestChainedOperations:
    """Test that all report methods support chaining."""
    
    def test_full_chained_workflow(self, mock_simulation_result, temp_dir):
        """Test a complete chained workflow."""
        result = mock_simulation_result
        
        # Chain multiple exports on same report
        summary_path = os.path.join(temp_dir, "chain_summary")
        result.report("summary")\
            .to_json(f"{summary_path}.json")\
            .to_csv(f"{summary_path}.csv")\
            .to_html(f"{summary_path}.html")
        
        assert os.path.exists(f"{summary_path}.json")
        assert os.path.exists(f"{summary_path}.csv")
        assert os.path.exists(f"{summary_path}.html")
    
    def test_multiple_reports_same_result(self, mock_simulation_result, temp_dir):
        """Test accessing multiple different reports."""
        result = mock_simulation_result
        
        result.report("summary").to_json(os.path.join(temp_dir, "s.json"))
        result.report("detailed").to_json(os.path.join(temp_dir, "d.json"))
        result.report("visual").to_json(os.path.join(temp_dir, "v.json"))
        result.report("statistical").to_json(os.path.join(temp_dir, "st.json"))
        
        assert os.path.exists(os.path.join(temp_dir, "s.json"))
        assert os.path.exists(os.path.join(temp_dir, "d.json"))
        assert os.path.exists(os.path.join(temp_dir, "v.json"))
        assert os.path.exists(os.path.join(temp_dir, "st.json"))
    
    def test_result_to_json_chainable(self, mock_simulation_result, temp_dir):
        """Test SimulationResult.to_json is chainable."""
        result = mock_simulation_result
        path = os.path.join(temp_dir, "full_result.json")
        
        # Should return self
        returned = result.to_json(path)
        assert returned is result
        
        # Can chain with report access
        returned.report("summary").to_json(os.path.join(temp_dir, "summary2.json"))
        assert os.path.exists(os.path.join(temp_dir, "summary2.json"))
