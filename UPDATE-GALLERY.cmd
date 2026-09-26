@echo off
setlocal
set "PORTFOLIO_GALLERY_ROOT=%~dp0"
powershell.exe -NoProfile -Command "$ErrorActionPreference='Stop'; $root=$env:PORTFOLIO_GALLERY_ROOT; $folder=Join-Path $root 'assets\gallery'; $captions=Join-Path $root 'gallery-captions.json'; $old=@(); if(Test-Path -LiteralPath $captions){$old=@(Get-Content -LiteralPath $captions -Raw -Encoding UTF8 | ConvertFrom-Json)}; $items=@(Get-ChildItem -LiteralPath $folder -File | Where-Object {$_.Extension -match '^\.(jpg|jpeg|png|webp|gif|avif)$'} | Sort-Object Name | ForEach-Object {$photo=$_; $saved=$old | Where-Object {$_.file -eq $photo.Name} | Select-Object -First 1; $caption=$photo.BaseName -replace '[-_]',' '; if($saved -and $saved.caption){$caption=$saved.caption}; $alt=$caption; if($saved -and $saved.alt){$alt=$saved.alt}; [ordered]@{file=$photo.Name;caption=$caption;alt=$alt}}); $json=ConvertTo-Json -InputObject $items -Depth 4; Set-Content -LiteralPath $captions -Value $json -Encoding UTF8; Set-Content -LiteralPath (Join-Path $root 'gallery-data.js') -Value ('window.PORTFOLIO_GALLERY = '+$json+';') -Encoding UTF8; Write-Host ('Gallery updated: '+$items.Count+' images. Refresh your browser.');"
set "gallery_result=%errorlevel%"
if not "%gallery_result%"=="0" echo Gallery update failed. Check the message above.
if /I not "%~1"=="--no-pause" pause
exit /b %gallery_result%
