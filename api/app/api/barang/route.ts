import { PrismaClient } from "@/generated/prisma";
import fs from "fs";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";
// import { randomUUID } from "crypto"

// Prisma
const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    let keyword = searchParams.get("search") || "";

    // Hilangkan spasi dan ubah ke huruf kecil
    keyword = keyword.replace(/\s+/g, "").toLowerCase();

    // Ambil semua barang
    const allItems = await prisma.tb_barang.findMany({
        orderBy: {
            nama: "asc",
        },
    });

    // Filter manual: cocokkan kode/nama/harga tanpa spasi
    const filtered = allItems.filter((item) => {
        const kode = item.kode?.replace(/\s+/g, "").toLowerCase() || "";
        const nama = item.nama?.replace(/\s+/g, "").toLowerCase() || "";
        const harga = String(item.harga ?? "").replace(/\s+/g, "").toLowerCase();

        return (
            kode.includes(keyword) ||
            nama.includes(keyword) ||
            harga.includes(keyword)
        );
    });

    return NextResponse.json(
        {
            meta_data: {
                success: true,
                message: "",
                status: 200
            },
            result: filtered,
        },
        { status: 200 }
    );
};

export const POST = async (request: NextRequest) => {

    const formData = await request.formData() as unknown as FormData;

    const file = formData.get("foto") as File | null

    const checkData = await prisma.tb_barang.findMany({
        where: {
            kode: formData.get("kode")?.toString(),
        }
    })

    if (checkData.length == 1) {

        return NextResponse.json({
            meta_data: {
                success: false,
                message: "Data Barang Gagal Disimpan.\nKode Barang Sudah Digunakan !",
                status: 409
            },
            // result: null,
        },
            { status: 409 })
    }

    let fileName = ""

    // 2. Simpan file jika ada
    if (file && file.size > 0) {
        const imageMimes = ["image/jpeg", "image/png"]
        const buffer = Buffer.from(await file.arrayBuffer())
        const uploadDir = path.join(process.cwd(), "public/uploads")

        // jika bukan file gambar
        if (!imageMimes.includes(file.type)) {
            // upload dokumen
            const ext = path.extname(file.name)
            fileName = `${Date.now()}${ext}`

            await writeFile(path.join(uploadDir, fileName), buffer)
        }
        // jika file gambar
        else {
            // upload image        
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir)
            }

            fileName = `${Date.now()}.webp` // hasil kompres jadi .webp

            const outputPath = path.join(uploadDir, fileName)

            // Kompres menggunakan sharp
            await sharp(buffer)
                .resize(800) // atur lebar max 800px (tinggi otomatis)
                .webp({ quality: 100 }) // kompres ke webp, kualitas 0-100
                .toFile(outputPath)
        }
    }

    // simpan data
    await prisma.tb_barang.create({
        data: {
            kode: formData.get("kode")?.toString() || "",
            nama: formData.get("nama")?.toString() || "",
            harga: Number(formData.get("harga")?.toString() || ""),
            foto: fileName
        }
    })

    return NextResponse.json({
        meta_data: {
            success: true,
            message: "Data Barang Berhasil Disimpan",
            status: 201
        },
        // result: save,
    },
        { status: 201 })

}

export const DELETE = async () => {
    return NextResponse.json({
        meta_data: {
            success: false,
            message: "Parameter Slug Harus Diisi !",
            status: 400,
        },
    }, { status: 400 });
}

export const PUT = async () => {
    return NextResponse.json({
        meta_data: {
            success: false,
            message: "Parameter Slug Harus Diisi !",
            status: 400,
        },
    }, { status: 400 });
}
