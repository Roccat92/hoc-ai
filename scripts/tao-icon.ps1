# Sinh các file ảnh nhận diện từ cùng một hình gốc: số 0 đặc có lỗ tròn + dấu mũ hình nêm, nền đen
#   public/favicon-32.png       - favicon dự phòng cho trình duyệt không đọc SVG
#   public/apple-touch-icon.png - icon khi "thêm vào màn hình chính" trên iPhone/iPad (180px)
#   public/og.png               - ảnh xem trước khi chia sẻ link lên Facebook/Zalo/X (1200x630)
# File SVG gốc (public/favicon.svg, logo.svg, logo-dark.svg) sửa tay; sửa xong chạy lại:
#   powershell -ExecutionPolicy Bypass -File scripts/tao-icon.ps1
# Chỉ dùng thư viện có sẵn của Windows (System.Drawing), không cài thêm gì.
# File này PHẢI có BOM UTF-8 (PowerShell 5.1 đọc .ps1 không BOM theo ANSI, vỡ tiếng Việt).
Add-Type -AssemblyName System.Drawing
$root = Split-Path $PSScriptRoot -Parent
$pub = Join-Path $root 'public'
$nen = [System.Drawing.ColorTranslator]::FromHtml('#111114')
$trang = [System.Drawing.Color]::White

function Ve-HuyHieu($g, $x, $y, $size) {
  # Khớp favicon.svg (viewBox 64): nền bo góc 14; glyph thu 0.75 và dời (8,8):
  # nêm đỉnh (32,6) đáy y=16 từ 23→41; số 0 = chữ nhật 18..46 x 22..58 bo 14; lỗ tròn r=6 tâm (32,40)
  $s = $size / 64.0
  $r = 14 * $s
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $p.AddArc($x, $y, 2*$r, 2*$r, 180, 90); $p.AddArc($x+$size-2*$r, $y, 2*$r, 2*$r, 270, 90)
  $p.AddArc($x+$size-2*$r, $y+$size-2*$r, 2*$r, 2*$r, 0, 90); $p.AddArc($x, $y+$size-2*$r, 2*$r, 2*$r, 90, 90); $p.CloseFigure()
  $g.FillPath((New-Object System.Drawing.SolidBrush $nen), $p)
  $k = $s * 0.75; $ox = $x + 8*$s; $oy = $y + 8*$s
  $bw = New-Object System.Drawing.SolidBrush $trang
  $tri = [System.Drawing.PointF[]]@(
    (New-Object System.Drawing.PointF ($ox+32*$k), ($oy+6*$k)),
    (New-Object System.Drawing.PointF ($ox+41*$k), ($oy+16*$k)),
    (New-Object System.Drawing.PointF ($ox+23*$k), ($oy+16*$k)))
  $g.FillPolygon($bw, $tri)
  $rr = 14*$k
  $z = New-Object System.Drawing.Drawing2D.GraphicsPath
  $zx = $ox+18*$k; $zy = $oy+22*$k; $zw = 28*$k; $zh = 36*$k
  $z.AddArc($zx, $zy, 2*$rr, 2*$rr, 180, 180); $z.AddArc($zx, $zy+$zh-2*$rr, 2*$rr, 2*$rr, 0, 180); $z.CloseFigure()
  $g.FillPath($bw, $z)
  $g.FillEllipse((New-Object System.Drawing.SolidBrush $nen), ($ox+26*$k), ($oy+34*$k), (12*$k), (12*$k))
}

function Tao-Canvas($w, $h) {
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'; $g.TextRenderingHint = 'AntiAliasGridFit'
  $g.PixelOffsetMode = 'HighQuality'
  return @($bmp, $g)
}

# 1. favicon-32.png và apple-touch-icon.png: chỉ có huy hiệu, trong suốt ngoài góc bo
foreach ($item in @(@('favicon-32.png', 32), @('apple-touch-icon.png', 180))) {
  $bmp, $g = Tao-Canvas $item[1] $item[1]
  $g.Clear([System.Drawing.Color]::Transparent)
  Ve-HuyHieu $g 0 0 $item[1]
  $g.Dispose(); $bmp.Save((Join-Path $pub $item[0]), [System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose()
}

# 2. og.png: nền trắng, huy hiệu 240px bên trái, tên + hai dòng mô tả bên phải
$bmp, $g = Tao-Canvas 1200 630
$g.Clear([System.Drawing.Color]::White)
Ve-HuyHieu $g 90 195 240
$f1 = New-Object System.Drawing.Font 'Segoe UI', 84, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
$f2 = New-Object System.Drawing.Font 'Segoe UI', 36, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$den = New-Object System.Drawing.SolidBrush $nen
$xam = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#5c5c66'))
$g.DrawString('Học AI Việt', $f1, $den, 370, 205)
$g.DrawString('Thư viện mở, miễn phí, tiếng Việt', $f2, $xam, 378, 330)
$g.DrawString('Học lập trình và build sản phẩm với AI từ con số 0', $f2, $xam, 378, 380)
$g.Dispose(); $bmp.Save((Join-Path $pub 'og.png'), [System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose()

Get-ChildItem $pub -Include *.png -Recurse | Select-Object Name, Length
