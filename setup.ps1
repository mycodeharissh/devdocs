# ============================================================
#  DevDocs — PowerShell Setup Script
#  Run this to create the full folder structure + Git repo
#  Usage:  .\setup.ps1  (run from where you want the folder)
# ============================================================

$ProjectName = "devdocs"
$BaseDir     = Join-Path (Get-Location) $ProjectName

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DevDocs — Project Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# --- 1. Create folder structure ---
Write-Host "Creating folder structure..." -ForegroundColor Yellow

$Folders = @(
    "$BaseDir",
    "$BaseDir\css",
    "$BaseDir\js",
    "$BaseDir\pages"
)

foreach ($folder in $Folders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder | Out-Null
        Write-Host "  + $folder" -ForegroundColor Green
    } else {
        Write-Host "  ~ $folder (exists)" -ForegroundColor DarkGray
    }
}

Write-Host ""

# --- 2. Copy files if running from the downloaded zip ---
# (Files should already be in place if you extracted the zip)
# This block just validates they exist:

$RequiredFiles = @(
    "index.html",
    "README.md",
    "css\style.css",
    "js\main.js",
    "js\page-shell.js",
    "pages\introduction.html",
    "pages\setup.html",
    "pages\java.html",
    "pages\python.html",
    "pages\javascript.html",
    "pages\react.html",
    "pages\nodejs.html",
    "pages\springboot.html",
    "pages\git.html",
    "pages\docker.html"
)

Write-Host "Checking files..." -ForegroundColor Yellow
$allGood = $true
foreach ($file in $RequiredFiles) {
    $fullPath = Join-Path $BaseDir $file
    if (Test-Path $fullPath) {
        Write-Host "  ✔ $file" -ForegroundColor Green
    } else {
        Write-Host "  ✘ MISSING: $file" -ForegroundColor Red
        $allGood = $false
    }
}

Write-Host ""

if (-not $allGood) {
    Write-Host "Some files are missing. Make sure you extracted all files into the '$ProjectName' folder." -ForegroundColor Red
    Write-Host ""
}

# --- 3. Initialize Git repository ---
Write-Host "Initializing Git repository..." -ForegroundColor Yellow
Set-Location $BaseDir

git init
git add .
git commit -m "feat: initial DevDocs setup"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ✅  Setup complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host ""
Write-Host "  1. Create a repo on GitHub (e.g. 'devdocs')" -ForegroundColor White
Write-Host "  2. Run the following commands:" -ForegroundColor White
Write-Host ""
Write-Host "     git remote add origin https://github.com/YOUR_USER/devdocs.git" -ForegroundColor Cyan
Write-Host "     git branch -M main" -ForegroundColor Cyan
Write-Host "     git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "  3. On GitHub: Settings → Pages → Source: main / root → Save" -ForegroundColor White
Write-Host "  4. Your docs will be live at:" -ForegroundColor White
Write-Host "     https://YOUR_USER.github.io/devdocs" -ForegroundColor Cyan
Write-Host ""
