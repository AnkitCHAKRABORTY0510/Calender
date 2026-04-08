import { Calendar } from './components/Calendar';

/**
 * Root Application Component
 * 
 * Sets up the full viewport wrapper and handles any global scaling.
 * Mounts the core 3D Calendar structure and the spiral rings.
 */
function App() {
  return (
    <>
      <div className="w-full h-dvh flex flex-col items-center justify-center p-2 lg:p-4 overflow-hidden bg-[#f1f3f5]">
        {/* Container bounding box applying master scaling and structural locking */}
        <div className="scale-[0.70] lg:scale-[0.70] sm:scale-[0.1] origin-center flex flex-col items-center w-full">
          
          {/* Visual binding rings extending outward at the top simulating a spiral notebook */}
          <div className="flex space-x-2.5 -mb-2 z-50">
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={i} 
                className="w-[4px] h-[16px] rounded-full bg-[#202020] border-t-2 border-[#555] shadow-sm transform -rotate-6" 
              />
            ))}
          </div>
          
          {/* Render core Calendar mapping */}
          <Calendar />
        </div>
      </div>
    </>
  );
}

export default App;
