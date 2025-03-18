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
      100, // Desired width
      100, // Desired height
      "JPEG", // Image format
      50, // Quality (try lowering this for more compression)
      0, // Rotation
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

export const compressImage = async (file) => {
  try {
    // Resize image using Resizer
    const resizedFile = await resizeFile(file);

    // Convert the resized file (Base64) into a Blob (we need this to get the file size)
    const resizedBlob = await fetch(resizedFile).then((res) => res.blob());

    // Check the size of the file after resizing
    if (resizedBlob.size > 10 * 1024) { // 20 KB
      alert("Image is still too large, try with lower quality or smaller dimensions");
    }

    return resizedBlob; // Return the resized (and potentially compressed) image
  } catch (error) {
    console.error("Error in image resizing/compression:", error);
    throw error;
  }
};
