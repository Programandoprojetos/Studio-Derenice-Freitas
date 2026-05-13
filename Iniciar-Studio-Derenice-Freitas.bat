@echo off
setlocal

cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
    echo Node.js nao encontrado neste notebook.
    echo Instale o Node.js e tente novamente.
    pause
    exit /b 1
)

echo Iniciando Studio Derenice Freitas...
echo.
echo Para encerrar, feche esta janela ou pressione Ctrl+C.
echo.
echo Enderecos para acessar do celular na mesma rede Wi-Fi:
powershell -NoProfile -Command "Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -ne '127.0.0.1' -and $_.PrefixOrigin -ne 'WellKnown' -and $_.IPAddress -notlike '169.254*' } | ForEach-Object { Write-Host ('- http://' + $_.IPAddress + ':3000') }"
echo.

start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://127.0.0.1:3000'"
node "%~dp0server.js"

if errorlevel 1 (
    echo.
    echo O servidor foi encerrado com erro.
    pause
)
