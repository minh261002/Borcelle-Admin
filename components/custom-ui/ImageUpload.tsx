"use client"

import { CldUploadWidget } from "next-cloudinary"
import { Button } from "../ui/button"
import { Plus, Trash } from "lucide-react"
import React from "react";
import Image from "next/image";

interface ImageUploadProps {
    value: string[];
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, onRemove, value }) => {

    const upload = (result: any) => {
        onChange(result.info.secure_url);
    }

    return (
        <div>
            <div className="mb-4 flex flex-wrap items-center gap-4">
                {value.map((url, index) => (
                    <div className="w-[200px] h-[200px] relative">
                        <div className="absolute top-0 right-0 z-10">
                            <Button onClick={() => onRemove(url)} size="sm" className="bg-red-1 text-white">
                                <Trash className="w-4 h-4" />
                            </Button>
                        </div>
                        <Image key={index} src={url} fill alt="preview image" className="object-cover rounded-lg" />
                    </div>
                ))}
            </div>
            <CldUploadWidget uploadPreset="ml_default" onSuccess={upload}>
                {({ open }) => {
                    return (
                        <Button className="bg-grey-1 text-white" type="button" onClick={() => open()}>
                            <Plus className="w-4 h-4 mr-2" />
                            Upload an Image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload