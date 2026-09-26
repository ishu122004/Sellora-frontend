import { useState } from "react";

function getInitials(value) {
  return String(value || "Image")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function SafeImage({
  src,
  alt,
  className = "",
  fallbackClassName = ""
}) {
  const [failedSrc, setFailedSrc] = useState("");
  const failed = !src || failedSrc === src;

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-slate-100 text-slate-400 ${fallbackClassName || className}`}
      >
        <span className="text-sm font-semibold">
          {getInitials(alt)}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailedSrc(src)}
    />
  );
}

export default SafeImage;
