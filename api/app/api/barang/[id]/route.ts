import { PrismaClient } from "@/generated/prisma";
import fs from "fs";
import { unlink, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";

const prisma = new PrismaClient();

export const DELETE = async (_: NextRequest, props: { params: Promise<{ id: string }> }) => {
    try {
        const { id } = await props.params;

        // cek apakah "id" ada / tidak
        const getData = await prisma.tb_barang.findUnique({
            where: { id: Number(id) }
        })

        // jika "id" tidak ditemukan
        if (!getData) {
            return NextResponse.json({
                meta_data: {
                    success: false,
                    message: "Data Barang Gagal Dihapus.\nData Barang Tidak Ditemukan !",
                    status: 404
                },
            }, {
                status: 404
            })
        }

        const uploadDir = path.join(process.cwd(), "public/uploads")
        const fileName = getData.foto

        // jika file tidak kosong
        if (fileName) {
            const filePath = path.join(uploadDir, fileName)

            // jika file tersedia
            if (fs.existsSync(filePath)) {
                // hapus file
                await unlink(filePath)
            }
        }

        // hapus data
        await prisma.tb_barang.delete({
            where: { id: Number(id) }
        })

        // proses / response API
        return NextResponse.json({
            meta_data: {
                success: true,
                message: "Data Barang Berhasil Dihapus",
                status: 200
            },
        }, {
            status: 200
        })
    }
    catch (e: any) {
        return NextResponse.json({
            meta_data: {
                success: false,
                message: "Parameter Slug Harus ID Barang !",
                status: 400
            },
        }, {
            status: 400
        })
    }
}

export const GET = async (_: NextRequest, props: { params: Promise<{ id: string }> }) => {
    try {
        const parameter = (await props.params).id;

        // cek apakah "id" ada / tidak
        const getData = await prisma.tb_barang.findUnique({
            where: {
                id: Number(parameter),
            }
        })

        // jika "id" tidak ditemukan
        if (!getData) {
            return NextResponse.json({
                meta_data: {
                    success: false,
                    message: "Data Barang Tidak Ditemukan !",
                    status: 404
                },
            }, {
                status: 404
            })
        }

        // proses / response API
        return NextResponse.json({
            meta_data: {
                success: true,
                message: "",
                status: 200
            },
            result: getData
        }, {
            status: 200
        })

    }
    catch (e: any) {
        return NextResponse.json({
            meta_data: {
                success: false,
                message: "Parameter Slug Harus ID Barang !",
                status: 400
            },
        }, {
            status: 400
        })
    }

}

export const PUT = async (request: NextRequest, props: { params: Promise<{ id: string }> }) => {
    const parameter = (await props.params).id;

    // cek apakah "kode" ada / tidak
    const getData = await prisma.tb_barang.findUnique({
        where: {
            id: Number(parameter),
        }
    })

    // jika "kode" tidak ditemukan
    if (!getData) {
        return NextResponse.json({
            meta_data: {
                success: false,
                message: "Data Barang Tidak Ditemukan !",
                status: 404
            },
        }, {
            status: 404
        })
    }

    const formData = await request.formData() as unknown as FormData

    // cek apakah id sudah pernah ada / belum
    const checkData = await prisma.tb_barang.findMany({
        where: {
            kode: formData.get("kode")?.toString(),
            // id: {not: Number(params.id)}
            NOT: { id: Number(parameter) }
        }
    })

    // jika "id" ditemukan
    if (checkData.length >= 1) {
        return NextResponse.json({
            meta_data: {
                success: false,
                message: "Data Barang Gagal Diubah.\nKode Barang Sudah Digunakan !",
                status: 409
            },
        },
            { status: 409 })
    }

    const uploadDir = path.join(process.cwd(), "public/uploads")
    let fileName = getData.foto

    // jika file tidak kosong
    if (fileName) {
        const filePath = path.join(uploadDir, fileName)

        // jika file tersedia
        if (fs.existsSync(filePath)) {
            // hapus file
            await unlink(filePath)
        }
    }

    const file = formData.get("foto") as File | null

    // 2. Simpan file jika ada
    if (file && file.size > 0) {
        const imageMimes = ["image/jpeg", "image/png"]
        const buffer = Buffer.from(await file.arrayBuffer())

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

    // ubah data
    await prisma.tb_barang.update({
        where: {
            id: Number(parameter)
        },
        data: {
            kode: formData.get("kode")?.toString() || "",
            nama: formData.get("nama")?.toString() || "",
            harga: Number(formData.get("harga")?.toString() || ""),
            foto: fileName,
        },
    })


    // proses / response API
    return NextResponse.json({
        meta_data: {
            success: true,
            message: "Data Barang Berhasil Diubah",
            status: 200
        },
    },
        { status: 200 })
}