import { v2 as cloudinary } from "cloudinary";

// uploads multiple files in cloudinary and returns the result
const uploadFiles = async (files) => {
  const uploadedFiles = [];

  for (const file of files) {
    const result = await new Promise((resolve, reject) => {
      // upload file to cloudinary
      cloudinary.uploader
        .upload_stream(
          {
            folder: "20260719",
            allowed_formats: ["jpg", "png", "mp4", "webp"],
          },
          (error, data) => {
            if (error) {
              return reject(error);
            }

            return resolve(data);
          },
        )
        .end(file.buffer);
    });

    uploadedFiles.push(result);
  }

  return uploadedFiles;
};

export default uploadFiles;
