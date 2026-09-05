# Sinh các file ảnh nhận diện từ cùng một hình gốc (chữ "ô": vòng tròn + dấu mũ)
#   public/favicon-32.png       - favicon dự phòng cho trình duyệt không đọc SVG
#   public/apple-touch-icon.png - icon khi "thêm vào màn hình chính" trên iPhone/iPad (180px)
#   public/og.png               - ảnh xem trước khi chia sẻ link lên Facebook/Zalo/X (1200x630)
# File SVG gốc (public/favicon.svg, logo.svg, logo-dark.svg) sửa tay; sửa xong chạy lại:
#   powershell -ExecutionPolicy Bypass -File scripts/tao-icon.ps1
# Chỉ dùng thư viện có sẵn của Windows (System.Drawing), không cài thêm gì.
Add-Type -AssemblyName System.Drawing
$root = Split-Path $PSScriptRoot -Parent
$pub = Join-Path $root 'public'
$brand = [System.Drawing.ColorTranslator]::FromHtml('#3451b2')

function Ve-HuyHieu($g, $x, $y, $size) {
  # Vẽ đúng hình trong favicon.svg (viewBox 64): nền bo góc 14, mũ (24,18)-(32,10)-(40,18), tròn tâm (32,40) r=13, nét 6.5
  $s = $size / 64.0
  $r = 14 * $s
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $p.AddArc($x, $y, 2*$r, 2*$r, 180, 90); $p.AddArc($x+$size-2*$r, $y, 2*$r, 2*$r, 270, 90)
  $p.AddArc($x+$size-2*$r, $y+$size-2*$r, 2*$r, 2*$r, 0, 90); $p.AddArc($x, $y+$size-2*$r, 2*$r, 2*$r, 90, 90); $p.CloseFigure()
  $g.FillPath((New-Object System.Drawing.SolidBrush $brand), $p)
  $pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::White), (6.5*$s)
  $pen.StartCap = 'Round'; $pen.EndCap = 'Round'; $pen.LineJoin = 'Round'
  $pts = [System.Drawing.PointF[]]@(
    (New-Object System.Drawing.PointF ($x+24*$s), ($y+18*$s)),
    (New-Object System.Drawing.PointF ($x+32*$s), ($y+10*$s)),
    (New-Object System.Drawing.PointF ($x+40*$s), ($y+18*$s)))
  $g.DrawLines($pen, $pts)
  $g.DrawEllipse($pen, ($x+19*$s), ($y+27*$s), (26*$s), (26*$s))
}

function Tao-Canvas($w, $h) {
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'; $g.TextRenderingHint = 'AntiAliasGridFit'
  $g.PixelOffsetMode = 'HighQuality'
  return @($bmp, $g)
}

# 1. favicon-32.png và apple-touch-icon.png: chỉ có huy hiệu, nền trong suốt bên ngoài góc bo
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
$dark = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#213547'))
$bb = New-Object System.Drawing.SolidBrush $brand
$g.DrawString('Học AI Việt', $f1, $dark, 370, 205)
$g.DrawString('Thư viện mở, miễn phí, tiếng Việt', $f2, $bb, 378, 330)
$g.DrawString('Học lập trình và build sản phẩm với AI từ con số 0', $f2, $bb, 378, 380)
$g.Dispose(); $bmp.Save((Join-Path $pub 'og.png'), [System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose()

Get-ChildItem $pub -Include *.png -Recurse | Select-Object Name, Length
