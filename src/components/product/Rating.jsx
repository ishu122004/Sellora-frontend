//reusable rating display like this ★★★★★ 4.5
function Rating({ rating = 0 }) {
  const roundedRating = Math.round(rating);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            star <= roundedRating
              ? "text-yellow-500"
              : "text-gray-300"
          }
        >
          ★
        </span>
      ))}

      <span className="ml-2 text-sm text-gray-500">
        {rating}/5
      </span>
    </div>
  );
}

export default Rating;