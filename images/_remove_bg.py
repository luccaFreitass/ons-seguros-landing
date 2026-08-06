import sys
import numpy as np
from PIL import Image, ImageFilter

def remove_bg(path_in, path_out, sat_thresh=0.16, v_opaque=150, v_transparent=246, pad_frac=0.06, square=False, max_size=None):
    img = Image.open(path_in).convert("RGB")
    hsv = img.convert("HSV")
    _, s, v = hsv.split()
    s_arr = np.array(s, dtype=np.float32) / 255.0
    v_arr = np.array(v, dtype=np.float32)
    rgb_arr = np.array(img, dtype=np.uint8)

    alpha = np.full(s_arr.shape, 255.0, dtype=np.float32)
    low_sat_mask = s_arr < sat_thresh
    v_low = v_arr[low_sat_mask]
    ramped = np.clip((v_transparent - v_low) / (v_transparent - v_opaque), 0.0, 1.0) * 255.0
    alpha[low_sat_mask] = ramped

    alpha_img = Image.fromarray(alpha.astype(np.uint8), mode="L")
    alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=1.1))

    rgba = np.dstack([rgb_arr, np.array(alpha_img, dtype=np.uint8)])
    out = Image.fromarray(rgba, mode="RGBA")

    # autocrop to content bbox (based on alpha)
    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)

    # add transparent padding
    w, h = out.size
    pad = int(max(w, h) * pad_frac)
    canvas_w, canvas_h = w + pad * 2, h + pad * 2
    if square:
        side = max(canvas_w, canvas_h)
        canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
        canvas.paste(out, ((side - w) // 2, (side - h) // 2), out)
    else:
        canvas = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
        canvas.paste(out, (pad, pad), out)

    if max_size:
        canvas.thumbnail((max_size, max_size), Image.LANCZOS)

    canvas.save(path_out)
    print(f"{path_in} -> {path_out}  size={canvas.size}")

if __name__ == "__main__":
    remove_bg("LogoNav.jpeg", "logo-nav.png", pad_frac=0.05)
    remove_bg("Logo Complete.jpeg", "logo-completo.png", pad_frac=0.04)
    remove_bg("LogoNav.jpeg", "favicon.png", pad_frac=0.10, square=True, max_size=256)
