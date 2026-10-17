import imageCompression from "browser-image-compression";

export const compressedSingleImage = async (file) => {
  if (!file) return "Please select one image";

  if (file.type.startsWith("image/")) {
    file = await imageCompression(file, {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 800,
      useWebWorker: true,
      fileType: "image/webp",
      initialQuality: 0.8,
    });
  }

  return file;
};

export const compressedMultipleImages = async (files) => {
  const compressedFiles = await Promise.all(
    files.map(async (item) => {
      if (item.type.startsWith("image/")) {
        return await imageCompression(item, {
          maxSizeMB: 0.3,
          maxWidthOrHeight: 800,
          useWebWorker: true,
          fileType: "image/webp",
          initialQuality: 0.8,
        });
      }
      return item;
    }),
  );

  return compressedFiles;
};
