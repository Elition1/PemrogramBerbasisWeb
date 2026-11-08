// Membuat API untuk JSON placeholder
const BASEAPI = "https://jsonplaceholder.typicode.com";

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

// Indikator boolean untuk menonaktifkan Tombol 
let eventJalan = false;

// Deklasikan variabel untuk fitur edit dalam kolom komentar
let IDKomenEdit = null;
const submitKomenBtn = commentForm.querySelector('[type="submit"]');
const teksSubmit = submitKomenBtn.textContent;

// Fitur fungsi untuk keluar dari mode edit jika tidak ingin melakukan perubahan
function keluarModeEdit() {
  IDKomenEdit = null;
  commentForm.reset();
  submitKomenBtn.textContent = teksSubmit;
}

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

  // Updated : Memformatkan waktu menjadi lebih rapi
  // dan membuat JSON tidak membuat waktunya menjadi ISO string 
  const time = document.createElement("small");
  const tanggal = new Date(item.waktu);
  time.textContent = isNaN(tanggal)
    ? item.waktu
    : tanggal.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });

  header.append(name, time);

  const body = document.createElement("p");
  body.textContent = item.isi;

  // Pembuatan Fitur like untuk menyimpan di localStorage
  const likeBtn = document.createElement("button");
  likeBtn.type = "button";
  likeBtn.className = "like-comment";
  likeBtn.textContent = `(${item_like}) Like`;
  likeBtn.dataset.like = item_like;

  // Penambahan tombol edit pada kartu komentar
  const editbtn = document.createElement("button");
  editbtn.type = "button";
  editbtn.className = "edit-comment";
  editbtn.textContent = "Edit";

  // Pembuatan tombol hapus pada kartu komentar
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "delete-comment";
  deleteBtn.textContent = "Hapus";

  // Membuat elemen div untuk memudahkan pengolompokkan dan penempatan elemen pada web
  const actions = document.createElement("div");
  actions.className = "comment-actions";
  actions.append(likeBtn, editbtn, deleteBtn);

  // Menempatkan elemen yang sudah dibuat pada kartu
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
commentForm.addEventListener("submit", async (e) => {
  // Membuat aksi standar browser dihentikan
  e.preventDefault();

  // Aksi untuk mencegah double klik pada tombol
  if (eventJalan) return;

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

  // fungsi untuk membuat indikator visual pada tombol
  buttonIndikator(true);

  // Jika perubahan yang lakukan adalah editan komentar yang sudah ada di web
  if(IDKomenEdit !== null) {
    try {
      // Usaha mempebarui komentar dalam web ke Server API
      await editKomen(IDKomenEdit, nama, isi);
      keluarModeEdit();
      showCommentError("");
    } finally {
      renderComments();
      buttonIndikator(false);
    }
    return;
  }

  // visual indikator memuat komentar ke API
  if (loadingKomen) loadingKomen.style.display = "block";

  // Proses untuk mengirimkan komentar ke server API dan sekaligus simpan dalam localStorage
  try {
    const hasil = await kirimKomenKeServer(id, nama, isi, waktu);
    // Menyimpan komen tersebut dalam localStorage
    simpanComments(id, nama, isi, waktu);
    console.log("Komentar berhasil disimpan dalam Server, id: ", hasil.id);
    // Tidak menampilkan error dikarenakan berjalan lancar tanpa adanya kesalahan input
    showCommentError("");
    // Hasil form direset seperti semula
    commentForm.reset();
  } catch (error) {
    // Error yang didapatkan jika terjadi kegagalan
    alert(error.status ? pesanDariStatus(error.status) : "Gagal Terhubung Ke Server");
    console.log(error);
  } finally {
    // Balikkan indikator seperti semula jika sudah selesai
    buttonIndikator(false);
    loadingKomen.style.display = "none";
  }

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
commentContainer.addEventListener("click", async (e) => {
  const btn = e.target.closest(".delete-comment");
  if (!btn) return;

  // Aksi untuk mencegah double klik pada tombol
  if (eventJalan) return;

  // fungsi untuk membuat indikator visual pada tombol
  buttonIndikator(true);

  // mengambil id dari komentar yang ingin dihapus
  const id = Number(btn.closest(".comment-card").dataset.id);

  // ambil komentar dengan filter dari Id yang diambil
  commentObjects = commentObjects.filter((item) => item.id !== id);

  // deklarasi response untuk fungsi try catch
  let response;

  // tambah visual indikator untuk penghapusan komen dari server API
  if (editingKomenLoader) editingKomenLoader.style.display = "block";
  try {
    // menghapus komentar dari server menggunakan metode DELETE
    response = await fetch (
      BASEAPI + `/comments/${id}`, {
        method: "DELETE",
      }
    );

    // Jika responsenya tidak sukses maka nampilkan statusnya
    if (!response.ok) {
      throw new Error("Status: " + response.status);
    }
    console.log(pesanDariStatus(response.status), "Status: ", response.status);
    // mengubah response menjadi json untuk menampilkan keberhasilan penghapusan komentar
    const hasil = await response.json();
    console.log("Berhasil Menghapus Komentar dari Server Id: ", hasil.id ?? id);
  } catch (error) {
    // jika terjadi kesalahan maka kasih notifikasi berupa alert dan pesan custom dari fungsi pesanDariStatus
    alert(response ? pesanDariStatus(response.status) : "Gagal Terhubung Ke Server");
    console.error(error);
  } finally {
    if (editingKomenLoader) editingKomenLoader.style.display = "none";
    buttonIndikator(false);
  }

  localStorage.setItem("komen", JSON.stringify(commentObjects));

  // Mengambil data localStorage dari jumlah like komen tersebut untuk penghapusan
  const semuaLike = JSON.parse(localStorage.getItem("itemLike")) || {};

  // menghapus jumlah like pada komen tersebut
  delete semuaLike[id];

  // Menyimpan perubahan tersebut ke localStorage itemLike
  localStorage.setItem("itemLike", JSON.stringify(semuaLike));

  // render lagi komen setelah perubahan
  renderComments();
});

// Fungsi delegasi untuk membuat sebuah fitur like pada setiap komentar
commentContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".like-comment");
  if (!btn) return;

  // Jika sebuah proses lagi berjalan maka kembali dari event tersebut
  if (eventJalan) return;

  // mengaktifkan indikator tombol proses lagi terjadi
  buttonIndikator(true);

  // Mengambil id dari komen yang ingin menambahkan like
  const id = btn.closest(".comment-card").dataset.id;
  // mengambil data dari localStorage dari itemLike
  const semuaLike = JSON.parse(localStorage.getItem("itemLike")) || {};

  // menambahkan like komen tersebut berdasarkan like
  semuaLike[id] = (semuaLike[id] || 0) + 1;

  // menyimpan perubahan tersebut dalam LocalStorage
  localStorage.setItem("itemLike", JSON.stringify(semuaLike));

  // mengubah tampilan jumlah like pada kkomen
  btn.textContent = `(${semuaLike[id]}) Like`;

  // menyimpan data like ke server API
  updateLikeKomenKeServer(id, semuaLike[id]);
});

// Menambahkan event listener pada komen edit
commentContainer.addEventListener("click", async (e) => {
  const btn = e.target.closest(".edit-comment");
  if (!btn) return;

  // Mengambil id dari kartu komen yang dipilih user dan mencari komen tersebut dalam array objek
  const id = Number(btn.closest(".comment-card").dataset.id);
  const KomenId = commentObjects.find((item) => item.id === id);

  // Jika komen tidak ditemukan maka kembali dari mode edit
  if(!KomenId) return;

  // metode untuk masuk dalam mode edit dengan perubahan tombol submit menjadi simpan perubahan 
  IDKomenEdit = id;
  commentName.value = KomenId.nama;
  commentText.value = KomenId.isi;
  submitKomenBtn.textContent = "Simpan Perubahan";
  commentText.focus();
})

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

// Modul 8 - Fetch API
// memuat indikator loading pada container komen  
const loadingKomen = document.getElementById("comment-loading");
const editingKomenLoader = document.getElementById("comment-editing");

// Membuat fungsi indikator setiap tombol jika terjadi proses konekasi ke server 
function buttonIndikator(lagiJalan){
    eventJalan = lagiJalan;
    commentForm.querySelectorAll("button").forEach((button) => (button.disabled = lagiJalan));
    commentContainer.querySelectorAll("button").forEach((button) => (button.disabled = lagiJalan));
}

// Jika elemen html ada jalankan
if(commentContainer)
{
  // membuat function async dimana function berjalan sendiri tanpa menunggu
  async function memuatAPIKomen() {
    // kembali jika komen API sudah terender dari sebelumnya
    if (localStorage.getItem("komenAPI") === "true") return;
    
    // membuat indikator loading jika komen lagi sedang memuat
    if (loadingKomen) loadingKomen.style.display = "block";

    let response;

    // mencoba barisan kode dan melemparkan error jika terjadi ada kesalahan
    try {
      // membuat response dari API dengan async harus mengnunggu sampai panggilan dari await selesai
      response = await fetch (BASEAPI + "/comments?_limit=5");

      // jika response terjadi kesalahan maka melempar status response tersebut
      if (!response.ok) {
        throw new Error("Status : " + response.status);
      }

      // memuat hasil response tersebut dalam bentuk json dan mewajibkan async menunggu dulu sampai panggilan await selesai
      const daftarArtikelAPI = await response.json();
      
      // memetakan hasil API json tersebut dalam kartu komen untuk rendering
      const komenAPI = daftarArtikelAPI.map((data) => ({
        id: data.id,
        nama: data.email,
        isi: data.body.replace(/\n/g, " "),
        waktu: new Date()
      }));

      // mengambil hasil simpanan komen yang masoh ada
      const komenTersimpan = JSON.parse(localStorage.getItem("komen")) || [];

      // menyimpan lagi ke dalam local storage dengan tambahan komen dari API dari awal dulu setelah itu komen yang disimpan
      localStorage.setItem("komen", JSON.stringify([...komenAPI, ...komenTersimpan]));

      // menyeting komenAPI menjadi true jika komen API sudah berhasil dirender
      localStorage.setItem("komenAPI", "true");

      console.log("Berhasil Memuat Komentar dari API");
      // render hasil komen dengan tambahan API tersebut
      renderComments();

      // menangkap error jika terjadi kesalahan 
    } catch (error) {
      // menampilkan error dan tampilan dalam konsol jika terjadi error
      showCommentError("Gagal memuat komen dari API");
      alert(response ? pesanDariStatus(response.status) : "Gagal Terhubung Ke Server");
      console.error("Gagal mengambil data: ", error)
    } finally {
      // jika bagian blok try sudah berhasil tanpa ada kesalahan maka indikator loading menghilang
      if (loadingKomen) loadingKomen.style.display = "none";
    }
  }

  // memanggil fungsi komen API tersebut
  memuatAPIKomen();
}

// Modul 9 - REST API
// Fungsi Asnychronus untuk mengirim data komen ke server JSONPlaceholder
async function kirimKomenKeServer(id, nama, pesan, waktu) {
  // Membuat response untuk mengirim data ke server API dalam body
  const response = await fetch (
    BASEAPI + "/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
          id: id,
          nama: nama,
          isi: pesan,
          waktu: waktu
      })
    }
  );

  // Jika response tidak suskes, maka keluar error status tersebut
  if(!response.ok) {
    const err = new Error ("Gagal Memuat Komentar ke Server");
    err.status = response.status; 
    throw err;
  }

  // Penanda status suskes
  console.log(pesanDariStatus(response.status), "Status: ", response.status);

  // mengembalikan proses response dalam json
  return await response.json();
}

// fungsi untuk mengupdate like ke Server API
async function updateLikeKomenKeServer (commentId, jumlahLike) {
  // Loading indikator proses perubahan terjadi
  if (editingKomenLoader) editingKomenLoader.style.display = "block";

  // deklarasi response untuk fungsi try catch
  let response;

  // Proses untuk Edit komen pada link API dalam body 
  try {
    response = await fetch(
      BASEAPI + `/comments/${commentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: jumlahLike})
      }
    )

    // Jika response tidak suskes maka outputkan status response
    if(!response.ok) {
      throw new Error("Status: " + response.status);
    }
    console.log(pesanDariStatus(response.status), "Status: ", response.status);

    // Ambil response tersebut dalam format JSON
    const hasil = await response.json();

    // Hasil sukses untuk response mendapatkan undefined dikarenakan respone dari hasil ke API
    // tidak diketahui oleh API jsonPlaceholder
    console.log("Like berhasil diperbaharui di Server, id:", hasil.id ?? commentId);
  } catch (error) {
    // Jika gagal memperbaharui like maka tampilkan status error dalam response
    console.error("Gagal memperbaharui like: ", error);
    alert(response ? pesanDariStatus(response.status) : "Gagal Terhubung Ke Server");
  } finally {
    // jika bagian blok try sudah berhasil tanpa ada kesalahan maka indikator loading menghilang
    if (editingKomenLoader) editingKomenLoader.style.display = "none";
    buttonIndikator(false);
  }
}

// Fungsi async untuk edit komen pada satu komentar dan memperbaharui ke API
async function editKomen(id, namaBaru, isiBaru) {
  // mengambil dan mencari komen yang ingin di edit untuk melakukan perubahan
  const semuaKomen = JSON.parse(localStorage.getItem("komen")) || [];
  const idKomen = semuaKomen.findIndex((index) => index.id === id);

  // Jika komentar tidak ditemukan maka kembali dari fungsi tersebut
  if (idKomen === -1) return;

  // Mengisi nama dan isi komentar dengan yang baru
  semuaKomen[idKomen].nama = namaBaru;
  semuaKomen[idKomen].isi = isiBaru;

  // Menyimpan hasil perubahan dalam localStorage komen
  localStorage.setItem("komen", JSON.stringify(semuaKomen));

  // deklarasi response untuk fungsi try catch
  let response;

  // Menambahkan indikator loading setelah selesai melakukan perubahan dan proses pengiriman ke API 
  if (editingKomenLoader) editingKomenLoader.style.display = "block";

  // Proses metode PATCH untuk pengiriman data komentar hasil editan ke link API dalam bodynya ada nama dan isi perubahan
  try {
    response = await fetch(
      BASEAPI + `/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: namaBaru,
          isi: isiBaru
        }),
      }
    );

    // Jika Proses tidak suskes maka nampilin status response tersebut
    if(!response.ok) {
      throw new Error("Status : " + response.status);
    }
    console.log(pesanDariStatus(response.status), "Status: ", response.status);

    // membuat hasil response dalam bentuk json untuk pengambilan data
    const hasil = await response.json();

    // Indikator console log keberhasilan edit komentar
    console.log("Berhasil Edit Komentar: ", hasil.id ?? id)
  } catch (error) {
    // Menampilkan status error jika terjadi kesalahan atau gagal koneksi
    console.error("Gagal Edit Komentar : ", error);
    alert(response ? pesanDariStatus(response.status) : "Gagal Terhubung Ke Server");
  } finally {
    // Jika selesai maka indikator loading menghilang
    if (editingKomenLoader) editingKomenLoader.style.display = "none";
  }
}

// Fungsi untuk mengembalikan status dalam bentuk kalimat
function pesanDariStatus(status) {
  if (status === 200) return "Permintaan berhasil.";
  if (status === 201) return "Data berhasil dibuat di server.";
  if (status === 204) return "Berhasil, tidak ada konten yang dikembalikan.";
  if (status === 404) return "Data tidak ditemukan di server.";
  if (status === 400) return "Data yang dikirim tidak valid.";
  if (status >= 500) return "Server sedang bermasalah, coba lagi nanti.";
  return "Terjadi kesalahan tidak terduga.";
}

