function LogoMark({ className = "h-10 w-14" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 80"
      role="img"
      aria-label="The Implementers Logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="10,10 10,70 75,40" fill="#0066CC" />
      <polygon points="120,10 120,70 55,40" fill="#00A86B" />
    </svg>
  );
}

export default LogoMark;
