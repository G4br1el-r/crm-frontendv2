import {
  ChartNoAxesColumn,
  ChartNoAxesCombined,
  Eye,
  EyeClosed,
  Headset,
  Lock,
  ShoppingBasket,
  User,
} from "lucide-react";

export const iconMap = {
  noIcon: null,
  user: User,
  password: Lock,
  eye: Eye,
  eyeClose: EyeClosed,
  charts: ChartNoAxesCombined,
  bag: ShoppingBasket,
  headset: Headset,
} as const;

export type IconName = keyof typeof iconMap;
