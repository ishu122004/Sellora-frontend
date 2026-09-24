//handle product images
function ProductImages({ image, name }) {
  return (
    <div className="flex min-h-112.5 items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
      <img
        src={image}
        alt={name}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default ProductImages;