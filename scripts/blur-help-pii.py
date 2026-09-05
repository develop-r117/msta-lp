#!/usr/bin/env python3
"""OCR結果から人名・メールアドレスの領域をぼかしてヘルプ画像を差し替える。"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from PIL import Image, ImageFilter

EMAIL_RE = re.compile(
    r"[A-Za-z0-9._%+\-]+\s*@\s*[A-Za-z0-9.\-]+\.[A-Za-z]{2,}"
)
NAME_RE = re.compile(
    r"(orii|orli|takahiro|takahi|貴広|買広|hayakawa|早川|"
    r"開発共有|oratorio|orta0101|orjk|orr\s*taj|testst)",
    re.I,
)
SKIP_RE = re.compile(
    r"(メールアドレスで検索|名前、メール|電話番号・メール|通報されたユーザーメール)"
)


def should_blur(text: str) -> bool:
    if SKIP_RE.search(text):
        return False
    if EMAIL_RE.search(text):
        return True
    return bool(NAME_RE.search(text))


def blur_region(img: Image.Image, box: dict, pad: int = 10) -> None:
    x, y, w, h = box["x"], box["y"], box["w"], box["h"]
    x0 = max(0, int(x - pad))
    y0 = max(0, int(y - pad))
    x1 = min(img.width, int(x + w + pad))
    y1 = min(img.height, int(y + h + pad))
    if x1 <= x0 or y1 <= y0:
        return
    crop = img.crop((x0, y0, x1, y1))
    small = crop.resize(
        (max(1, crop.width // 14), max(1, crop.height // 8)),
        Image.Resampling.BILINEAR,
    )
    pixel = small.resize(crop.size, Image.Resampling.NEAREST)
    blurred = pixel.filter(ImageFilter.GaussianBlur(radius=4))
    img.paste(blurred, (x0, y0))


def main() -> int:
    ocr_path = Path(sys.argv[1] if len(sys.argv) > 1 else "/tmp/help-ocr.json")
    img_dir = Path(sys.argv[2] if len(sys.argv) > 2 else "public/screenshots/help")
    data = json.loads(ocr_path.read_text())
    changed = 0
    for item in data:
        hits = [b for b in item["boxes"] if should_blur(b["text"])]
        if not hits:
            continue
        path = img_dir / item["file"]
        if not path.exists():
            print(f"missing: {path}")
            continue
        img = Image.open(path).convert("RGB")
        for box in hits:
            blur_region(img, box)
        img.save(path, "PNG", optimize=True)
        changed += 1
        print(f"{item['file']}: {len(hits)} regions")
        for box in hits:
            print(f"  {box['text']}")
    print(f"updated {changed} files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
