import React, { useRef, useState } from "react";
import { uploadToCloudinary, CloudinaryFolder } from "../../utils/cloudinary";
import { toast } from "react-toastify";
import { Colors } from "../../utils/utils.colors";
import { FiUpload, FiX } from "react-icons/fi";

const UploadI = FiUpload as any;
const XI = FiX as any;

type Props = {
  value: string;
  onChange: (url: string) => void;
  folder?: CloudinaryFolder;
  label?: string;
  testId?: string;
};

export const ImageUpload: React.FC<Props> = ({ value, onChange, folder = "ulpgl/uploads", label = "Image", testId = "image-upload" }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return toast.warn("Seuls les fichiers image sont acceptés");
    if (file.size > 10 * 1024 * 1024) return toast.warn("Image trop grande (max 10 Mo)");
    setBusy(true);
    try {
      const url = await uploadToCloudinary(file, folder);
      onChange(url);
      toast.success("Image téléversée");
    } catch (e: any) {
      toast.error(e?.message || "Erreur d'upload (Cloudinary configuré ?)");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div style={{ fontSize: 13, color: "#444", marginBottom: 6, fontWeight: 500 }}>{label}</div>
      {value ? (
        <div style={{ position: "relative", display: "inline-block" }}>
          <img src={value} alt="" data-testid={`${testId}-preview`} style={{ width: "100%", maxWidth: 320, height: 180, objectFit: "cover", borderRadius: 8, border: "1px solid #ddd" }} />
          <button
            data-testid={`${testId}-remove`}
            type="button"
            onClick={() => onChange("")}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "rgba(0,0,0,0.6)",
              color: "white",
              border: "none",
              width: 30,
              height: 30,
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <XI />
          </button>
        </div>
      ) : (
        <div
          data-testid={`${testId}-dropzone`}
          onClick={() => inputRef.current?.click()}
          style={{
            border: "2px dashed #c9ccd6",
            padding: 26,
            borderRadius: 8,
            cursor: "pointer",
            background: busy ? "#f5f5f5" : "white",
            textAlign: "center",
            color: "#666",
            transition: "all 0.2s",
          }}
        >
          <UploadI size={28} color={Colors.primaryColor} />
          <div style={{ marginTop: 8, fontSize: 14 }}>
            {busy ? "Téléversement en cours..." : "Cliquez ou glissez une image ici"}
          </div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>PNG, JPG, WEBP — max 10 Mo</div>
        </div>
      )}
      <input
        data-testid={`${testId}-input`}
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />
    </div>
  );
};
