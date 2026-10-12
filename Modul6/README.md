
<h1>
NAMA : Edgar Hansel Dharmawan
    <br>
NIM : 255314109
</h1>

<h2> Modul 6 - Form Validasi </h2> 

# Pertanyaan 1
<p>
    Jelaskan mengapa validasi client-side tidak boleh menjadi satu-satunya lapisan validasi pada aplikasi web.
    <br>
</p>
<p>
    Jawab : <br>
    Karena validasi client side tidak bisa diandalkan sebagai salah satu lapisan keamanan karena lapisan tersebut berada pada sisi pengguna sehingga bisa dikendalikan. Ada beberapa alasan yaitu: <br>
    - Bisa dilewati: Pengguna bisa mematikan javascript, memodifikasi html, dan mengirim data mentah melewati server tanpa melalui web <br>
    - Ancaman Keamanan: Aplikasi tersebut bisa rentan terhadap serangan berbahaya seperti sql injection, scripting, dan manipulasi data <br>
</p>
# Pertanyaan 2
<p>
    Sebutkan minimal tiga atribut validasi bawaan HTML5 beserta fungsinya masing-masing
</p>
<p>
    Jawab : <br>
    Ada Beberapa Validasi Bawaan html5 yaitu: <br>
    - required : Fungsi ini memastikan bahwa elemen yang diinput user bersifat wajib dan tidak bisa dikosongkan <br>
    - minlength / maxlength : Fungsi ini berfungsi untuk menentukan batas minimum dan maximum jumlah karakter yang diizinkan dalam elemen input tipe teks atau password
    - pattern : Berfungsi untuk mencocokkan nilai input dengan ekspresi regular. Jika pola karakter muncul dalam input teks tidak sesuai dengan aturan ekspresi reguler, maka form gagal divalidasi 
</p>

# Pertanyaan 3
<p>
    Jelaskan perbedaan antara input.checkValidity() dan input.reportValidity().
</p>
<p>
    Jawab : <br>
    checkValidity() : Mengembalikan nilai boolean. Untuk memeriksa apakah nilai pada elemen input memenuhi syarat-syarat aturan validasi tanpa pengubahan layar <br>
    reportValidity() : Sama seperti checkValidity(), tetapi akan muncul sebuah pesan bawaan dari browser jika ada sebuah elemen yang nilainya tidak valid
</p>

# Pertanyaan 4
<p>
    Apa fungsi setCustomValidity("") (string kosong), dan mengapa penting memanggilnya kembali setelah error diperbaiki?
</p>
<p>
    Jawab : <br>
    setCustomValidity(pesan) mempunyai fungsi untuk menampilkan pesan custom pada elemen input. setCustomValidity("") berfungsi untuk menghapus pesan custom yang masih tersimpan dalam memory sehingga validasi tersebut bisa berjalan lagi seperti yang baru. Ini dikarenakan jika pengguna memperbaiki kesalahan input, hasil validasi error masih tersimpan dalam memory sehingga membuat jadi tidak valid oleh browser sehingga membutuhkan setCustomValidity() tersebut terisi kalimat kosong.
</p>


# Pertanyaan 5
<p>
    Rancang aturan validasi (beserta pseudocode) agar field “Tanggal Lahir” tidak boleh berada di masa depan.
</p>
<p>
    Jawab : <br>
    Implementasi HTML :
</p>
```html
    <label for="tanggal-lahir">Tanggal Lahir : </label>
    <input type="date" id="tanggalLahir" nama="tanggal_lahir" required> 
    <span id="error-tgl-lahir"></span>
```
