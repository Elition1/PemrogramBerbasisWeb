// Modul 4 DOM 
// Mengambil elemen-elemen dari html
const tombolTheme = document.querySelector(".toggle-content");
const bodyWeb = document.querySelector(".body-web");
const portfolioList = document.querySelector("#portfolio-list");
const portfolioForm = document.querySelector("#portfolio-form");

// Membuat array of object untuk rendering
let portfolioObjects = [
  {
    id: 1,
    judul: "MatchGame",
    isi: "Pembuatan Game Matching dalam java",
    skills: "Java, OOP, Error Handling, User Input",
  },
  {
    id: 2,
    judul: "Kasir Romusha Market",
    isi: "Pembuatan Sistem Kasir dalam Python",
    skills: "Python, Library, OOP, Pandas, GUI",
  },
];

// Membuat sebuah kartu portofolio per satu item dalam array objek
function createPortfolioCard(item) {
  // membuat elemen article, h2, dan paragraf
  // dengan bawaan kelas yang sudah dicantumkan
  const card = document.createElement("article");
  card.className = "card-portfolio";
  card.dataset.id = item.id;

  const title = document.createElement("h2");
  title.textContent = item.judul;

  const desc = document.createElement("p");
  desc.textContent = item.isi;

  const skills = document.createElement("p");
  skills.textContent = `Skills : ${item.skills}`;

  // Membuat button hapus untuk satu tag elemen kartu
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "delete-portfolio";
  deleteBtn.textContent = "Hapus";

  // Mencantumkan elemen-elemen yang sudah dibuat ke kartu artikel
  card.append(title, desc, skills, deleteBtn);
  return card;
}

// Function digunakan untuk ngerender portfolio
function renderPortfolio() {
  // Mengosongkan terlebih dahulu konten dalam list portofolio
  portfolioList.replaceChildren(); 

  // Setiap objek dalam array di buat kedalam web
  portfolioObjects.forEach((item) => {
    portfolioList.appendChild(createPortfolioCard(item));
  });
}

// Event handling submit untuk pembuatan sebuah portofolio baru
portfolioForm.addEventListener("submit", (e) => {
  // Untuk mencegah adanya reload web ketika ada aktivitas
  e.preventDefault(); 

  // Memasukkan value yang sudah diinputkan ke dalam array objek
  portfolioObjects.push({
    id: Date.now(), 
    judul: document.querySelector("#input-judul").value.trim(),
    isi: document.querySelector("#input-isi").value.trim(),
    skills: document.querySelector("#input-skills").value.trim(),
  });

  // Hasil isi form tersebut di hapus
  portfolioForm.reset();

  // render lagi ketika sudah diinput
  renderPortfolio();
});

// Event delegasi dimana bertugas untuk menghapus elemen pada dirinya sendiri tidak semuanya
portfolioList.addEventListener("click", (e) => {
  const btn = e.target.closest(".delete-portfolio");
  if (!btn) return;

  const id = Number(btn.closest(".card-portfolio").dataset.id);
  // Memfilter hasil array dengan membuang tag elemen yang sesuai id
  portfolioObjects = portfolioObjects.filter((item) => item.id !== id);

  // render hasilnya lagi
  renderPortfolio();
});

// Tombol Toggle theme dark
tombolTheme.addEventListener("click", () => {
  bodyWeb.classList.toggle("dark");
});

document.addEventListener("keydown", (e) => {
  // Jika Berada dalam Area input text maka fungsi keydown dimatikan sementara
  if (e.target.matches("input, textarea")) return;

  if (e.key.toLowerCase() === "d") {
    bodyWeb.classList.toggle("dark");
  }
});

renderPortfolio(); // Render hasil objek yang sudah ditulis

// Kode EventHandling Modul 5 untuk fitur komentar pada profil diri
const commentForm = document.querySelector("#comment-form");
const commentName = document.querySelector("#comment-name");
const commentText = document.querySelector("#comment-text");
const commentError = document.querySelector("#comment-error");
const commentContainer = document.querySelector("#comment-container");
const clearCommentsBtn = document.querySelector("#clear-comments");

// Aturan untuk melakukan komen
const MIN_COMMENT_LENGTH = 5;

// Membuat array objek untuk inisialisasi contoh pembuatan elemen
let commentObjects = [
  {
    id: 1,
    nama: "Admin",
    isi: "Selamat datang di website saya!",
    waktu: new Date(),
  },
];

// Funtion untuk mengdisplay msg error ketika ada kesalahan input
function showCommentError(message) {
  commentError.textContent = message;
}

// Sama seperti buat kartu portofolio dibuat untuk membuat sebuah kartu dengan isi nama dan text komentar dengan bikin 1 buah saja
function createCommentCard(item) {
  const card = document.createElement("article");
  card.className = "comment-card";
  card.dataset.id = item.id;

  const header = document.createElement("div");
  header.className = "comment-header";

  const name = document.createElement("strong");
  name.textContent = item.nama;

  const time = document.createElement("small");
  time.textContent = item.waktu;

  header.append(name, time);

  const body = document.createElement("p");
  body.textContent = item.isi;

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "delete-comment";
  deleteBtn.textContent = "Hapus";

  card.append(header, body, deleteBtn);
  return card;
}

// Function digunakan untuk ngerender ketika terjadi perubahan pada komentar
function renderComments() {
  commentContainer.replaceChildren();

  commentObjects.forEach((item) => {
    commentContainer.appendChild(createCommentCard(item));
  })
}

// Membuat sebuah validasi 
commentForm.addEventListener("submit", (e) => {
  // Membuat aksi standar browser dihentikan
  e.preventDefault();

  // Mengambil value dari nama dan text komentar
  const nama = commentName.value.trim();
  const isi = commentText.value.trim();

  // Validasi jika isi nama dan isi text kosong atau lebih sedikit
  if (nama === "") {
    showCommentError("Nama tidak boleh kosong.");
    commentName.focus();
    return;
  }

  if (isi.length < MIN_COMMENT_LENGTH) {
    showCommentError(`Komen membutuhkan ${MIN_COMMENT_LENGTH} karakter (sekarang ${isi.length}).`);
    commentText.focus();
    return;
  }

  // Jika berhasil maka di masukkan kedalam array objek
  commentObjects.push({
    id: Date.now(),
    nama,
    isi,
    waktu: new Date(),
  });

  // Tidak menampilkan error dikarenakan berjalan lancar tanpa adanya kesalahan input
  showCommentError("");

  // Hasil form direset seperti semula
  commentForm.reset();

  // Dirender kembali untuk menampilkan hasil input
  renderComments();
});

// Menghapus konten error jika nama komentar dan text lagi ditulis
[commentName, commentText].forEach((field) => {
  field.addEventListener("input", () => showCommentError(""));
});

// Event delegasi untuk semua elemen untuk menghapus konten diri
commentContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".delete-comment");
  if (!btn) return;

  const id = Number(btn.closest(".comment-card").dataset.id);
  commentObjects = commentObjects.filter((item) => item.id !== id);
  renderComments();
});

// Menghapus semua komentar jika ada dengan elemen hapus semua komentar
clearCommentsBtn.addEventListener("click", () => {
  commentObjects = [];
  renderComments();
});

// Render komen yang sudah diinisialisasi
renderComments();