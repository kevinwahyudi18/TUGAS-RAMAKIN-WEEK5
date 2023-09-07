// PEMBUATAN OOP
class Pendaftar {
    constructor(nama, umur, uangSaku) {
        this.nama = nama;
        this.umur = umur;
        this.uangSaku = uangSaku;
    }
}

// PEMBUATAN TAB
var content1 = document.getElementById("contentFormRegistrasi");
var content2 = document.getElementById("contentListPeserta");
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");

function openRegistrasi() {
    contentFormRegistrasi.style.transform = "translateX(0)";
    contentListPeserta.style.transform = "translateX(200%)";
    btn1.style.backgroundColor = "#4cb25d";
    btn2.style.backgroundColor = "#8a9d9d";
}

function openListPeserta() {
    contentFormRegistrasi.style.transform = "translateX(200%)";
    contentListPeserta.style.transform = "translateX(0)";
    btn1.style.backgroundColor = "#8a9d9d";
    btn2.style.backgroundColor = "#4cb25d";
}

// PENAMPUNG UMUR DAN UANG SAKU
const dataUmur = [];
const dataUangSaku = [];

const menentukanTotal = (nilai) => {
    let total = 0;
    for (let i = 0; i < nilai.length; i++) {
        total = total + nilai[i];
    }
    return total;
}

// PENGAMBILAN DOM
const nama = document.getElementById("namaPendaftar");
const umur = document.getElementById("umurPendaftar");
const uangSaku = document.getElementById("uangSakuPendaftar");
const submitBtn = document.getElementById("submitBtn");

// PEMBUATAN LOGIKA APABILA SUDAH DI SUBMIT
submitBtn.addEventListener("click", async function () {
    const pendaftar = new Pendaftar(nama.value, umur.value, uangSaku.value);

    if (
        pendaftar.nama.length >= 10 &&
        pendaftar.umur >= 25 &&
        pendaftar.uangSaku >= 100000 &&
        pendaftar.uangSaku <= 1000000
    ) {
        const namaMasukList = new Promise((resolve, reject) => {
            if (pendaftar.nama.length >= 10) {
                resolve(pendaftar.nama);
            } else {
                reject("Nama kurang dari 10 karakter");
            }
        });
        const umurMasukList = new Promise((resolve, reject) => {
            if (pendaftar.umur >= 25) {
                resolve(pendaftar.umur);
                dataUmur.push(parseInt(pendaftar.umur));
            } else {
                reject("Umur kurang dari 25");
            }
        });

        const uangSakuMasukList = new Promise((resolve, reject) => {
            if (
                pendaftar.uangSaku >= 100000 &&
                pendaftar.uangSaku <= 1000000
            ) {
                resolve(pendaftar.uangSaku);
                dataUangSaku.push(parseInt(pendaftar.uangSaku));
            } else {
                reject(
                    "Uang saku kurang dari 100.000 atau lebih dari 1.000.000"
                );
            }
        });

        // UNTUK DATA DAPAT DI MASUKAN KE TABLE
        Promise.all([namaMasukList, umurMasukList, uangSakuMasukList]).then(
            () => {
                let tableContainer = document.getElementById("table-container");
                let tableHTML = tableContainer.innerHTML;
                tableHTML += `
                <tr>
                <td>${pendaftar.nama}</td>
                <td>${pendaftar.umur}</td>
                <td>Rp ${pendaftar.uangSaku}</td>
              </tr>
              `;
                tableContainer.innerHTML = tableHTML;
                nama.value = "";
                umur.value = "";
                uangSaku.value = "";
            }
        );
        alert("Data sudah ter-submit");
    } else {
        alert("Data tidak sesuai");
    }
    // Untuk hasil Rata rata Umur
    const totalRataRataUmur = (menentukanTotal(dataUmur))/dataUmur.length;
    const tableRataRataUmur = document.getElementById("tableRataRataUmur");
    tableRataRataUmur.innerHTML= `<th scope="col">${Math.round(totalRataRataUmur)}</th>`;

    // Untuk hasil Rata rata Uang Saku
    const totalRataRataUangSaku = (menentukanTotal(dataUangSaku))/dataUangSaku.length;
    const tableRataRataUangSaku = document.getElementById("tableRataRataUangSaku");
    tableRataRataUangSaku.innerHTML= `<th scope="col">${Math.round(totalRataRataUangSaku)}</th>`;
});