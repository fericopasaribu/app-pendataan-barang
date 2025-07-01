// sesuaikan url dengan IP Device/Emulator dan Laptop/PC
const url = "http://192.168.255.255:3001"
const api = `${url}/api`
const barang = "Barang"

export const Strings = {
    button: {
        save: "Simpan",
        edit: "Ubah",
        delete: "Hapus",
        cancel: "Batal",
        back: "Kembali",
    },
    title: {
        view: `Tampil Data ${barang}`,
        add: `Tambah Data ${barang}`,
        edit: `Ubah Data ${barang}`,
        detail: `Detail Data ${barang}`,
        info: "Informasi",
    },
    message: {
        save_success: "Berhasil Disimpan",
        save_failed: "Gagal Disimpan !",
        edit_success: "Berhasil Diubah",
        edit_failed: "Gagal Diubah !",
        delete_success: "Berhasil Dihapus",
        delete_failed: "Gagal Dihapus !",
        delete_confirm: "Ingin Dihapus ?",
        text_empty: "Harus Diisi !",
        text_unselected: "Harus Dipilih !"
    },
    text: {
        cari: "Cari Data",
        kode: "Kode Barang",
        nama: "Nama Barang",
        harga: "Harga Barang",
    },
    API: {
        barang: `${api}/barang`
    },

    uploads: `${url}/uploads`,
    interval: 3000

}