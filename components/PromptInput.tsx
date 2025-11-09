
import React from 'react';

interface PromptInputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange }) => {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder="Ej: 'Añade un sombrero de vaquero al gato'"
            className="w-full h-28 p-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none placeholder-gray-500"
        />
    );
};
