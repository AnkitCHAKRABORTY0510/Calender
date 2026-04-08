import { Calendar } from './components/Calendar';


/**
 * Photorealistic 3D Spiral Coil Element
 */
const SpiralCoil = () => (
  <div
    className="w-[12px] md:w-[16px] h-[24px] md:h-[34px] rounded-[40%] bg-transparent shadow-[2px_3px_5px_rgba(0,0,0,0.4)] border-t-[3.5px] border-b-[3.5px] border-l-[4px] border-r-[2px] transform -rotate-[15deg] shrink-0 z-10"
    style={{
      borderColor: '#9ca3af', // Base inner shadow metal
      borderLeftColor: '#f3f4f6', // Sharp bright left curve highlight 
      borderRightColor: '#4b5563', // Deep native shadows hitting the inner right wall curves
      borderTopColor: '#d1d5db',
      borderBottomColor: '#d1d5db'
    }}
  />
);

/**
 * Photorealistic Central Hanger Loop & Wall Nail SVG
 */
const WireHanger = () => (
  <svg
    className="absolute bottom-[20%] md:bottom-[30%] left-1/2 -translate-x-1/2 w-[80px] h-[55px] md:w-[120px] md:h-[75px] drop-shadow-[0_8px_6px_rgba(0,0,0,0.4)] z-0 pointer-events-none"
    viewBox="0 0 140 80"
    fill="none"
  >
    <defs>
      <linearGradient id="wireGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f3f4f6" />
        <stop offset="60%" stopColor="#d1d5db" />
        <stop offset="100%" stopColor="#6b7280" />
      </linearGradient>
      <linearGradient id="nailGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#9ca3af" />
        <stop offset="50%" stopColor="#f3f4f6" />
        <stop offset="100%" stopColor="#374151" />
      </linearGradient>
    </defs>

    {/* Center Wall Nail (Head, Shadow, and Core) */}
    <circle cx="70" cy="18" r="8" fill="url(#nailGrad)" className="drop-shadow-lg" />
    <circle cx="70" cy="18" r="3" fill="#374151" opacity="0.4" />

    {/* Continuous Bridge Wire Loop smoothly swooping down strictly to meet the internal core tubes */}
    <path
      d="M -5 70 C 35 70, 50 10, 70 10 C 90 10, 105 70, 145 70"
      stroke="url(#wireGrad)"
      strokeWidth="7"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Master Binding Organizer Array
 */
const TopBinding = () => {
  return (
    <div className="relative w-[90%] md:w-[85%] flex flex-row items-center justify-between -mb-[12px] md:-mb-[18px] z-50">

      {/* Internal Continuous Horizontal Wire Corbes Threading Directly Into Springs */}
      <div className="absolute top-[45%] left-0 w-[45%] h-[5px] md:h-[7px] bg-gradient-to-b from-gray-500 via-gray-200 to-gray-600 shadow-inner rounded-full drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] z-0" />
      <div className="absolute top-[45%] right-0 w-[45%] h-[5px] md:h-[7px] bg-gradient-to-b from-gray-500 via-gray-200 to-gray-600 shadow-inner rounded-full drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] z-0" />

      {/* Center Dynamic Hanger Extrusion */}
      <WireHanger />

      {/* Left Physics Array: 14 Spiral-Coil Modules symmetrically spanning the Left 45% */}
      <div className="relative flex justify-center w-[35%] ml-10 z-10 pr-[20%] lg:w-[45%] lg:pr-[30%] lg:mr-5">
        {Array.from({ length: 15 }).map((_, i) => (
          <SpiralCoil key={`left-spring-${i}`} />
        ))}
      </div>

      {/* Right Physics Array: 14 Spiral-Coil Modules symmetrically spanning the Right 45% */}
      <div className="relative flex justify-centre w-[45%] z-10 ">
        {Array.from({ length: 15 }).map((_, i) => (
          <SpiralCoil key={`right-spring-${i}`} />
        ))}
      </div>

    </div>
  );
};

/**
 * Root Application Component
 * 
 * Sets up the full viewport wrapper and handles any global scaling.
 * Mounts the core 3D Calendar structure natively locking bindings rigidly to its upper rim.
 */
function App() {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center p-2 lg:p-4 overflow-hidden bg-[#f1f3f5]">
      {/* Container bounding box applying master scaling and structural locking */}
      <div className="scale-[0.75] lg:scale-[0.75] sm:scale-[0.1] origin-center flex flex-col items-center w-full relative">

        {/* Photorealistic Extruded Top Wiring Mechanical Assembly */}
        <TopBinding />

        <div className="relative w-full max-w-[1024px] flex justify-center">
          {/* Wall Cutout Negative Space Mask creating the illusion of a physically punched binder hole natively matching background wall */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[5vw] h-[2.5vw] min-w-[60px] min-h-[30px] max-w-[80px] max-h-[40px] bg-[#f1f3f5] rounded-b-full shadow-[inset_0_-3px_5px_rgba(0,0,0,0.15)] z-40 pointer-events-none" />

          {/* Render core Calendar mapping natively sitting beneath the mechanical wire bonds */}
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default App;
