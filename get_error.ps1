try {
    $res = Invoke-WebRequest -Uri "https://asha-mental-wellness-the-therapyst.onrender.com/api/debug/wipe_all_reviews_DANGER"
} catch {
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    Write-Output $reader.ReadToEnd()
}
