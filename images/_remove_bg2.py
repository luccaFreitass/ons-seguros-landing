import numpy as np
from PIL import Image, ImageFilter

def remove_bg(path_in, path_out, sat_thresh=0.12, v_opaque=180, v_transparent=250, pad_frac=0.05, square=False, max_size=None):
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
    alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=0.8))

    rgba = np.dstack([rgb_arr, np.array(alpha_img, dtype=np.uint8)])
    out = Image.fromarray(rgba, mode="RGBA")

    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)

    w, h = out.size
    pad = max(2, int(max(w, h) * pad_frac))
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
    # navbar: wordmark largo e curto
    remove_bg("Novo-Logo-so-ONS.png", "logo-nav.png", pad_frac=0.06)
    # coluna "Quem somos": versão sem subtítulo, mais legível em tamanho pequeno
    remove_bg("Novo-logo-sem-subtitulo ons.png", "logo-completo.png", pad_frac=0.05)
    # favicon: só o ícone gráfico, recortado quadrado
    remove_bg("novo logo só grafico.png", "favicon.png", pad_frac=0.08, square=True, max_size=256)
    # guarda a versão completa (com subtítulo) como material extra, ainda não usada no site
    remove_bg("Novo-Logo-ons.png", "logo-completo-com-subtitulo.png", pad_frac=0.05)
