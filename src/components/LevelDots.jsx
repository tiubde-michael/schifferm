function levelToNum(level) {
  if (!level) return 0;
  const l = level.toLowerCase();
  if (l === "sehr gut" || l === "advanced") return 3;
  if (l === "gut" || l === "proficient") return 2;
  return 1; // basis / basic
}

export default function LevelDots({ level }) {
  const n = levelToNum(level);
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${
              i <= n
                ? n >= 3
                  ? "bg-emerald-500"
                  : "bg-implementers-blue"
                : "bg-slate-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-slate-500">{level || "—"}</span>
    </div>
  );
}
