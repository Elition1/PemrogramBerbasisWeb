"use strict";

/* =============================================================
   MODUL 13 — AUTENTIKASI CLIENT-SIDE
   Bagian B — Kegiatan Praktikum : auth.js
   Mata Kuliah: Pemrograman Berbasis Web (PROG31W)

   Semua fungsi autentikasi dikumpulkan di sini. Dimuat oleh login.html
   dan index.html SEBELUM skrip lain.

   API latihan: DummyJSON (https://dummyjson.com)
     POST /auth/login  -> { accessToken, firstName, ... }
     GET  /auth/me     -> data profil (butuh header Authorization: Bearer)
   Akun uji: username "emilys", password "emilyspass".

   CATATAN KEAMANAN
     - Proteksi di klien hanya mengatur pengalaman pengguna (UX). Keamanan
       sebenarnya ada di server, yang memeriksa token pada tiap permintaan.
     - Token HANYA dikirim ke API autentikasi (fetchAman). Permintaan ke
       JSONPlaceholder memakai fetch biasa: jangan bocorkan token ke pihak lain.
   ============================================================= */

const API = "https://dummyjson.com";
const KUNCI = "token-blog";


/* ===================== B.3 — Penyimpanan token ===================== */
// Tugas Mandiri 1 ("Ingat saya"):
//   dicentang  -> localStorage   (bertahan setelah browser ditutup)
//   tidak      -> sessionStorage (hilang saat tab ditutup)
function simpanToken(token, ingat = false) {
  hapusToken();                               // pastikan tidak ada token ganda
  (ingat ? localStorage : sessionStorage).setItem(KUNCI, token);
}
function ambilToken() {
  return sessionStorage.getItem(KUNCI) ?? localStorage.getItem(KUNCI);
}
function hapusToken() {
  sessionStorage.removeItem(KUNCI);
  localStorage.removeItem(KUNCI);
}
function sudahLogin() {
  return ambilToken() !== null;
}


/* ===================== A.3 / B.6 — Membaca isi token (JWT) =====================
   Payload JWT hanya di-encode (Base64URL), BUKAN dienkripsi: siapa pun dapat
   membacanya. Gunakan HANYA untuk menampilkan informasi (mis. waktu
   kedaluwarsa), bukan untuk memutuskan keamanan.                              */
function bacaToken(token) {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(payload));
  } catch {
    return null;                              // token rusak / bukan JWT
  }
}


/* ===================== B.2 — Login ===================== */
async function login(username, password, ingat = false) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login gagal");
  simpanToken(data.accessToken, ingat);
  return data;
}


/* ===================== B.5 — Logout ===================== */
function logout() {
  hapusToken();
  location.href = "login.html";
}


/* ===================== B.3 — Proteksi halaman =====================
   location.replace() agar halaman terproteksi tidak tersimpan di riwayat
   tombol Back. Halaman disembunyikan agar tidak sempat berkedip.            */
function wajibLogin(tujuan = "login.html") {
  if (!sudahLogin()) {
    document.documentElement.style.visibility = "hidden";
    location.replace(tujuan);
    return false;
  }
  return true;
}


/* ===================== B.4 / B.5 — fetch dengan token ===================== */
async function fetchAman(url, opsi = {}) {
  const token = ambilToken();
  if (!token) {
    location.replace("login.html");
    throw new Error("Belum login");
  }
  const res = await fetch(url, {
    ...opsi,
    headers: { ...opsi.headers, Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) {                   // token ditolak / kedaluwarsa
    hapusToken();
    location.replace("login.html?sesi=habis");
    throw new Error("Sesi berakhir");
  }
  return res;
}
