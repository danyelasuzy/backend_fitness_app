import fs from "fs";
import cloudinary from "./cloudinaryConfig.js";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";

// Mimic __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Your folder path
const folderPath = path.join(
  __dirname,
  "backend",
  "assets",
  "challengesImages"
);
console.log("Folder path:", folderPath);

// Read all files in the folder
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Error reading folder:", err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    cloudinary.uploader.upload(
      filePath,
      { folder: "challengesImages" },
      (error, result) => {
        if (error) {
          console.error(`Failed to upload ${file}:`, error);
        } else {
          console.log(`Uploaded ${file}: ${result.secure_url}`);
        }
      }
    );
  });
});
