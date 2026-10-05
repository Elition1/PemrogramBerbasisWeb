"use strict";

/* =============================================================
   MODUL 3 — JAVASCRIPT DASAR DAN DOM
   Bagian B — Kegiatan Praktikum (skrip lengkap: script.js)
   Mata Kuliah: Pemrograman Berbasis Web (PROG31W)

   Cara pakai:
   Tautkan file ini tepat sebelum </body> pada index.html:
       <script src="script.js"></script>

   Elemen HTML yang diharapkan ada di index.html:
     - <header> berisi <h1>, tombol #btn-tema, dan tombol #btn-info
     - <aside> (kotak info tambahan)
     - container artikel dengan class .daftar-artikel  (dikosongkan di
       HTML — isinya dirender oleh JavaScript di Langkah 4)

   Kelas CSS pendukung di style.css:
     - body.dark-mode   (tema gelap)
     - .tersembunyi      (display: none)

   Catatan: setiap fitur dibungkus pengecekan keberadaan elemen
   (if (elemen) { ... }) agar skrip tetap berjalan meski salah satu
   bagian HTML belum ditambahkan.
   ============================================================= */


/* ---------- B.2 — Langkah 1: Variabel dan seleksi elemen dasar ----------
   Menyeleksi elemen dari halaman dan menampilkannya di Console
   untuk memastikan koneksi JavaScript <-> HTML berjalan.
   (Buka browser, tekan F12, lihat tab Console.)                         */
const judulSitus = document.querySelector("header h1");

if (judulSitus) {
  console.log(judulSitus);              // elemen <h1>-nya
  console.log(judulSitus.textContent);  // teks judul situs
}


/* ---------- B.3 — Langkah 2: Fungsi dan tombol Dark Mode ----------
   Menekan tombol #btn-tema akan menamb/menghapus class "dark-mode"
   pada <body> (classList.toggle).                                   */
const tombolTema = document.querySelector("#btn-tema");

function toggleTema() {
  document.body.classList.toggle("dark-mode");
}

if (tombolTema) {
  tombolTema.addEventListener("click", toggleTema);
}


/* ---------- B.4 — Langkah 3: Tombol tampilkan/sembunyikan aside ----------
   Menekan tombol #btn-info akan menampilkan/menyembunyikan <aside>
   dengan menoggle class "tersembunyi".                                   */
const tombolInfo = document.querySelector("#btn-info");
const kotakAside = document.querySelector("aside");

if (tombolInfo && kotakAside) {
  tombolInfo.addEventListener("click", () => {
    kotakAside.classList.toggle("tersembunyi");
  });
}


/* ---------- B.5 — Langkah 4: Render daftar artikel dari data JavaScript ----------
   Data artikel disimpan sebagai array of object, lalu dirender secara
   dinamis ke dalam container .daftar-artikel menggunakan createElement.
   (Artikel statis di index.html dihapus karena digantikan hasil render ini.) */
const daftarArtikel = [
  {
    judul: "Mengenal HTML Semantik",
    tanggal: "2026-08-20",
    isi: "HTML semantik membantu membangun struktur halaman yang bermakna...",
  },
  {
    judul: "Dasar CSS Responsif",
    tanggal: "2026-08-22",
    isi: "CSS responsif memastikan tampilan menyesuaikan berbagai layar...",
  },
  {
    judul: "Mengenal JavaScript dan DOM",
    tanggal: "2026-08-24",
    isi: "JavaScript memungkinkan halaman web menjadi interaktif...",
  },
];

const containerArtikel = document.querySelector(".daftar-artikel");

if (containerArtikel) {
  daftarArtikel.forEach((data) => {
    const article = document.createElement("article");

    const judul = document.createElement("h3");
    judul.textContent = data.judul;

    const waktu = document.createElement("time");
    waktu.textContent = data.tanggal;

    const isi = document.createElement("p");
    isi.textContent = data.isi;

    /* B.6 — Langkah 5: tombol hapus untuk tiap artikel */
    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";

    article.appendChild(judul);
    article.appendChild(waktu);
    article.appendChild(isi);
    article.appendChild(tombolHapus);

    containerArtikel.appendChild(article);
  });

  /* ---------- B.6 — Langkah 5: Hapus artikel per item (event delegation) ----------
     Satu listener pada container menangani klik tombol Hapus di seluruh
     artikel, termasuk artikel yang baru ditambahkan.                          */
  containerArtikel.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      e.target.closest("article").remove();
    }
  });
}
