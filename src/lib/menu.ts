import type { StaticImageData } from "next/image";
import flatWhite from "@/assets/images/menu-flat-white.jpg";
import caramelLatte from "@/assets/images/menu-caramel-latte.jpg";
import spanishLatte from "@/assets/images/menu-spanish-latte.jpg";
import icedMatcha from "@/assets/images/menu-iced-matcha.jpg";

/** Dietary markers shown beside items, explained in the menu legend. */
export const DIETARY = {
  V: "Vegan with oat milk",
  DF: "Dairy-free option",
  CF: "Caffeine-free",
} as const;

export type Dietary = keyof typeof DIETARY;

export type MenuItem = {
  name: string;
  price: string; // AUD, fictional demonstration prices
  description: string;
  dietary?: Dietary[];
  signature?: boolean;
};

export type MenuCategory = {
  id: string;
  label: string;
  intro: string;
  image: StaticImageData;
  imageAlt: string;
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    id: "espresso",
    label: "Espresso",
    intro: "Our house blend “Wren” — chocolate, hazelnut and a bright red-apple finish.",
    image: flatWhite,
    imageAlt: "A flat white with heart latte art in a white cup on a dark timber table",
    items: [
      { name: "Flat White", price: "4.80", description: "Double ristretto with silky, finely textured milk. The Melbourne classic.", dietary: ["V", "DF"], signature: true },
      { name: "Long Black", price: "4.50", description: "A double shot over hot water — crema intact, sweetness forward.", dietary: ["V", "DF"] },
      { name: "Cortado", price: "4.70", description: "Equal parts espresso and warm milk for a short, rounded cup.", dietary: ["V", "DF"] },
    ],
  },
  {
    id: "signature",
    label: "Signature Coffee",
    intro: "House-made syrups and small-batch flavours, built on a double shot.",
    image: caramelLatte,
    imageAlt: "A caramel latte with latte art in a double-walled glass on a warm timber table",
    items: [
      { name: "Caramel Latte", price: "5.50", description: "Burnt caramel folded through espresso and steamed milk, with a pinch of sea salt.", dietary: ["V", "DF"], signature: true },
      { name: "Spanish Latte", price: "5.80", description: "Espresso with condensed milk — rich, velvety and gently sweet.", signature: true },
      { name: "Honey Cinnamon Latte", price: "5.80", description: "Local raw honey and a whisper of Ceylon cinnamon, hot or iced.", dietary: ["DF"] },
    ],
  },
  {
    id: "iced",
    label: "Iced Coffee",
    intro: "Slow-steeped and poured over clear ice for long, cool afternoons.",
    image: spanishLatte,
    imageAlt: "An iced latte with layered espresso and milk in a clear cup",
    items: [
      { name: "Vanilla Cold Brew", price: "5.80", description: "Steeped for eighteen hours, finished with Madagascan vanilla and a splash of milk.", dietary: ["V", "DF"], signature: true },
      { name: "Iced Long Black", price: "5.00", description: "Double shot over ice and cold water — crisp and clean.", dietary: ["V", "DF"] },
      { name: "Iced Latte", price: "5.50", description: "Espresso poured over cold milk and ice. Simple, done properly.", dietary: ["V", "DF"] },
    ],
  },
  {
    id: "tea",
    label: "Tea & Alternatives",
    intro: "For slower moods — ceremonial matcha, loose-leaf tea and house chai.",
    image: icedMatcha,
    imageAlt: "A vivid green matcha latte with latte art in a ribbed glass",
    items: [
      { name: "Iced Matcha", price: "6.00", description: "Ceremonial-grade Uji matcha whisked to order, over ice and your choice of milk.", dietary: ["V", "DF"], signature: true },
      { name: "Chai Latte", price: "5.50", description: "House-brewed spiced chai with black tea, cardamom and clove.", dietary: ["V", "DF"] },
      { name: "Herbal Infusion", price: "4.80", description: "A pot of loose-leaf chamomile, peppermint or native lemon myrtle.", dietary: ["V", "DF", "CF"] },
    ],
  },
];
