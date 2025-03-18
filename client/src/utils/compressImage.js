// import imageCompression from "browser-image-compression";

// export const compressImage = async (file) => {
//   const options = {
//     maxSizeMB: 0.01, 
//     maxWidthOrHeight: 30, 
//     useWebWorker: true, 
//   };

//   try {
//     const compressedFile = await imageCompression(file, options);
//     return compressedFile;
//   } catch (error) {
//     console.error("Image compression failed:", error);
//     throw error;
//   }
// };


import Resizer from "react-image-file-resizer";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      100, 
      100, 
      "JPEG", 
      80, // Quality (try lowering this for more compression)
      0, // Rotation
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

export const compressImage = async (file) => {
  try {
    
    const resizedFile = await resizeFile(file);

    // Convert the resized file (Base64) into a Blob 
    const resizedBlob = await fetch(resizedFile).then((res) => res.blob());

    // Check the size of the file after resizing
    if (resizedBlob.size > 10 * 1024) { // 20 KB
      alert("Image is still too large, try with lower quality or smaller dimensions");
    }

    return resizedBlob; 
  } catch (error) {
    console.error("Error in image resizing/compression:", error);
    throw error;
  }
};
