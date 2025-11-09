
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { PromptInput } from './components/PromptInput';
import { EditButton } from './components/EditButton';
import { ResultDisplay } from './components/ResultDisplay';
import { MagicWandIcon } from './components/icons/MagicWandIcon';
import { editImageWithNanoBanana } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';

const App: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [originalFile, setOriginalFile] = useState<File | null>(null);

    const handleImageSelect = useCallback(async (file: File) => {
        setError(null);
        setEditedImage(null);
        setOriginalFile(file);
        try {
            const base64 = await fileToBase64(file);
            setOriginalImage(base64);
        } catch (err) {
            setError('Error al leer el archivo de imagen.');
            console.error(err);
        }
    }, []);

    const handleEdit = async () => {
        if (!originalFile || !prompt || isLoading) return;

        setIsLoading(true);
        setError(null);
        setEditedImage(null);

        try {
            const base64Data = await fileToBase64(originalFile);
            const { mimeType, data } = extractBase64Data(base64Data);

            if (!data) {
                throw new Error("No se pudo extraer los datos de la imagen.");
            }

            const resultBase64 = await editImageWithNanoBanana(data, mimeType, prompt);
            setEditedImage(resultBase64);

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error desconocido.';
            setError(`Fallo en la edición: ${errorMessage}`);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    const extractBase64Data = (base64String: string) => {
        const match = base64String.match(/^data:(image\/.+);base64,(.*)$/);
        if (!match) return { mimeType: '', data: '' };
        return { mimeType: match[1], data: match[2] };
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
            <header className="w-full max-w-6xl text-center mb-6">
                <div className="flex items-center justify-center gap-3">
                    <MagicWandIcon className="h-8 w-8 text-indigo-400" />
                    <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                        Editor de Fotos Nano Banana
                    </h1>
                </div>
                <p className="text-gray-400 mt-2">
                    Transforma tus imágenes con el poder de Gemini.
                </p>
            </header>

            <main className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
                {/* Controls Column */}
                <div className="lg:w-1/3 w-full bg-gray-800/50 rounded-2xl p-6 shadow-2xl border border-gray-700 flex flex-col gap-6">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-200 mb-2">1. Sube tu Imagen</h2>
                        <ImageUploader onImageSelect={handleImageSelect} imagePreviewUrl={originalImage} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-200 mb-2">2. Describe la Edición</h2>
                        <PromptInput value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                    </div>
                    <div className="mt-auto">
                        <EditButton
                            onClick={handleEdit}
                            isLoading={isLoading}
                            disabled={!originalImage || !prompt}
                        />
                    </div>
                </div>

                {/* Result Column */}
                <div className="lg:w-2/3 w-full bg-gray-800/50 rounded-2xl p-6 shadow-2xl border border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-200 mb-4 text-center">Resultado</h2>
                    {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg text-center">{error}</div>}
                    <ResultDisplay editedImageUrl={editedImage} isLoading={isLoading} />
                </div>
            </main>
            
            <footer className="w-full max-w-6xl text-center mt-8 text-gray-500 text-sm">
                <p>Creado con React, Tailwind CSS y la API de Gemini.</p>
            </footer>
        </div>
    );
};

export default App;
