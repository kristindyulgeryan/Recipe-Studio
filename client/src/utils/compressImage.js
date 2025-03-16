export const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const MAX_WIDTH = 50;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Преобразуваме в Blob и връщаме Promise
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob); // Връща Blob като Promise
            } else {
              reject(new Error("Failed to compress image"));
            }
          },
          "image/jpeg",
          0.6 // 60% качество
        );
      };
    };
    reader.onerror = (error) => reject(error);
  });
};
