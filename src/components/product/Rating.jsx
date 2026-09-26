function Rating({
  rating = 0,
  onChange,
  size = "text-xl",
  showValue = true
}) {
  const roundedRating = Math.round(Number(rating) || 0);
  const interactive = typeof onChange === "function";

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const className =
          star <= roundedRating
            ? `${size} text-amber-500`
            : `${size} text-slate-300`;

        return interactive ? (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={className}
            aria-label={star + " star rating"}
            aria-pressed={star === roundedRating}
          >
            ★
          </button>
        ) : (
          <span key={star} className={className}>
            ★
          </span>
        );
      })}

      {showValue ? (
        <span className="ml-2 text-sm text-slate-500">
          {Number(rating || 0).toFixed(1)}/5
        </span>
      ) : null}
    </div>
  );
}

export default Rating;
