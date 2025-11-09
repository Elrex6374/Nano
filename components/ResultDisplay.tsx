
import React from 'react';
import { MagicWandIcon } from './icons/MagicWandIcon';

interface ResultDisplayProps {
    editedImageUrl: string | null;
    isLoading: boolean;
}

const LoadingSkeleton: React.FC = () => (
    <div className="w-full h-full bg-gray-700/50 rounded-lg animate-pulse flex items-center justify-center">
        <MagicWandIcon className="w-16 h-16 text-gray-600" />
    </div>
);

const Placeholder: React.FC = () => (
    <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
        <MagicWandIcon className="w-16 h-16 mb-4" />
        <h3 className="text-xl font-semibold">La imagen editada aparecerá aquí</h3>
        <p>Sube una imagen y describe tu edición para empezar.</p>
    </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ editedImageUrl, isLoading }) => {
    return (
        <div className="w-full h-[50vh] min-h-[400px] bg-gray-900/50 rounded-lg flex items-center justify-center p-4">
            {isLoading ? (
                <LoadingSkeleton />
            ) : editedImageUrl ? (
                <img src={editedImageUrl} alt="Resultado de la edición" className="max-w-full max-h-full object-contain rounded-md" />
            ) : (
                <Placeholder />
            )}
        </div>
    );
};
