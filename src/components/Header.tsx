import { type Theme } from '../data/themes';

interface HeaderProps {
  currentMonth: Date;
  theme: Theme;
}

export function Header({ currentMonth, theme }: HeaderProps) {
  const monthStr = currentMonth
    .toLocaleString('default', { month: 'long' })
    .toUpperCase();

  const yearStr = currentMonth.getFullYear().toString();

  return (
    <div className="relative w-full h-[55%] z-0 shrink-0 overflow-hidden rounded-t-[4px]">

      {/* ✅ SVG CLIP PATH */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="cardShape" clipPathUnits="objectBoundingBox">
            <path d="M0 0 L1 0 L1 0.5 L0.45 0.95 Q0.4 0.99 0.35 0.95 L0 0.7 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* ✅ CLIPPED IMAGE */}
      <div
        className="absolute inset-0 z-0"
        style={{
          clipPath: 'url(#cardShape)',
          WebkitClipPath: 'url(#cardShape)'
        }}
      >
        <img
          src={theme.imageUrl}
          alt="Thematic Environment"
          className="w-full h-full object-cover object-center"
        />

        {/* 🔥 Optional overlay for depth */}
        <div className="absolute inset-0 bg-black/20 " />
      </div>

      {/* ✅ LEFT SHAPE */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      >
        <path
          d="M0 70 L0 100 L20 84 Z"
          fill={theme.accentColor}
        />
      </svg>

      {/* ✅ RIGHT SHAPE */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      >
        <path
          d="M100 50 L100 83 L85 95 Q79 100 72 95 L59 83 Z"
          fill={theme.accentColor}
        />
      </svg>

      {/* ✅ TEXT */}
      <div className="absolute right-[5%] bottom-[15%] flex flex-col items-end z-20 pointer-events-none drop-shadow-md">
        <div className="text-[5.5cqw] lg:text-[25px] font-thin text-white leading-none tracking-wide opacity-90">
          {yearStr}
        </div>
        <div className="text-[5.0cqw] lg:text-[20px] font-black text-white uppercase leading-none mt-1 tracking-widest drop-shadow-sm">
          {monthStr}
        </div>
      </div>

    </div>
  );
}