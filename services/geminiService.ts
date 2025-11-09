
import { GoogleGenAI, Modality } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const editImageWithNanoBanana = async (
    base64ImageData: string,
    mimeType: string,
    prompt: string
): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64ImageData,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        
        const firstPart = response.candidates?.[0]?.content?.parts?.[0];

        if (firstPart && 'inlineData' in firstPart && firstPart.inlineData) {
            const imageData = firstPart.inlineData;
            return `data:${imageData.mimeType};base64,${imageData.data}`;
        } else {
            throw new Error("La respuesta de la API no contenía una imagen válida.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("No se pudo comunicar con la API de Gemini.");
    }
};
