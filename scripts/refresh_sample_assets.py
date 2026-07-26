"""Replace broken PDF-extracted images with HQ sample photos + clean logos."""

from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1] / "public" / "assets"
SAMPLES = ROOT / "samples"
PROPOSAL = ROOT / "proposal"
IMAGES = ROOT / "images"
FONTS = [
    Path(r"C:\Windows\Fonts\arialbd.ttf"),
    Path(r"C:\Windows\Fonts\segoeuib.ttf"),
]
FONT_PATH = next(f for f in FONTS if f.exists())


def save_logo(im: Image.Image, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    im = im.convert("RGBA")
    bbox = im.split()[-1].getbbox()
    if bbox:
        im = im.crop(bbox)
    pad = 24
    canvas = Image.new("RGBA", (im.width + pad * 2, im.height + pad * 2), (0, 0, 0, 0))
    canvas.paste(im, (pad, pad), im)
    canvas.save(dest, optimize=True)
    print(f"logo {dest.name} {canvas.size}")


def text_logo(text: str, color: tuple[int, int, int], dest: Path, size: int = 150) -> None:
    font = ImageFont.truetype(str(FONT_PATH), size)
    tmp = Image.new("RGBA", (10, 10))
    draw = ImageDraw.Draw(tmp)
    bb = draw.textbbox((0, 0), text, font=font)
    w, h = bb[2] - bb[0], bb[3] - bb[1]
    im = Image.new("RGBA", (w + 8, h + 8), (0, 0, 0, 0))
    ImageDraw.Draw(im).text((4 - bb[0], 4 - bb[1]), text, fill=(*color, 255), font=font)
    save_logo(im, dest)


def yonex_logo(dest: Path) -> None:
    font = ImageFont.truetype(str(FONT_PATH), 150)
    text = "YONEX"
    tmp = Image.new("RGBA", (10, 10))
    draw = ImageDraw.Draw(tmp)
    bb = draw.textbbox((0, 0), text, font=font)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    mark_w = 150
    im = Image.new("RGBA", (mark_w + 28 + tw + 20, max(th, 120) + 20), (0, 0, 0, 0))
    dr = ImageDraw.Draw(im)
    blue = (0, 90, 180, 255)
    for x in (10, 70):
        dr.ellipse((x, 70, x + 42, 112), fill=blue)
        dr.polygon([(x + 8, 70), (x + 34, 70), (x + 48, 8), (x - 6, 8)], fill=blue)
    dr.text((mark_w + 20 - bb[0], 10 - bb[1]), text, fill=blue, font=font)
    save_logo(im, dest)


def adidas_logo(dest: Path) -> None:
    font = ImageFont.truetype(str(FONT_PATH), 110)
    im = Image.new("RGBA", (700, 300), (0, 0, 0, 0))
    dr = ImageDraw.Draw(im)
    black = (17, 17, 17, 255)
    dr.polygon([(80, 200), (140, 80), (200, 200), (170, 200), (140, 120), (110, 200)], fill=black)
    dr.polygon([(200, 200), (270, 40), (340, 200), (305, 200), (270, 90), (235, 200)], fill=black)
    dr.polygon([(320, 200), (400, 10), (480, 200), (440, 200), (400, 70), (360, 200)], fill=black)
    dr.text((150, 210), "adidas", fill=black, font=font)
    save_logo(im, dest)


def write_rgb(src: Path, dest: Path, max_side: int = 2000, quality: int = 90) -> None:
    im = Image.open(src).convert("RGB")
    if max(im.size) > max_side:
        im.thumbnail((max_side, max_side), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    suffix = dest.suffix.lower()
    if suffix in {".jpg", ".jpeg"}:
        im.save(dest, quality=quality, optimize=True)
    else:
        im.save(dest, quality=quality)
    print(f"img {dest.name} {im.size} {dest.stat().st_size // 1024}KB")


def main() -> None:
    logos_dir = SAMPLES / "logos"
    logos_dir.mkdir(parents=True, exist_ok=True)

    yonex_logo(logos_dir / "yonex.png")
    adidas_logo(logos_dir / "adidas.png")
    text_logo("Mizuno", (0, 51, 160), logos_dir / "mizuno.png", 150)
    text_logo("Wilson", (0, 90, 60), logos_dir / "wilson.png", 150)
    text_logo("STIGA", (20, 20, 20), logos_dir / "stiga.png", 160)
    text_logo("COSCO", (210, 25, 25), logos_dir / "cosco.png", 150)
    text_logo("LP SUPPORT", (0, 95, 170), logos_dir / "lp-support.png", 120)
    text_logo("SS", (180, 20, 30), logos_dir / "ss-cricket.png", 180)
    text_logo("SURCO", (20, 55, 140), logos_dir / "surco.png", 150)

    brand_files = {
        "yonex": "yonex.png",
        "adidas": "adidas.png",
        "mizuno": "mizuno.png",
        "wilson": "wilson.png",
        "stiga": "stiga.png",
        "cosco": "cosco.png",
        "lp-support": "lp-support.png",
        "ss-cricket": "ss-cricket.png",
        "surco": "surco.png",
    }
    footer_files = {
        "yonex": "footer-yonex.png",
        "adidas": "footer-adidas.png",
        "mizuno": "footer-mizuno.png",
        "wilson": "footer-wilson.png",
        "stiga": "footer-stiga.png",
        "cosco": "footer-cosco.png",
    }
    partner_files = {
        "yonex": "partner-yonex.png",
        "adidas": "partner-adidas.png",
        "mizuno": "partner-mizuno.png",
        "wilson": "partner-wilson.png",
    }

    for slug, filename in brand_files.items():
        src = logos_dir / filename
        shutil.copy2(src, PROPOSAL / "brands" / filename)
        if slug in footer_files:
            shutil.copy2(src, PROPOSAL / "brands" / footer_files[slug])
        if slug in partner_files:
            shutil.copy2(src, PROPOSAL / partner_files[slug])
            shutil.copy2(src, PROPOSAL / f"logo-{slug}.png")

    hero_map = {
        "home-hero.jpg": SAMPLES / "heroes" / "home-athlete.jpg",
        "home-hero-runner.jpg": SAMPLES / "heroes" / "home-athlete.jpg",
        "home-hero-raw.jpg": SAMPLES / "heroes" / "home-athlete.jpg",
        "home-hero-composite.jpg": SAMPLES / "heroes" / "home-athlete.jpg",
        "brand-hero-yonex.jpg": SAMPLES / "heroes" / "badminton-athlete.jpg",
        "brand-hero-badminton.jpg": SAMPLES / "heroes" / "badminton-athlete.jpg",
        "wholesale-hero.jpg": SAMPLES / "heroes" / "wholesale-handshake.jpg",
        "about-hero.jpg": SAMPLES / "heroes" / "about-building.jpg",
        "about-building-hero.jpg": SAMPLES / "heroes" / "about-building.jpg",
        "footer-athlete.jpg": SAMPLES / "heroes" / "footer-athlete.jpg",
        "footer-runner.jpg": SAMPLES / "heroes" / "footer-athlete.jpg",
        "partner-handshake-hero.jpg": SAMPLES / "heroes" / "wholesale-handshake.jpg",
        "product-shoe-main.jpg": SAMPLES / "products" / "shoe-main.jpg",
        "product-main-shoe.jpg": SAMPLES / "products" / "shoe-main.jpg",
        "product-thumb-1.jpg": SAMPLES / "products" / "shoe-side.jpg",
        "product-thumb-2.jpg": SAMPLES / "products" / "shoe-white.jpg",
        "product-thumb-3.jpg": SAMPLES / "products" / "shoe-detail.jpg",
        "product-thumb-4.jpg": SAMPLES / "products" / "shoe-pair.jpg",
        "brand-partner-hero.jpg": SAMPLES / "heroes" / "tennis-action.jpg",
    }

    sky = SAMPLES / "heroes" / "dubai-skyline.jpg"
    if sky.exists():
        im = Image.open(sky).convert("RGB")
        washed = Image.blend(im, Image.new("RGB", im.size, (245, 248, 252)), 0.28)
        washed.save(PROPOSAL / "brands-skyline.png", quality=90)
        washed.save(PROPOSAL / "brands-skyline.jpg", quality=90)
        print(f"img brands-skyline {washed.size}")

    for dest_name, src in hero_map.items():
        if not src.exists():
            print(f"MISSING SRC {src}")
            continue
        write_rgb(src, PROPOSAL / dest_name)

    images_map = {
        "hero-sports-distribution.png": SAMPLES / "heroes" / "home-athlete.jpg",
        "brand-badminton.png": SAMPLES / "heroes" / "badminton-athlete.jpg",
        "footer-runner.png": SAMPLES / "heroes" / "footer-athlete.jpg",
        "about-building.png": SAMPLES / "heroes" / "about-building.jpg",
        "wholesale-handshake.png": SAMPLES / "heroes" / "wholesale-handshake.jpg",
        "storefront-arp.png": SAMPLES / "heroes" / "storefront.jpg",
    }
    for name, src in images_map.items():
        if src.exists():
            write_rgb(src, IMAGES / name, quality=92)

    print("ALL DONE")


if __name__ == "__main__":
    main()
