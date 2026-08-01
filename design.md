Design System: Portfolio Neubrutalism

Dokumen referensi visual & komponen untuk membangun website portofolio bergaya neubrutalism — desain yang jujur, berani, dan terasa "tactile" (bisa "disentuh"), tanpa gradient atau efek soft yang generik.

1. Filosofi Desain

Neubrutalism (neo-brutalism) menggabungkan kejujuran struktural ala web brutalism klasik dengan warna cerah dan tipografi tebal yang playful. Hasilnya: antarmuka yang terasa fisik — seperti kertas, stiker, atau kartu yang bisa "ditekan" — bukan permukaan kaca yang melayang.

Empat prinsip inti:

Jujur, bukan disembunyikan — border, shadow, dan struktur grid terlihat jelas. Tidak ada blur, glassmorphism, atau gradient untuk menutupi bentuk asli elemen.
Berani tanpa ragu — warna solid & saturasi tinggi, kontras tegas antar elemen. Tidak ada warna pastel yang "aman".
Tactile & fisik — hard shadow (tanpa blur) dan interaksi "tekan" membuat elemen terasa bisa disentuh, bukan sekadar gambar datar.
Fungsi dulu, dekorasi kemudian — bentuk mengikuti fungsi; dekorasi (rotasi, stiker, pola titik) menguatkan hierarki, bukan menutupinya.
2. Palet Warna
Token	Hex	Fungsi
--color-bg	
#FFF8E7	Background utama halaman (krem hangat, kesan kertas)
--color-surface	
#FFFFFF	Background card & komponen
--color-ink	
#141414	Warna teks utama & semua border
--color-primary	
#FFC900	Aksen utama — CTA utama, highlight, hero
--color-secondary	
#FF4FA3	Aksen kedua — badge, hover, elemen dekoratif
--color-tertiary	
#3772FF	Aksen ketiga — link, ikon, variasi tag
--color-success	
#22C55E	Status berhasil (form terkirim, dsb.)
--color-danger	
#FF3B30	Status error / validasi gagal
--color-muted	
#EDE7D8	Divider tipis, background non-aktif

Aturan pakai: satu warna aksen dominan per section — jangan campur 3 aksen dalam satu komponen kecil. Teks di atas warna terang (primary, secondary) selalu pakai --color-ink, jangan putih, supaya kontras tetap terjaga.

3. Tipografi
Peran	Font	Weight	Catatan
Display / Heading	Archivo Black atau Space Grotesk	700–900	Geometris & tebal, jadi "wajah" halaman
Body	Inter atau Work Sans	400–500	Tetap nyaman dibaca di tengah elemen yang ramai
Mono / Label	Space Mono atau JetBrains Mono	600–700	Untuk eyebrow text, tag, angka — sentuhan raw/teknikal

Skala tipografi:

Elemen	Ukuran	Weight	Line-height
Hero	clamp(2.5rem, 6vw, 5.5rem)	900	1.05
H1	3rem / 48px	800	1.1
H2	2.25rem / 36px	800	1.15
H3	1.5rem / 24px	700	1.2
Body besar	1.125rem / 18px	400	1.6
Body	1rem / 16px	400	1.6
Caption / Label	0.875rem / 14px, uppercase, letter-spacing 0.04em	600 (mono)	1.4
4. Spacing & Grid
css
--space-1: 4px;
--space-2: 8px;
--space-3: 16px;
--space-4: 24px;
--space-5: 32px;
--space-6: 48px;
--space-7: 64px;
--space-8: 96px;
Container max-width 1200px, padding sisi 24px (mobile) / 64px (desktop)
Grid 12 kolom, gutter 24px
Jarak antar section: --space-8 (96px) di desktop, --space-6 (48px) di mobile
5. Border, Radius & Shadow — Ciri Khas Utama

Ini yang paling menentukan "rasa" neubrutalism. Border tebal + shadow keras tanpa blur adalah non-negotiable.

css
--border-width-sm: 2px;
--border-width: 3px;
--border-width-lg: 4px;
--border-color: var(--color-ink);

--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 16px;

--shadow-sm: 3px 3px 0 var(--color-ink);
--shadow-md: 5px 5px 0 var(--color-ink);
--shadow-lg: 8px 8px 0 var(--color-ink);

Versi ini pakai radius kecil-menengah (kesan lebih ramah/modern). Untuk kesan lebih keras/klasik, set semua --radius-* ke 0px.

Interaksi wajib pada semua elemen clickable (efek "ditekan" — signature move neubrutalism):

css
.el {
  transition: transform 120ms ease-out, box-shadow 120ms ease-out;
}
.el:hover {
  transform: translate(-3px, -3px);
  box-shadow: var(--shadow-lg);
}
.el:active {
  transform: translate(3px, 3px);
  box-shadow: none;
}
6. Komponen

Button (primary)

background: var(--color-primary), color: var(--color-ink)
border: var(--border-width) solid var(--color-ink), border-radius: var(--radius-md)
box-shadow: var(--shadow-md), padding 14px 28px
Font body, weight 700, sentence case (uppercase disimpan untuk label kecil saja)
Hover/active mengikuti pola interaksi di atas

Button (secondary/outline)

Sama seperti primary, tapi background: var(--color-surface)

Card

background: var(--color-surface), border 3px, border-radius: var(--radius-lg), box-shadow: var(--shadow-lg)
Padding 24–32px
Jika clickable: hover naik + rotasi halus rotate(-1deg)

Navbar

Sticky top, border-bottom: var(--border-width-lg) solid var(--color-ink), tanpa shadow (border sudah cukup memisahkan)
Nama/logo pakai font display kecil, nav link weight 600, CTA di kanan pakai style button ukuran kecil

Input & Textarea

background: var(--color-surface), border 3px, radius 8–10px, padding 12–16px
Fokus: jangan pakai outline biru default browser — ganti box-shadow: 4px 4px 0 var(--color-tertiary) agar tetap jelas dan konsisten dengan bahasa visual lainnya

Badge / Tag (skill, kategori)

Inline block kecil, border 2px, radius 6px, padding 6px 14px
Font mono, uppercase, kecil, bold
Ganti-ganti warna background antar primary / secondary / tertiary per item biar ritmis, bukan satu warna terus-menerus

Project Card (komponen terpenting di portofolio)

Area thumbnail di atas, dipisahkan border-bottom 3px dari area konten
Konten: judul (H3), deskripsi singkat 1–2 baris, baris tag teknologi (pakai Badge), ikon panah/link di pojok
Hover: card naik (translate(-4px,-4px)) + shadow membesar, thumbnail bisa transisi grayscale → warna
7. Ikonografi
Stroke tebal 2–2.5px — hindari ikon tipis/hairline yang bertentangan dengan bahasa visual yang tebal (contoh: Lucide dengan strokeWidth={2.5}, atau Phosphor Icons varian Bold)
Ikon skill/kontak dibungkus kotak kecil berwarna aksen + border, jadi terasa seperti "badge", bukan ikon polos mengambang
8. Motion & Interaksi
Durasi singkat & tegas: 100–180ms, easing ease-out. Hindari easing lembut/slow-float khas UI modern minimalis — di neubrutalism gerakan harus terasa mekanis dan langsung.
Scroll-reveal (opsional): pop-in singkat, scale(0.95) → scale(1) + fade, durasi ~250ms. Hindari parallax atau efek melayang berlebihan.
Wajib hormati prefers-reduced-motion: saat aktif, matikan transform pada hover/press, sisakan hanya perubahan warna.
9. Struktur Halaman Portofolio
Navbar — nama/logo, menu (Tentang, Karya, Skill, Kontak), CTA kecil (Resume/Hubungi)
Hero — headline personal & besar (mis. "Halo, saya [Nama] 👋 — [Peran], mendesain & membangun produk digital yang [nilai unik]."), subteks 1–2 kalimat, 2 CTA (utama + sekunder), foto profil dalam frame border+shadow yang sedikit dirotasi, badge kecil melayang "Available for work" (rotasi -6deg) sebagai signature touch
Tentang — bio singkat 2–3 paragraf, atau bio pendek + beberapa stat card bordered (lokasi, tahun pengalaman, fokus saat ini)
Skill / Tech Stack — grid badge, dikelompokkan per kategori (Frontend, Backend, Tools) jika daftarnya panjang
Karya / Proyek — grid 2–3 kolom Project Card; ini section paling penting, beri porsi visual terbesar
Pengalaman (opsional) — timeline vertikal, garis solid tebal sebagai connector, tiap titik ditandai kotak kecil berwarna aksen
Testimoni (opsional) — card kutipan dengan tanda kutip besar berwarna aksen sebagai elemen dekoratif
Kontak — form (nama, email, pesan) bergaya komponen di atas + tombol submit besar; bisa ditambah link langsung (email/LinkedIn/GitHub) sebagai tombol chunky berjajar
Footer — border-top tebal, copyright kecil, ulang ikon sosial dalam badge kecil
10. Elemen Signature

Supaya desain terasa "milik sendiri" dan bukan template neubrutalism generik, pakai satu bahasa dekoratif yang konsisten: motif "stiker dirotasi". Badge "available for work" di hero, hover project card, dan beberapa aksen kecil lain semua memakai rotasi halus (-1deg sampai -6deg) seolah ditempel manual di atas halaman — satu motif ini diulang di beberapa tempat, bukan dekorasi acak yang berbeda-beda.

11. Responsive
css
--bp-sm: 480px;
--bp-md: 768px;
--bp-lg: 1024px;
--bp-xl: 1280px;
Di mobile, kecilkan shadow (--shadow-lg → --shadow-sm) supaya tidak terlalu berat secara visual di layar kecil
Border tetap terlihat tebal — jangan turunkan di bawah 2px, ciri khasnya harus tetap terasa
Grid project & skill turun ke 1 kolom; hero jadi 1 kolom (teks di atas, visual di bawah)
12. Aksesibilitas
Cek kontras: teks di atas --color-primary (kuning) pakai --color-ink, jangan putih — pastikan rasio minimal 4.5:1
Karena border/shadow sering menggantikan outline default, sediakan focus state kustom yang jelas (contoh box-shadow warna aksen di atas), jangan sampai elemen fokus tak terlihat saat navigasi keyboard
Jangan andalkan warna saja untuk menandai status — sertakan juga perubahan ikon/teks
Gambar dekoratif diberi aria-hidden="true", gambar bermakna (foto profil, thumbnail proyek) diberi alt yang deskriptif
13. Referensi Token CSS Lengkap
css
:root {
  /* Colors */
  --color-bg: #FFF8E7;
  --color-surface: #FFFFFF;
  --color-ink: #141414;
  --color-primary: #FFC900;
  --color-secondary: #FF4FA3;
  --color-tertiary: #3772FF;
  --color-success: #22C55E;
  --color-danger: #FF3B30;
  --color-muted: #EDE7D8;

  /* Spacing */
  --space-1: 4px; --space-2: 8px; --space-3: 16px; --space-4: 24px;
  --space-5: 32px; --space-6: 48px; --space-7: 64px; --space-8: 96px;

  /* Border & Radius */
  --border-width-sm: 2px;
  --border-width: 3px;
  --border-width-lg: 4px;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;

  /* Shadow */
  --shadow-sm: 3px 3px 0 var(--color-ink);
  --shadow-md: 5px 5px 0 var(--color-ink);
  --shadow-lg: 8px 8px 0 var(--color-ink);

  /* Typography */
  --font-display: "Archivo Black", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "Space Mono", monospace;

  /* Breakpoints (referensi — pakai langsung di media query) */
  --bp-sm: 480px; --bp-md: 768px; --bp-lg: 1024px; --bp-xl: 1280px;
}