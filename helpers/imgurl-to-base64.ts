export const imageUrlToBase64 = async (url: string) => {
    const imageUrl = await fetch(url);
    const blob = await imageUrl.blob();
    const file = new File([blob], 'image', { type: blob.type });

    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        
        reader.addEventListener("load", () => {
            if (!reader.result) {
                reject(new Error('Failed to convert image to base64'));
                return;
            }
            const base64 = extractBase64FromDataURL(reader.result.toString());
            if (!base64) {
                reject(new Error('Failed to extract base64 string'));
                return;
            }
            resolve(base64);
        });

        reader.addEventListener("error", () => {
            reject(new Error('Failed to read file'));
        });
    });
};
// Example usage
// const imgUrl = 'https://utfs.io/f/4909bd26-b0af-4f1d-b9b9-e7b21b15dd0f-nm33wo.png';

// imageUrlToBase64("https://utfs.io/f/7da6e705-7d42-42eb-aea7-7353a6cf376e-nvfpae.png")
const extractBase64FromDataURL = (dataURL:string) => {
    // Check if the dataURL starts with 'data:image/png;base64,'
    if(!dataURL) return;
    const prefix = 'data:image/png;base64,';
    if (dataURL.startsWith(prefix)) {
        // Extract the Base64 string after the prefix
        return dataURL.substring(prefix.length);
    } else {
        // Handle cases where the dataURL doesn't match expected format
        console.error('Invalid data URL format');
        return null;
    }
};