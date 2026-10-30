import { NextResponse } from "next/server";
import ImageKit, { toFile } from "@imagekit/nodejs";
import { auth } from "@clerk/nextjs/server";

export const runtime = "nodejs";

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const URL_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

export async function POST(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        if (!process.env.IMAGEKIT_PRIVATE_KEY || !URL_ENDPOINT) {
            console.error("Missing ImageKit Environment Variables");

            return NextResponse.json(
                { error: "ImageKit Configuration Is Missing" },
                { status: 500 },
            );
        }

        const formData = await request.formData();

        const file = formData.get("file");
        const fileName = formData.get("fileName");

        if (!file || !(file instanceof File)) {
            return NextResponse.json(
                { error: "No Valid File Provided" },
                { status: 400 },
            );
        }

        if (!file.type.startsWith("image/")) {
            return NextResponse.json(
                { error: "Only Image Files Are Allowed" },
                { status: 400 },
            );
        }

        if (file.size === 0) {
            return NextResponse.json(
                { error: "File Is Empty" },
                { status: 400 },
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const timestamp = Date.now();

        const sanitizedFileName = (
            typeof fileName === "string" && fileName.trim()
                ? fileName
                : file.name || "upload"
        ).replace(/[^a-zA-Z0-9.-]/g, "_");

        const uniqueFileName = `${timestamp}_${sanitizedFileName}`;

        const folder = `/projects/${userId}`;

        const uploadFile = await toFile(buffer, uniqueFileName);

        const uploadResponse = await imagekit.files.upload({
            file: uploadFile,
            fileName: uniqueFileName,
            folder,
        });

        const thumbnailUrl = imagekit.helper.buildSrc({
            urlEndpoint: URL_ENDPOINT,
            src: uploadResponse.filePath,
            transformation: [
                {
                    width: 400,
                    height: 300,
                    crop: "maintain_ratio",
                    quality: 80,
                    format: "webp",
                },
            ],
        });

        return NextResponse.json({
            success: true,
            url: uploadResponse.url,
            thumbnailUrl,
            fileId: uploadResponse.fileId,
            width: uploadResponse.width,
            height: uploadResponse.height,
            size: uploadResponse.size,
            name: uploadResponse.name,
        });
    } catch (error) {
        console.error("ImageKit Upload Error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed To Upload Image",
            },
            { status: 500 },
        );
    }
}
