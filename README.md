# Asha Mental Wellness — Website

This repository contains a static website (HTML/CSS/JS) with a small gallery of images and a video in `assets/`.

Quick notes
- Images are stored under `assets/images/` and the video under `assets/videos/`.
- Large media files in Git repositories increase clone size. For better handling of large media, enable Git LFS and track `assets/videos/*.mp4` and `assets/images/*.jpeg`.

Enable Git LFS (recommended)
1. Install Git LFS: https://git-lfs.github.com/
2. Run in repository root:

```bash
git lfs install
git lfs track "assets/videos/*.mp4"
git lfs track "assets/images/*.jpeg"
git add .gitattributes
git commit -m "Enable Git LFS for media"
```

If you already committed large files to the repo, consider using `git lfs migrate` to move existing media to LFS. See: https://github.com/git-lfs/git-lfs/wiki/Tutorial#migrating-a-repository

Preview locally
```bash
python -m http.server 8000
# open http://localhost:8000/index.html
```

If you want, I can:
- Configure Git LFS and migrate existing media into LFS (I will need your confirmation), or
- Remove media from the repo and leave lightweight placeholders, moving originals to a cloud storage location.

Contact
- Let me know which option you prefer and I'll proceed.
