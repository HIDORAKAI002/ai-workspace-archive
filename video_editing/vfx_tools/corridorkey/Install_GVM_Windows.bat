@echo off
TITLE GVM Setup Wizard
echo ===================================================
echo     GVM (AlphaHint Generator) - Auto-Installer
echo ===================================================
echo.

:: Check that uv sync has been run (the .venv directory should exist)
if not exist ".venv" (
    echo [ERROR] Project environment not found.
    echo Please run Install_CorridorKey_Windows.bat first!
    pause
    exit /b
)

:: 1. Download Weights (all Python deps are already installed by uv sync)
echo [1/1] Downloading GVM Model Weights (WARNING: Massive 80GB+ Download)...
if not exist "gvm_core\weights" mkdir "gvm_core\weights"

echo Downloading GVM weights from HuggingFace...
uv run hf download geyongtao/gvm --local-dir gvm_core\weights

echo.
echo ===================================================
echo   GVM Setup Complete!
echo ===================================================
pause
