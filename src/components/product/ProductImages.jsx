import { useState } from "react";
import SafeImage from "../common/SafeImage";

function ProductImages({ images = [], image, name }) {
  const allImages = [
    ...new Set(
      [...images, image]
        .map((item) => String(item || "").trim())
        .filter(Boolean)
    )
  ];
  const [selectedImage, setSelectedImage] = useState(
    allImages[0] || ""
  );
  const activeImage = allImages.includes(selectedImage)
    ? selectedImage
    : allImages[0] || "";

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-lg bg-slate-100">
        <SafeImage
          src={activeImage}
          alt={name}
          className="h-full w-full object-cover"
          fallbackClassName="h-full w-full"
        />
      </div>

      {allImages.length > 1 ? (
        <div className="mt-3 grid grid-cols-5 gap-3">
          {allImages.map((item, index) => (
            <button
              key={item}
              type="button"
              onClick={() => setSelectedImage(item)}
              aria-label={"View product image " + (index + 1)}
              className={
                item === activeImage
                  ? "aspect-square overflow-hidden rounded border-2 border-purple-600"
                  : "aspect-square overflow-hidden rounded border border-slate-200"
              }
            >
              <SafeImage
                src={item}
                alt={name + " view " + (index + 1)}
                className="h-full w-full object-cover"
                fallbackClassName="h-full w-full"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default ProductImages;
