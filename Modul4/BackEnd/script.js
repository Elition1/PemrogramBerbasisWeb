// Fungai untuk mengambil elemen dari tag input dan
// melakukan validasi elemen yang diambil
function getElements()
{
    let elemen_1 = document.getElementById("bilangan_1").value.trim();
    let elemen_2 = document.getElementById("bilangan_2").value.trim();
    
    // Return null jika input belum dimasukkan
    if(elemen_1 == "" && elemen_2 == "")
    {
        alert("MASUKKAN BILANGAN UNTUK PROSES");
        return null;
    }

    // Elemen konversikan menjadi tipe data Number
    let bilangan_1 = Number (elemen_1);
    let bilangan_2 = Number (elemen_2);
    
    // Jika hasil inputannya adalah string / char dan bukan
    // bilangan maka return null
    if (Number.isNaN(bilangan_1) || Number.isNaN(bilangan_2))
    {
        alert("MASUKKAN BILANGAN VALID");
        return null;
    }
    // Return nilai berupa array untuk pengambilan dua nilai lebih
    return [bilangan_1, bilangan_2];
}

// Fungsi penambahan untuk tombol operator tambah
function penambahan()
{
    // Ambil elemen tersebut
    const elemenAmbil = getElements();

    // Jika null maka kembali dan tidak jalani
    // sisa kode
    if(elemenAmbil == null)
    {
        return;
    }

    // Ambil DOM id result untuk mengdisplay elemen
    let hasil = document.getElementById("result");

    // Copy array dan sekaligus deklarasi variabel
    // bilangan 1 dan bilangan 2
    let [bilangan_1, bilangan_2] = elemenAmbil;

    // Deklarasi variabel hasilPenambahan dengan pertambahan 2 variabel dalam
    // array sebelumnya
    let hasilPenambahan = bilangan_1 + bilangan_2;

    // Display elemen ke variabel hasil yang sudah diambil DOM
    hasil.value = hasilPenambahan;

    // Kasih notifikasi hasil penambahan
    alert(hasilPenambahan)
}

// Fungsi tombol penguragan untuk melakukan pengurangan
function pengurangan()
{
    // Ambil elemen tersebut
    const elemenAmbil = getElements();

    // Jika null maka kembali dan tidak jalani
    // sisa kode    
    if(elemenAmbil == null)
    {
        return;
    }

    // Ambil DOM id result untuk mengdisplay elemen
    let hasil = document.getElementById("result");

    // Copy array dan sekaligus deklarasi variabel
    // bilangan 1 dan bilangan 2
    let [bilangan_1, bilangan_2] = elemenAmbil;

    // Deklarasi variabel hasilPengurangan dengan Perkurangan 2 variabel dalam
    // array sebelumnya
    let hasilPengurangan = bilangan_1 - bilangan_2;

    // Display elemen ke variabel hasil yang sudah diambil DOM
    hasil.value = hasilPengurangan;

    // Kasih notifikasi hasil pengurangan
    alert(hasilPengurangan)
}

// Fungsi perkalian untuk fitur tombol KALI
function perkalian()
{
    // Ambil elemen tersebut
    const elemenAmbil = getElements();

    // Jika null maka kembali dan tidak jalani
    // sisa kode  
    if(elemenAmbil == null)
    {
        return;
    }

    // Ambil DOM id result untuk mengdisplay elemen
    let hasil = document.getElementById("result");

    // Copy array dan sekaligus deklarasi variabel
    // bilangan 1 dan bilangan 2
    let [bilangan_1, bilangan_2] = elemenAmbil;

    // Deklarasi variabel hasilPerkalian dengan perkalian 2 variabel dalam
    // array sebelumnya
    let hasilPerkalian = bilangan_1 * bilangan_2;

    // Display elemen ke variabel hasil yang sudah diambil DOM
    hasil.value = hasilPerkalian;

    // Kasih notifikasi hasil perkalian
    alert(hasilPerkalian)
}   

// Fungsi pembagian untuk fitur tombol operator pembagian
function pembagian()
{
    // Mengambil elemen tersebut
    const elemenAmbil = getElements();

    // Jika elemen yang diambil null maka return
    // Skip jalanan
    if(elemenAmbil == null)
    {
        return;
    }

    // mengambil DOM dengan id result kedalam
    // variabel hasil
    let hasil = document.getElementById("result");

    // Copy array dan sekaligus deklarasi variabel
    // bilangan 1 dan bilangan 2
    let [bilangan_1, bilangan_2] = elemenAmbil;

    // Jika bilangan ke-2 adalah nol maka
    // Memberhentikan operasi pembagian dan return
    if(bilangan_2 == 0)
    {
        alert("Bilangan ke-2 TIDAK BISA DIBAGI 0");
        return;   
    }
    
    // Menyimpan hasil pembagian kedalam variabel 
    // hasilPembagian
    let hasilPembagian = bilangan_1 / bilangan_2;

    // Display hasil tersebut kedalam teks dalam DOM variabel hasil
    hasil.value = hasilPembagian;

    // Infokan hasil pembagian tersebut
    alert(hasilPembagian)
}

// Fungsi untuk mengkosongkan isi tag input bilangan 1 dan
// bilangan 2
function hapus()
{
    document.getElementById("bilangan_1").value = "";
    document.getElementById("bilangan_2").value = "";
}
    