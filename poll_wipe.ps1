for ($i=0; $i -lt 30; $i++) {
    try {
        $res = Invoke-RestMethod -Uri "https://asha-mental-wellness-the-therapyst.onrender.com/api/debug/wipe_all_reviews_DANGER" -ErrorAction Stop
        Write-Output "SUCCESS: $res"
        break
    } catch {
        Write-Output "Failed: $($_.Exception.Message)"
        Start-Sleep -Seconds 10
    }
}
