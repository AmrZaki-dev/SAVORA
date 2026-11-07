const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Uploads a file or external image URL directly to Cloudinary
 * using an unsigned upload preset.
 *
 * @param {File|string} fileOrUrl - Image File or public image URL
 * @returns {Promise<string>} - The secure_url of the uploaded image
 */
export async function uploadImage(fileOrUrl) {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env file."
    );
  }

  const formData = new FormData();

  // File upload OR external URL
  formData.append("file", fileOrUrl);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || "Image upload failed.");
  }

  const data = await response.json();

  return data.secure_url;
}