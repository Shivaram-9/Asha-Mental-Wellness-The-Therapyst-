for ($i=0; $i -lt 40; $i++) {
    try {
        $res = Invoke-WebRequest -Uri "https://asha-mental-wellness-the-therapyst.onrender.com/api/debug/wipe_all_reviews_DANGER" -ErrorAction Stop
        Write-Output "SUCCESS: $($res.Content)"
        if ($res.Content -like "Deleted*") { break }
    } catch {
        Write-Output "Failed: $($_.Exception.Message)"
        Start-Sleep -Seconds 10
    }
}
