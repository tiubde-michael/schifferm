function StarRating({ value, className }) {
  const safeValue = Math.max(1, Math.min(5, Number(value) || 1));
  const stars = Array.from({ length: 5 }, (_, index) => (index < safeValue ? "★" : "☆")).join("");

  return (
    <span className={className} role="img" aria-label={`${safeValue} von 5 Sternen`}>
      {stars}
    </span>
  );
}

export default StarRating;
