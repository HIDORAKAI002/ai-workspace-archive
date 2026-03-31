# Benchmark Quick Start Guide

Follow this guide to run benchmarks as quickly as possible.

## ⚡ Quick Start (3 Steps)

### 1. Setup
```bash
cd benchmarks
make setup
```

This command will:
- ✅ Create virtual environment
- ✅ Install all dependencies
- ✅ Install Upsonic in editable mode

### 2. API Key
Create a `.env` file in the root directory:
```bash
cd ..
echo "OPENAI_API_KEY=sk-your-key-here" > .env
cd benchmarks
```

### 3. Run
```bash
make run
```

That's it! 🎉

---

## 📚 Other Commands

### Show Test Cases
```bash
make list
```

### Run All Tests
```bash
make run-all  # Warning: May take 5+ minutes
```

### Run Specific Test
```bash
make run-math           # Math problem
make run-structured     # Structured output
make run-analysis       # Text analysis
```

### Custom Iteration Count
```bash
make run-iterations N=10  # 10 iterations
```

### Show Results
```bash
make results
```

### Environment Check
```bash
make test-env
```

Output:
```
✓ Virtual environment exists
✓ .env file exists
✓ Upsonic installed
```

---

## 🔧 Troubleshooting

### "Virtual environment not found"
```bash
make setup
```

### ".env file not found"
```bash
cd ..
nano .env  # Add OPENAI_API_KEY
cd benchmarks
```

### Dependency Error
```bash
make install
```

### Reset Everything
```bash
make clean-all
make setup
```

---

## 📊 Example Workflow

```bash
# Initial setup
cd benchmarks
make setup
cd .. && echo "OPENAI_API_KEY=sk-xxx" > .env && cd benchmarks

# Quick test
make list       # View test cases
make run        # Run simple test

# Detailed analysis
make run-all    # Run all tests

# View results
make results    # List JSON files
cat overhead_analysis/results/*.json | jq .  # View JSON content

# Cleanup
make clean      # Clear cache
```

---

## 🎯 Understanding Results

Benchmark results show:

**Detailed Comparison Table:**
- Speed Metrics: Mean, Median, Stdev, Min, Max (ms)
- Memory: Object size (bytes)
- Cost: Per iteration and total cost
- Token Usage: Mean and total token counts

**Three-Way Comparison:**
- Direct: Minimum overhead
- Agent (no prompt): Without system prompt
- Agent (with prompt): With default system prompt

**Sample Outputs:**
- Actual responses from each approach
- You can see quality differences

---

## 💡 Tips

1. **First run is slower**: Model loading, cache creation
2. **API cost**: Each test ~$0.00001-0.0001
3. **Iteration count**: More iterations = more reliable results
4. **Network connection required**: For LLM API calls

---

## 🆘 Help

To see all commands:
```bash
make help
```

For detailed documentation:
- `README.md` - Main README
- `SETUP.md` - Detailed setup
- `overhead_analysis/README.md` - Project specific

