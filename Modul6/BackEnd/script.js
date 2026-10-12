// Elemen Selection untuk pemilihan kategori
const elemenAgama = document.getElementById("agama");
const elemenProdi = document.getElementById("program-studi");
const elemenWarga = document.getElementById("kewarganegaraan");
const elemenStatus = document.getElementById("status");
const elemenJenis = document.getElementById("jenis-kelamin");

// Data value untuk selection
const dataListsAgama = [
    {
        agama: "Islam"
    },
    {
        agama: "Katolik"

    },
    {
        agama: "Kristen"

    },
    {
        agama: "Buddha"

    },
    {
        agama: "Hindu"
    },
    {
        agama: "Konghucu"
    },
    {
        agama: "Lain-lain"
    }
];

const dataListProdi = [
    {
        prodi: "Informatika"
    },
    {
        prodi: "Teknik Elektro"
    },
    {
        prodi: "Matematika"
    },
    {
        prodi: "Psikologi"
    },
    {
        prodi: "Teknik Mesin"
    },
]

const dataListWarga = [
    {
        warga: "WNI"
    },
    {
        warga: "WNA"
    },
]

const dataListStatus = [
    {
        status: "Menikah"
    },
    {
        status: "Tidak Menikah"
    },
]

const dataListJenis = [
    {
        jenis: "Perempuan"
    },
    {
        jenis: "Laki-Laki"
    },
]

// Render setiap fitur selection yang ada dengan parameter elemen html dan array of objek
function renderOpsi (elemenSelection, objectArray) 
{
    const elementSelect = elemenSelection;

    objectArray.forEach(dataElement => {
        const elemenData = document.createElement("option");

        let valueObjek = Object.values(dataElement)[0];

        elemenData.textContent = valueObjek;
        elemenData.value = valueObjek.trim().toLowerCase().replace(/\s+/g, "-");

        elementSelect.appendChild(elemenData);
    });
}

// Render setiap fitur selection
renderOpsi(elemenAgama, dataListsAgama);
renderOpsi(elemenProdi, dataListProdi);
renderOpsi(elemenWarga, dataListWarga);
renderOpsi(elemenStatus, dataListStatus);
renderOpsi(elemenJenis, dataListJenis);

// Mengecek validitas dengan elemen yang dikasih dan menyertai pesan error yang didapatkan
function validationChecker(elemen, pesanError) {
    if (!elemen) return;

    // Membuat elemen error untuk setiap input
    let errorEl = elemen.parentElement.querySelector(".error-msg");
    if (!errorEl) 
    {
        errorEl = document.createElement("span");
        errorEl.className = "error-msg";
        elemen.after(errorEl);
    }

    // Function untuk mengecek validitas error yang ditemui
    function check() 
    {
        elemen.setCustomValidity("");
        
        const value = elemen.validity;
        
        for (const kunci in pesanError) {
            if (value[kunci] && pesanError[kunci]) {
                elemen.setCustomValidity(pesanError[kunci]);
                break;
            }
        }

        // Mengisi elemen error dengan input yang belum memenuhi persyaratan
        errorEl.textContent = elemen.validationMessage;
    }

    // Menambahkan listener pada setiap input yang ada 
    elemen.addEventListener("input", check);
    elemen.addEventListener("change", check);  
    elemen.addEventListener("blur", check);
    elemen.addEventListener("invalid", (e) => {
        e.preventDefault();   
        check();
    });
}

// Elemen tanggal lahir untuk validitas tanggal lahir lebih dari sekarang
const tanggalLahir = document.getElementById("tanggalLahir");

if (tanggalLahir)
{
    // Mengambil tahun, bulan, hari sekarang untuk validitas tanggal
    const nowDate = new Date();
    const tahun = nowDate.getFullYear();
    const bulan = String(nowDate.getMonth() + 1).padStart(2, "0");
    const hari = String(nowDate.getDate()).padStart(2, "0");

    // Menyimpan tanggal maksimum dan minimum yang bisa diinput
    tanggalLahir.max = `${tahun}-${bulan}-${hari}`;
    tanggalLahir.min = "1926-01-01";
}

// Validasi setiap input text dan pesannya 
validationChecker(tanggalLahir, {
    valueMissing: "Tanggal Lahir Wajib diisi",
    rangeOverflow: "Tanggal lahir tidak boleh melebihi hari ini"
})

validationChecker(document.getElementById("name"), {
    valueMissing: "Nama wajib diisi",
    tooShort: "Nama harus minimal 3 karakter"
});

validationChecker(document.getElementById("nik"), {
    valueMissing: "NIK wajib diisi",
    tooShort: "NIK harus 16 angka",
    patternMismatch: "NIK harus berupa 16 angka"
});

validationChecker(document.getElementById("alamat"), {
    valueMissing: "Alamat wajib diisi",
    tooShort: "Alamat harus minimal 10 karakter"
});

validationChecker(document.getElementById("email-input"), {
    valueMissing: "Email wajib diisi",
    typeMismatch: "Format email tidak valid"
});

validationChecker(document.getElementById("tel-diri"), {
    valueMissing: "Nomor telepon wajib diisi",
    patternMismatch: "Nomor tidak valid, contoh: 08123456789"
});

validationChecker(document.getElementById("nama-ortu"), {
    valueMissing: "Nama orang tua/wali wajib diisi",
    tooShort: "Nama harus minimal 3 karakter"
});

validationChecker(document.getElementById("telp-ortu"), {
    valueMissing: "Nomor telepon orang tua wajib diisi",
    patternMismatch: "Nomor tidak valid, contoh: 08123456789"
});

// Setiap id tag selection 
const ListwajibDiisi = {
    "jenis-kelamin": "Pilih jenis kelamin",
    "status": "Pilih status",
    "agama": "Pilih agama",
    "kewarganegaraan": "Pilih kewarganegaraan",
    "program-studi": "Pilih program studi",
    "bukti-identitas": "Bukti identitas wajib diunggah",
    "verifikasi-wajah": "Foto wajah wajib diunggah",
    "tanda-tangan": "Tanda tangan wajib diunggah",
    "bukti-bayar": "Bukti pembayaran wajib diunggah"
};

// Melihat validasi untuk setiap selection apakah ada yang belum diisi dan mengkasih error msg kepada user jika ada
for (const id in ListwajibDiisi) {
    validationChecker(document.getElementById(id), { valueMissing: ListwajibDiisi[id] });
}

// Mengambil elemen dari form pendaftaran
const formDaftar = document.getElementById("form-pendaf");

// Mengecek Apakah ada salah satu fitur input yang belum dimasukkan dan 
function checkKeberhasilan (elemen) {
    if (!elemen) return;

    elemen.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!elemen.checkValidity())
        {
            alert("Masih ada Kesalahan, Coba Lagi");
            elemen.querySelector(":invalid")?.focus();
            return;
        }

        alert("Pendaftaran Berhasil");
        elemen.reset();    
    })
}

// Panggil method tersebut
checkKeberhasilan(formDaftar);

