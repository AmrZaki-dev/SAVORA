const fs = require("fs");
const path = require("path");

const cloudName = "lslwlv9d";
const uploadPreset = "savora_resturant";

const assetsToUpload = [
  { name: "Logo", path: path.join(__dirname, "src", "assets", "Logo.png") },
  { name: "Savora1", path: path.join(__dirname, "src", "assets", "Savora1.png") },
  { name: "hero", path: path.join(__dirname, "src", "assets", "hero.png") }
];

async function uploadFile(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer]);
  const fileName = path.basename(filePath);

  const formData = new FormData();
  formData.append("file", blob, fileName);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Cloudinary error ${response.status}: ${text}`);
  }

  const json = await response.json();
  return json.secure_url;
}

async function main() {
  const results = {};
  for (const asset of assetsToUpload) {
    try {
      if (!fs.existsSync(asset.path)) {
        console.error(`File not found: ${asset.path}`);
        continue;
      }
      const url = await uploadFile(asset.path);
      console.log(`SUCCESS: ${asset.name} -> ${url}`);
      results[asset.name] = url;
    } catch (error) {
      console.error(`FAILED to upload ${asset.name}:`, error.message);
    }
  }

  // Save results to a temporary JSON file so the agent or user can read them
  fs.writeFileSync(
    path.join(__dirname, "uploaded_assets.json"),
    JSON.stringify(results, null, 2),
    "utf-8"
  );
  console.log("Uploaded assets mapping saved to uploaded_assets.json");
}

main();
