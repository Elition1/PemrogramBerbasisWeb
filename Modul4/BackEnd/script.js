function penambahan()
{
    let bilangan_1 = Number (document.getElementById("bilangan_1").value);
    let bilangan_2 = Number (document.getElementById("bilangan_2").value);
    let hasil = document.getElementById("result");

    let hasilPenambahan = bilangan_1 + bilangan_2;
    hasil.value = hasilPenambahan;
    alert(bilangan_1 + bilangan_2)
}

function pengurangan()
{
    let bilangan_1 = Number (document.getElementById("bilangan_1").value);
    let bilangan_2 = Number (document.getElementById("bilangan_2").value);
    let hasil = document.getElementById("result");

    let hasilPengurangan = bilangan_1 - bilangan_2;
    hasil.value = hasilPengurangan;
    alert(bilangan_1 - bilangan_2)
}



// const hasil = () => {
//     let bilangan_1 = Number (document.getElementById("bilangan_1").value);
//     let bilangan_2 = Number (document.getElementById("bilangan_2").value);
//     let hasil = document.getElementById("result");

//     hasil.value = bilangan_1 + bilangan_2;
//     return hasil;
// }

// alert(hasil())