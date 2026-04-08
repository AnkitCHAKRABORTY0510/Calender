export interface Theme {
  id: string;
  name: string;
  imageUrl: string;
  accentColor: string;
  accentLight: string;
}

// export const MONTH_THEMES: Theme[] = [
//   {
//     id: "january",
//     name: "Himalayan Snow ❄️",
//     imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80",
//     accentColor: "#38BDF8",
//     accentLight: "#E0F2FE"
//   },

//   // ✅ YOUR CUSTOM (MOUNTAIN)
//   {
//     id: "february",
//     name: "Mountain Breeze 🏔️",
//     imageUrl: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1400&q=80",
//     accentColor: "#3B9FD4",
//     accentLight: "#E0F2FE"
//   },

//   {
//     id: "march",
//     name: "chai",
//     imageUrl: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&w=1400&q=80",
//     accentColor: "#F43F5E",
//     accentLight: "#FFE4E6"
//   },

//   {
//     id: "april",
//     name: "Golden Wheat Harvest 🌾",
//     imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80",
//     accentColor: "#F59E0B",
//     accentLight: "#FEF3C7"
//   },

//   {
//     id: "may",
//     name: "Thar Desert Heat 🐪",
//     imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80",
//     accentColor: "#EA580C",
//     accentLight: "#FFEDD5"
//   },

//   {
//     id: "june",
//     name: "Monsoon Clouds ⛈️",
//     imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1400&q=80",
//     accentColor: "#334155",
//     accentLight: "#E2E8F0"
//   },

//   {
//     id: "novemmber",
//     name: "Lush Rain Rivers 🌿",
//     imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80",
//     accentColor: "#059669",
//     accentLight: "#D1FAE5"
//   },

//   // ✅ YOUR CUSTOM (DESERT)
//   {
//     id: "august",
//     name: "Golden Desert Dunes 🐪",
//     imageUrl: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1400&q=80",
//     accentColor: "#F59E0B",
//     accentLight: "#FEF3C7"
//   },

//   {
//     id: "september",
//     name: "Clear Autumn Skies 🌤️",
//     imageUrl: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=80",
//     accentColor: "#2563EB",
//     accentLight: "#DBEAFE"
//   },

//   {
//     id: "october",
//     name: "Festive Lights 🪔",
//     imageUrl: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=1400&q=80",
//     accentColor: "#C2410C",
//     accentLight: "#FFEDD5"
//   },

//   {
//     id: "july",
//     name: "Crisp Pine Morning 🌲",
//     imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80",
//     accentColor: "#0F766E",
//     accentLight: "#CCFBF1"
//   },

//   {
//     id: "december",
//     name: "Frost & Ice 🏔️",
//     imageUrl: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1400&q=80",
//     accentColor: "#6366F1",
//     accentLight: "#E0E7FF"
//   }
// ];

export const MONTH_THEMES: Theme[] = [
  {
    id: "january",
    name: "Polar Night ❄️",
    imageUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=80",
    accentColor: "#0EA5E9",   // icy blue
    accentLight: "#E0F2FE"
  },

  {
    id: "february",
    name: "Lavender Frost 🌸",
    imageUrl: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=1400&q=80",
    accentColor: "#A78BFA",   // soft violet
    accentLight: "#F3E8FF"
  },

  {
    id: "march",
    name: "Blooming Spring 🌼",
    imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1400&q=80",
    accentColor: "#22C55E",   // fresh green
    accentLight: "#DCFCE7"
  },

  {
    id: "april",
    name: "Cherry Blossom Sky 🌸",
    imageUrl: "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1400&q=80",
    accentColor: "#FB7185",   // pink blossom
    accentLight: "#FFE4E6"
  },

  {
    id: "may",
    name: "Golden Hour Glow 🌅",
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    accentColor: "#F59E0B",   // sunset gold
    accentLight: "#FEF3C7"
  },

  {
    id: "june",
    name: "Ocean Breeze 🌊",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    accentColor: "#06B6D4",   // aqua
    accentLight: "#CFFAFE"
  },

  {
    id: "july",
    name: "Tropical Jungle 🌴",
    imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1400&q=80",
    accentColor: "#16A34A",   // deep green
    accentLight: "#DCFCE7"
  },

  {
    id: "august",
    name: "Sunset Heat 🔥",
    imageUrl: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1400&q=80",
    accentColor: "#F97316",   // orange heat
    accentLight: "#FFEDD5"
  },

  {
    id: "september",
    name: "Misty Mountains 🌫️",
    imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80",
    accentColor: "#64748B",   // slate mist
    accentLight: "#F1F5F9"
  },

  {
    id: "october",
    name: "Autumn Fire 🍁",
    imageUrl: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?auto=format&fit=crop&w=1400&q=80",
    accentColor: "#DC2626",   // red leaves
    accentLight: "#FEE2E2"
  },

  {
    id: "novemmber",
    name: "Lush Rain Rivers 🌿",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80",
    accentColor: "#059669",
    accentLight: "#D1FAE5"
  },

  {
    id: "december",
    name: "Winter Aurora 🌌",
    imageUrl: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1400&q=80",
    accentColor: "#7C3AED",   // aurora purple
    accentLight: "#EDE9FE"
  }
];