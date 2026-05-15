import {
  ChartNoAxesCombined,
  Eye,
  EyeClosed,
  Headset,
  Lock,
  ShoppingBasket,
  User,
  Info,
  Trash,
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
  info: Info,
  trash: Trash,
} as const;

export type IconName = keyof typeof iconMap;
