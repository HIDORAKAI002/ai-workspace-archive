@echo off
TITLE VideoMaMa Setup Wizard
echo ===================================================
echo   VideoMaMa (AlphaHint Generator) - Auto-Installer
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
echo [1/1] Downloading VideoMaMa Model Weights...
if not exist "VideoMaMaInferenceModule\checkpoints" mkdir "VideoMaMaInferenceModule\checkpoints"

echo Downloading VideoMaMa weights from HuggingFace...
uv run hf download SammyLim/VideoMaMa --local-dir VideoMaMaInferenceModule\checkpoints

echo.
echo ===================================================
echo   VideoMaMa Setup Complete!
echo ===================================================
pause
