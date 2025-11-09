
import React, { useRef, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
    onImageSelect: (file: File) => void;
    imagePreviewUrl: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, imagePreviewUrl }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onImageSelect(file);
        }
    };

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const file = event.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            onImageSelect(file);
        }
    }, [onImageSelect]);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div 
            className="relative w-full h-64 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center text-center bg-gray-900/50 hover:border-indigo-500 transition-colors duration-300 cursor-pointer overflow-hidden"
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
            />
            {imagePreviewUrl ? (
                <img src={imagePreviewUrl} alt="Vista previa" className="absolute inset-0 w-full h-full object-contain p-2" />
            ) : (
                <div className="flex flex-col items-center text-gray-400">
                    <UploadIcon className="w-10 h-10 mb-2" />
                    <p className="font-semibold">Haz clic o arrastra una imagen</p>
                    <p className="text-sm">PNG, JPG, WEBP</p>
                </div>
            )}
        </div>
    );
};
