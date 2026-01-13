export const cutImageAndSetBase64 = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Definimos el tamaño objetivo
                const targetSize = 512;
                canvas.width = targetSize;
                canvas.height = targetSize;

                // Lógica de recorte (Center Crop)
                let sourceX = 0;
                let sourceY = 0;
                let sourceSize = Math.min(img.width, img.height);

                if (img.width > img.height) {
                    sourceX = (img.width - img.height) / 2;
                } else {
                    sourceY = (img.height - img.width) / 2;
                }

                // Dibujar en el canvas redimensionando
                ctx.drawImage(
                    img,
                    sourceX, sourceY, sourceSize, sourceSize, // Área de origen
                    0, 0, targetSize, targetSize             // Área de destino
                );

                // Convertir a Base64 (JPEG con calidad 0.8 para optimizar peso)
                const base64 = canvas.toDataURL('image/jpeg', 0.8);
                resolve(base64);
            };
        };
    });
};