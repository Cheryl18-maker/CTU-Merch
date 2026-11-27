$zipUrl = 'https://www.python.org/ftp/python/3.11.9/python-3.11.9-embed-amd64.zip'
$zipDest = "$env:TEMP\python-3.11-embed.zip"
$pyDir = "C:\Users\nic\AppData\Local\Programs\Python311"
New-Item -ItemType Directory -Force -Path $pyDir | Out-Null
Write-Host "Downloading portable Python..."
& curl.exe -s -f -L -o $zipDest $zipUrl
Write-Host "Extracting portable Python..."
Expand-Archive -Path $zipDest -DestinationPath $pyDir -Force

# Enable site-packages in python311._pth
$pthFile = "$pyDir\python311._pth"
if (Test-Path $pthFile) {
    $content = Get-Content $pthFile
    $content = $content -replace '#import site', 'import site'
    Set-Content -Path $pthFile -Value $content
}

# Download get-pip.py
Write-Host "Setting up pip..."
$getPip = "$env:TEMP\get-pip.py"
& curl.exe -s -f -L -o $getPip 'https://bootstrap.pypa.io/get-pip.py'
& "$pyDir\python.exe" $getPip

& "$pyDir\python.exe" --version
