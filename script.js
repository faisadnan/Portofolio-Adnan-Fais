'use strict';

const NAMA_SAYA = 'Adnan Fais Rafai';

const elTahun = document.getElementById('tahun');
const elJam = document.getElementById('jam');
const btnSapa = document.getElementById('btnSapa');
const elHasil = document.getElementById('hasilSapa');
const btnTema = document.getElementById('btnTema');
const form = document.getElementById('formKontak');
const inNama = document.getElementById('inputNama');
const inPesan = document.getElementById('inputPesan');
const elHitung = document.getElementById('hitungPesan');
const elToast = document.getElementById('toastPesan');
const elToastJudul = document.getElementById('toastJudul');
const elToastIsi = document.getElementById('toastIsi');

// J1: Tahun footer otomatis mengikuti tahun perangkat.
elTahun.textContent = new Date().getFullYear();

// J2: Jam digital diperbarui setiap satu detik.
function tampilkanJam() {
  const sekarang = new Date();
  const jam = String(sekarang.getHours()).padStart(2, '0');
  const menit = String(sekarang.getMinutes()).padStart(2, '0');
  const detik = String(sekarang.getSeconds()).padStart(2, '0');
  elJam.textContent = `${jam}:${menit}:${detik}`;
}
tampilkanJam();
setInterval(tampilkanJam, 1000);

// J3: Sapaan menyesuaikan waktu saat tombol ditekan.
btnSapa.addEventListener('click', function () {
  const jam = new Date().getHours();
  let sapaan;
  if (jam >= 4 && jam < 11) sapaan = 'Selamat pagi';
  else if (jam >= 11 && jam < 15) sapaan = 'Selamat siang';
  else if (jam >= 15 && jam < 18) sapaan = 'Selamat sore';
  else sapaan = 'Selamat malam';
  elHasil.textContent = `${sapaan}! Selamat datang di portofolio ${NAMA_SAYA} 👋`;
  elHasil.classList.remove('d-none');
});

// J4: Mengubah tema halaman terang dan gelap.
btnTema.addEventListener('click', function () {
  const temaSaatIni = document.documentElement.getAttribute('data-theme');
  const temaBaru = temaSaatIni === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', temaBaru);
  btnTema.textContent = temaBaru === 'dark' ? '☀️ Mode Terang' : '🌙 Mode Gelap';
});

// J5: Menghitung karakter pesan yang sedang diketik.
inPesan.addEventListener('input', function () {
  elHitung.textContent = `${inPesan.value.length}/${inPesan.maxLength}`;
});

// J6: Validasi form dan tampilkan notifikasi Bootstrap Toast.
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }
  const namaPengirim = inNama.value.trim();
  const isiPesan = inPesan.value.trim();
  elToastJudul.textContent = `📨 Pesan dari ${namaPengirim}`;
  elToastIsi.textContent = `Terima kasih, ${namaPengirim}! Pesan Anda: “${isiPesan}”`;
  bootstrap.Toast.getOrCreateInstance(elToast).show();
  form.reset();
  form.classList.remove('was-validated');
  elHitung.textContent = '0/200';
});
