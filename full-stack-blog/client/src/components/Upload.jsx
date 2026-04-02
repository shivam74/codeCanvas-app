import { IKContext, IKUpload } from "imagekitio-react";
import { useRef } from "react";
import { toast } from "react-toastify";

const authenticator = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/upload-auth`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error("Upload service returned an invalid response.");
    }
    const { signature, expire, token } = data || {};

    if (!signature || !token) {
      throw new Error(data?.message || "Missing upload credentials from server.");
    }

    return { signature, expire, token };
  } catch (error) {
    const msg = error?.message || String(error);
    const keep =
      msg.startsWith("Request failed") ||
      msg.startsWith("Upload service") ||
      msg.startsWith("Missing upload");
    throw new Error(keep ? msg : `Authentication request failed: ${msg}`);
  }
};

const Upload = ({ children, type = "image", setProgress, setData }) => {
  const ref = useRef(null);

  const onError = (err) => {
    console.error(err);
    toast.error("Image upload failed!");
  };

  const onSuccess = (res) => {
    setData?.(res);
  };

  const onUploadProgress = (progress) => {
    if (!progress?.total) return;

    const percent = Math.round(
      (progress.loaded / progress.total) * 100
    );

    setProgress?.(percent); // ✅ safe call
  };

  return (
    <IKContext
      publicKey={import.meta.env.VITE_IK_PUBLIC_KEY || ""}
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT || ""}
      authenticator={authenticator}
    >
      <IKUpload
        useUniqueFileName
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={onUploadProgress}
        className="hidden"
        ref={ref}
        accept={`${type}/*`}
      />

      {/* ✅ Safe click */}
      <div
        className="cursor-pointer"
        onClick={() => ref.current?.click()}
      >
        {children}
      </div>
    </IKContext>
  );
};

export default Upload;