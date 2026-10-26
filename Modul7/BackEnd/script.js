// Modul 4 DOM + Modul 6 Client Side
// Mengambil elemen-elemen dari html
const tombolTheme = document.querySelector("#toggle-theme");
const tombolAside = document.querySelector("#toggle-aside");
const bodyWeb = document.querySelector(".body-web");
const portfolioList = document.querySelector("#portfolio-list");
const portfolioForm = document.querySelector("#portfolio-form");

// Membuat array of object untuk rendering
let portfolioObjects = [
  
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

  portfolioObjects = JSON.parse(localStorage.getItem("portfolio")) || [];

  // Setiap objek dalam array di buat kedalam web
  portfolioObjects.forEach((item) => {
    portfolioList.appendChild(createPortfolioCard(item));
  });
}

function simpanPortfolio(id, judul, isi, skill) {
  portfolioObjects = JSON.parse(localStorage.getItem("portfolio")) || [];
  portfolioObjects.push({
    id: id,
    judul: judul,
    isi: isi,
    skills: skill
  })
  localStorage.setItem("portfolio", JSON.stringify(portfolioObjects))
}

// Event handling submit untuk pembuatan sebuah portofolio baru
portfolioForm.addEventListener("submit", (e) => {
  // Untuk mencegah adanya reload web ketika ada aktivitas
  e.preventDefault(); 
  const idForm = Date.now();
  const judulForm = document.querySelector("#input-judul").value.trim();
  const isiForm = document.querySelector("#input-isi").value.trim();
  const skillForm = document.querySelector("#input-skills").value.trim(); 

  simpanPortfolio(idForm, judulForm, isiForm, skillForm)

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

  localStorage.setItem("portfolio", JSON.stringify(portfolioObjects))

  // render hasilnya lagi
  renderPortfolio();
});

renderPortfolio(); // Render hasil objek yang sudah ditulis

// Fungsi menyimpan prefrensi tema web agar tidak hilang ketika keluar 
function simpanTema() {
  const temaSekarang = bodyWeb.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem('temaBody', temaSekarang);
  
}

// Tombol Toggle theme dark
tombolTheme.addEventListener("click", () => {
  bodyWeb.classList.toggle("dark");
  simpanTema();
});

document.addEventListener("keydown", (e) => {
  // Jika Berada dalam Area input text maka fungsi keydown dimatikan sementara
  if (e.target.matches("input, textarea")) return;

  if (e.key.toLowerCase() === "d") {
    bodyWeb.classList.toggle("dark");
    simpanTema();
  }
});

// Memuat tema web kembali ketika terjadi pengulangan web
function muatPreferensiTema() {
  const tema = localStorage.getItem("temaBody");
  if (tema == "dark") {
    bodyWeb.classList.add("dark");
  }
}
muatPreferensiTema();

// Kode EventHandling Modul 5 untuk fitur komentar pada profil diri + Modul 6 Client Side
const commentForm = document.querySelector("#comment-form");
const commentName = document.querySelector("#comment-name");
const commentText = document.querySelector("#comment-text");
const commentError = document.querySelector("#comment-error");
const commentContainer = document.querySelector("#comment-container");
const clearCommentsBtn = document.querySelector("#clear-comments");

// Aturan untuk melakukan komen
const MIN_COMMENT_LENGTH = 5;

// Membuat array objek untuk inisialisasi pembuatan elemen
let commentObjects = [

];

// Funtion untuk mengdisplay msg error ketika ada kesalahan input
function showCommentError(message) {
  commentError.textContent = message;
}

// Sama seperti buat kartu portofolio dibuat untuk membuat sebuah kartu dengan isi nama dan text komentar dengan bikin 1 buah saja
function createCommentCard(item, item_like) {
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

  // Pembuatan Fitur like untuk menyimpan di localStorage
  const likeBtn = document.createElement("button");
  likeBtn.type = "button";
  likeBtn.className = "like-comment";
  likeBtn.textContent = `(${item_like}) Like`;
  likeBtn.dataset.like = item_like;

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "delete-comment";
  deleteBtn.textContent = "Hapus";

  const actions = document.createElement("div");
  actions.className = "comment-actions";
  actions.append(likeBtn, deleteBtn);

  card.append(header, body, actions);
  return card;
}

// Fungsi untuk menyimpan atribut dalam komen dalam localStorage
function simpanComments(id, nama, isi, waktu) {
  // Mengambil komen yang masih dalam local storage
  commentObjects = JSON.parse(localStorage.getItem("komen")) || [];
  commentObjects.push({
    id: id,
    nama: nama,
    isi: isi,
    waktu: waktu
  });
  localStorage.setItem("komen", JSON.stringify(commentObjects));
}

// Function digunakan untuk ngerender ketika terjadi perubahan pada komentar dan mengambil data komenan dari localStorage
function renderComments() {
  commentContainer.replaceChildren();
  commentObjects = JSON.parse(localStorage.getItem("komen")) || [];
  const semuaLikeKomen = JSON.parse(localStorage.getItem("itemLike")) || {};

  commentObjects.forEach((item) => {
    let jumlahLike = semuaLikeKomen[item.id] || 0;
    commentContainer.appendChild(createCommentCard(item, jumlahLike));
  })
}

// Membuat sebuah validasi 
commentForm.addEventListener("submit", (e) => {
  // Membuat aksi standar browser dihentikan
  e.preventDefault();

  // Mengambil value dari nama, id, waktu, dan isi text komentar
  const id = Date.now();
  const nama = commentName.value.trim();
  const isi = commentText.value.trim();
  const waktu = new Date();

  // Validasi jika isi nama dan isi text kosong atau lebih sedikit
  const namaError = validasiNama();
  if (namaError) {    
    showCommentError(namaError);
    commentName.focus();
    return;
  }

  if (isi.length < MIN_COMMENT_LENGTH) {
    showCommentError(`Komen membutuhkan ${MIN_COMMENT_LENGTH} karakter (sekarang ${isi.length}).`);
    commentText.focus();
    return;
  }

  // Menyimpan komen tersebut dalam localStorage
  simpanComments(id, nama, isi, waktu);

  // Tidak menampilkan error dikarenakan berjalan lancar tanpa adanya kesalahan input
  showCommentError("");

  // Hasil form direset seperti semula
  commentForm.reset();

  // Dirender kembali untuk menampilkan hasil input
  renderComments();
});

// Menghapus konten error jika nama komentar dan text lagi ditulis
[commentName, commentText].forEach((field) => {
  field.addEventListener("input", () => {
    field.setCustomValidity("");
    showCommentError("");
  });
});

// Event delegasi untuk semua elemen untuk menghapus konten diri
commentContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".delete-comment");
  if (!btn) return;

  const id = Number(btn.closest(".comment-card").dataset.id);
  commentObjects = commentObjects.filter((item) => item.id !== id);
  localStorage.setItem("komen", JSON.stringify(commentObjects));

  const semuaLike = JSON.parse(localStorage.getItem("itemLike")) || {};
  delete semuaLike[id];
  localStorage.setItem("itemLike", JSON.stringify(semuaLike));
  renderComments();
});

// Fungsi delegasi untuk membuat sebuah fitur like pada setiap komentar
commentContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".like-comment");
  if (!btn) return;

  const id = btn.closest(".comment-card").dataset.id;
  const semuaLike = JSON.parse(localStorage.getItem("itemLike")) || {};

  semuaLike[id] = (semuaLike[id] || 0) + 1;
  localStorage.setItem("itemLike", JSON.stringify(semuaLike));

  btn.textContent = `(${semuaLike[id]}) Like`;
});

// Menghapus semua komentar jika ada dengan elemen hapus semua komentar
clearCommentsBtn.addEventListener("click", () => {
  commentObjects = [];
  localStorage.setItem("komen", JSON.stringify(commentObjects));
  localStorage.removeItem("itemLike");
  renderComments();
});

// Render komen yang sudah diinisialisasi
renderComments();

function validasiNama ()
{
  commentName.setCustomValidity("");

  if (commentName.value.trim() === "") {
    commentName.setCustomValidity("Nama tidak boleh kosong.");
  } else if (commentName.value.trim().length < 3) {
    commentName.setCustomValidity("Nama minimal 3 karakter.");
  }

  return commentName.validationMessage;
}

const formDaftar = document.querySelector("#form-daftar");
const errorKonfirmasi = document.querySelector("#error-konfirmasi");
formDaftar.addEventListener("submit", (e) => {
  const password = document.querySelector("#password").value;
  const konfirmasi = document.querySelector("#konfirmasi").value;
  if (password !== konfirmasi) {
    e.preventDefault();
    errorKonfirmasi.textContent =
      "Konfirmasi password tidak sama dengan password";
  } else {
    errorKonfirmasi.textContent = "";
    alert("Pendaftaran berhasil (simulasi)!");
    formDaftar.reset();
  }
});

function validasiField(input, errorElement) {
  if (!input.checkValidity()) {
    errorElement.textContent = input.validationMessage;
  } else {
    errorElement.textContent = "" ;
  }
}
const username = document.querySelector("#username");
const errorUsername = document.querySelector("#error-username");
const email = document.querySelector("#email");
const errorEmail = document.querySelector("#email-error");

function checKEmail (email) {
  const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let testEmail = emailTest.test(email)

  if(!testEmail){
    errorEmail.textContent = "Email Tidak Sesuai"
  } else {
    errorEmail.textContent = "";
  }
}

username.addEventListener("input", () => validasiField(username, errorUsername));

email.addEventListener("input", () => checKEmail(email.value));

// Toggle show/hide aside
function simpanAside() {
  const tersembunyi = bodyWeb.classList.contains("aside-hidden");
  sessionStorage.setItem("asideHidden", tersembunyi);
}

// Membuat sebuah fitur untuk menghilangkan konten aside dan 
  // menggunakan sessionStorage untuk menjaga tampilan pada waktu login
tombolAside.addEventListener("click", () => {
  bodyWeb.classList.toggle("aside-hidden");
  simpanAside();
});

// Memuat preferensi yang digunakan dalam web
function muatPreferensiAside() {
  if (sessionStorage.getItem("asideHidden") === "true") {
    bodyWeb.classList.add("aside-hidden");
  }
}
muatPreferensiAside();

// Membuat fitur untuk menampilkan konten aside menggunakan navigasi kontak
const navContact = document.querySelector('nav a[href="#contact"]');

navContact.addEventListener("click", () => {
  // Tampilkan aside kalau sedang tersembunyi
  if (bodyWeb.classList.contains("aside-hidden")) {
    bodyWeb.classList.remove("aside-hidden");
    simpanAside();
  }
});

// Modul 6 Client Side : membuat fitur reset data dalam local storage 
// Membuat sebuah fitur untuk menghapus semua data dalam localStorage dan mengulangi web untuk render ulang hasil konten 
const tombolReset = document.querySelector("#delete-data-btn");

tombolReset.addEventListener("click", () => {
  const konfirmasi = confirm("Hapus Semua data tersimpan (Portofolio, Komentar, dan Isi like komentar)?");

  if(konfirmasi) {
    localStorage.clear();
    location.reload();
  }
})