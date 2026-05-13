@echo off
netsh advfirewall firewall add rule name="Studio Derenice Freitas 3000" dir=in action=allow protocol=TCP localport=3000
echo.
echo Regra do Firewall criada para a porta 3000.
pause
