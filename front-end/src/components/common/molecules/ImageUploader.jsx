import { useRef, useState, useEffect } from "react";
import { ImageIcon, UploadCloud, X, AlertCircle, Check } from "lucide-react";
import { uploadImage } from "../../../services/cloudinaryService";

/**
 * ImageUploader component
 *
 * Integrates with react-hook-form via Controller.
 * Props:
 *   value     {string}   - Current image URL (shows preview)
 *   onChange  {function} - Called with the new URL after a successful upload or manual input
 *   error     {string}   - Validation error message from react-hook-form
 *   disabled  {boolean}  - Disables the uploader while the form is submitting
 */
export default function ImageUploader({ value, onChange, error, disabled }) {
  const inputRef = useRef(null);
  const [uploadMode, setUploadMode] = useState("upload"); // 'upload' | 'url'
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState(value || "");

  useEffect(() => {
    setUrlInput(value || "");
  }, [value]);

  const handleUrlUpload = async () => {
    if (!urlInput || !urlInput.startsWith("http")) {
      setUploadError(
        "Please enter a valid image URL starting with http/https.",
      );
      return;
    }

    setUploadError(null);
    setUploading(true);

    try {
      const url = await uploadImage(urlInput);
      onChange(url);
    } catch (err) {
      setUploadError(err.message || "Failed to upload URL to Cloudinary.");
    } finally {
      setUploading(false);
    }
  };

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Image must be smaller than 10 MB.");
      return;
    }

    setUploadError(null);
    setUploading(true);

    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      setUploadError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset input so the same file can be re-selected
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const clearImage = (e) => {
    e.stopPropagation();
    onChange("");
    setUploadError(null);
  };

  const displayError = uploadError || error;

  return (
    <div className="space-y-4">
      {/* Mode Selector Tabs */}
      <div className="flex gap-1 p-1 bg-gray-950 border border-gray-800 rounded-xl max-w-[280px]">
        <button
          type="button"
          onClick={() => setUploadMode("upload")}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-center ${
            uploadMode === "upload"
              ? "bg-primary text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Upload Image
        </button>
        <button
          type="button"
          onClick={() => setUploadMode("url")}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-center ${
            uploadMode === "url"
              ? "bg-primary text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Image URL
        </button>
      </div>

      {/* Main Content Area */}
      {uploadMode === "upload" ? (
        /* Cloudinary Upload Area */
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label="Image upload area"
          onClick={() => !disabled && !uploading && inputRef.current?.click()}
          onKeyDown={(e) => {
            if (
              (e.key === "Enter" || e.key === " ") &&
              !disabled &&
              !uploading
            ) {
              inputRef.current?.click();
            }
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative flex flex-col items-center justify-center w-full rounded-xl border-2 border-dashed
            transition-all duration-200 overflow-hidden
            ${disabled || uploading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
            ${
              isDragging
                ? "border-primary/70 bg-primary/5 scale-[1.01]"
                : displayError
                  ? "border-red-500/50 bg-red-500/5"
                  : value
                    ? "border-gray-700 bg-gray-950/40"
                    : "border-gray-700 bg-gray-950/40 hover:border-primary/50 hover:bg-primary/5"
            }
          `}
          style={{ minHeight: "160px" }}
        >
          {/* Hidden file input */}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleInputChange}
            disabled={disabled || uploading}
            aria-hidden="true"
          />

          {uploading ? (
            /* Upload in progress */
            <div className="flex flex-col items-center gap-3 py-8 px-4">
              <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <p className="text-sm text-gray-400 font-medium">
                Uploading to Cloudinary...
              </p>
            </div>
          ) : value ? (
            /* Preview */
            <div className="relative w-full">
              <img
                src={value}
                alt="Dish preview"
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <UploadCloud size={24} className="text-white" />
                <span className="text-white text-sm font-medium">
                  Click or drag to replace
                </span>
              </div>
              {/* Remove button */}
              <button
                type="button"
                onClick={clearImage}
                disabled={disabled}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-red-500 transition-colors z-10"
                title="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center gap-3 py-8 px-4">
              <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center">
                <ImageIcon size={24} className="text-gray-500" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-300">
                  <span className="text-primary">Click to upload</span> or drag
                  & drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, WEBP — max 10 MB
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-800/60 border border-gray-700/50">
                <UploadCloud size={12} className="text-primary" />
                <span className="text-xs text-gray-400">
                  Uploads to Cloudinary
                </span>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Image URL Input Area */
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                setUploadError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleUrlUpload();
                }
              }}
              disabled={disabled || uploading}
              placeholder="Paste image URL, then click Upload to Cloudinary"
              className="flex-1 px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-sm"
            />
            {urlInput && !urlInput.includes("res.cloudinary.com") && (
              <button
                type="button"
                onClick={handleUrlUpload}
                disabled={disabled || uploading || !urlInput.startsWith("http")}
                className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <>
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadCloud size={14} />
                    Upload to Cloudinary
                  </>
                )}
              </button>
            )}
            {urlInput && urlInput.includes("res.cloudinary.com") && (
              <div className="flex items-center gap-1.5 px-3 py-2 bg-green-500/10 border border-green-500/20 text-green-400 font-semibold text-xs rounded-xl whitespace-nowrap">
                <Check size={14} />
                Cloudinary Hosted
              </div>
            )}
          </div>
          {value && (
            <div className="relative rounded-xl border border-gray-800 overflow-hidden bg-gray-950/40">
              <img
                src={value}
                alt="URL Preview"
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <button
                type="button"
                onClick={clearImage}
                disabled={disabled}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-red-500 transition-colors z-10"
                title="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {displayError && (
        <div className="flex items-center gap-1.5 text-red-400 text-xs">
          <AlertCircle size={13} />
          <span>{displayError}</span>
        </div>
      )}
    </div>
  );
}
