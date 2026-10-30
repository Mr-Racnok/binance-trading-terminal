# NEXUS — Binance Spot terminal

Terminal web responsif berbahasa Indonesia. Node.js >=22; tanpa dependensi runtime.

```sh
npm start    # port 3000; dapat diubah melalui PORT
npm test
npm run check
```

## Fitur

- 12 pasangan USDT, pencarian pasar, harga dan statistik 24 jam.
- Chart candlestick + volume, OHLC saat hover, interval 1m/5m/15m/1h/4h/1d, hingga 150 candle. Waktu chart UTC.
- WebSocket ticker, trade, dan partial depth 20 level @100ms (12 level teratas ditampilkan). Harga chart mengikuti interval stream Binance, bukan setiap transaksi.
- Reconnect dengan backoff, indikator koneksi dan pemblokiran order ketika ticker lebih lama dari 15 detik.
- Simulasi beli/jual market dan limit, reservasi dana, pembatalan, riwayat, saldo, biaya 0.1%, persentase saldo, dan penyimpanan lokal.

## Data & batasan

Data asli diambil browser langsung dari `https://data-api.binance.vision/api/v3` dan `wss://data-stream.binance.vision/stream`. Izinkan kedua host di jaringan browser. Pembatasan wilayah, jaringan atau layanan Binance dapat menyebabkan data tidak tersedia. Tidak ada harga palsu sebagai fallback.

Semua order **simulasi**, tidak dikirim ke Binance. Market memakai harga ticker terakhir; limit terisi pada/saat melewati batas, tanpa model slippage, antrian, partial fill, atau filter lot/notional Binance. Limit hanya dievaluasi untuk pasangan yang sedang aktif dan saat halaman terbuka; tidak berjalan di background setelah tab ditutup. Ekuitas memakai harga snapshot terakhir untuk aset lain. Favorit disimpan secara lokal. Reset menghapus saldo dan riwayat simulasi. Jangan masukkan API secret di frontend.

Ini fondasi terminal Spot, belum integrasi trading akun sungguhan, futures, margin, OCO, atau stop order. Trading sungguhan memerlukan backend signing, otentikasi pengguna, filter exchangeInfo, sinkronisasi user data dan rekonsiliasi order.

## Dokumentasi resmi

- https://www.binance.com/en/binance-api
- https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md
- https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md

## Validasi

`npm test` menjalankan tes pembukuan, biaya, penolakan input, reservasi dan crossing limit. Pengujian browser dengan data uji mencakup order market/limit, cancel, persistensi dan layout seluler; data uji tidak disertakan dalam aplikasi. Koneksi live dari cloud saat pembangunan diblokir kebijakan jaringan (HTTP CONNECT 403), sehingga feed live belum terverifikasi di lingkungan ini.
