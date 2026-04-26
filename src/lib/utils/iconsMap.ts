import { Eye, EyeClosed, Lock, User } from "lucide-react";

export const iconMap = {
  noIcon: null,
  user: User,
  password: Lock,
  eye: Eye,
  eyeClose: EyeClosed,
} as const;

export type IconName = keyof typeof iconMap;
