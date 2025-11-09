
import React from 'react';
import { MagicWandIcon } from './icons/MagicWandIcon';

interface EditButtonProps {
    onClick: () => void;
    isLoading: boolean;
    disabled: boolean;
}

export const EditButton: React.FC<EditButtonProps> = ({ onClick, isLoading, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || isLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Editando...
                </>
            ) : (
                <>
                    <MagicWandIcon className="w-5 h-5" />
                    Generar Edición
                </>
            )}
        </button>
    );
};
