import { motion } from 'framer-motion';
import { type Theme } from '../data/themes';

interface ThemeSwitcherProps {
  themes: Theme[];
  selectedTheme: Theme;
  onSelect: (id: string) => void;
  reducedMotion: boolean;
}

export function ThemeSwitcher({ themes, selectedTheme, onSelect, reducedMotion }: ThemeSwitcherProps) {
  return (
    <div className="absolute top-4 right-4 flex gap-2 z-20">
      {themes.map(theme => {
        const isActive = selectedTheme.id === theme.id;
        return (
          <motion.button
            key={theme.id}
            onClick={() => onSelect(theme.id)}
            className="w-10 h-10 rounded-full overflow-hidden shadow-md focus:outline-none focus:ring-2 focus:ring-white"
            whileHover={!reducedMotion ? { scale: 1.1, y: -2 } : {}}
            whileTap={!reducedMotion ? { scale: 0.95 } : {}}
            animate={!reducedMotion && isActive ? { border: "2px solid white", scale: 1.08 } : { border: isActive ? "2px solid white" : "0px solid transparent" }}
          >
            <img src={theme.imageUrl} alt={theme.id} className="w-full h-full object-cover" />
          </motion.button>
        );
      })}
    </div>
  );
}
