@echo off
echo === Syncing main branch to match develop branch ===
echo.

cd /d "%~dp0"

echo Step 1: Cloning the repo fresh...
git clone https://github.com/Amr-Mohamed665/SAVORA__RESTAURANT_.git _temp_repo
cd _temp_repo

echo.
echo Step 2: Checking out main and resetting to develop...
git checkout main
git reset --hard origin/develop

echo.
echo Step 3: Force pushing main...
git push --force origin main

echo.
echo Step 4: Cleaning up...
cd ..
rmdir /s /q _temp_repo

echo.
echo === DONE! main branch now matches develop branch exactly ===
echo Both branches are now identical.
pause
