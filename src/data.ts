export const steps = [
  { id: "1", name: "Your info" },
  { id: "2", name: "Select plan" },
  { id: "3", name: "Add-ons" },
  { id: "4", name: "Summary" },
];

export type PriceType = "monthly" | "yearly";

export interface Plan {
  id: string;
  name: string;
  icon: string;
  bonusMessage: string;
  monthlyPrice: number;
  yearlyPrice: number;
}

export const plans: Plan[] = [
  {
    id: "monthly_arcade",
    name: "Arcade",
    icon: "icon-arcade",
    bonusMessage: "2 months free",
    monthlyPrice: 9,
    yearlyPrice: 90,
  },
  {
    id: "monthly_advanced",
    name: "Advanced",
    icon: "icon-advanced",
    bonusMessage: "2 months free",
    monthlyPrice: 12,
    yearlyPrice: 120,
  },
  {
    id: "monthly_pro",
    name: "Pro",
    icon: "icon-pro",
    bonusMessage: "2 months free",
    monthlyPrice: 15,
    yearlyPrice: 150,
  },
];

export interface Addon {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
}

export const addons: Addon[] = [
  {
    id: "online_service",
    name: "Online service",
    description: "Access to multiplayer games",
    monthlyPrice: 1,
    yearlyPrice: 10,
  },
  {
    id: "larger_storage",
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
  {
    id: "customizable_profile",
    name: "Customizable profile",
    description: "Custom theme on your profile",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
];
