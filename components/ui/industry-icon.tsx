import {
  Building,
  Building2,
  Boxes,
  Cpu,
  Church,
  Factory,
  GraduationCap,
  Hospital,
  Hotel,
  Landmark,
  Network,
  Router,
  Server,
  Store,
  Wallet,
  Warehouse,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

import type { IndustryIconName } from "@/lib/types";

const iconMap = {
  "data-centre": Server,
  telecommunications: Router,
  technology: Cpu,
  integrator: Network,
  msp: Network,
  oem: Boxes,
  corporate: Building2,
  healthcare: Hospital,
  education: GraduationCap,
  government: Landmark,
  finance: Wallet,
  warehouse: Warehouse,
  manufacturing: Factory,
  retail: Store,
  hospitality: Hotel,
  property: Building,
  religious: Church,
  multisite: Network,
} satisfies Record<IndustryIconName, ComponentType<LucideProps>>;

type IndustryIconProps = LucideProps & {
  name: IndustryIconName;
};

export function IndustryIcon({ name, ...props }: IndustryIconProps) {
  const Icon = iconMap[name];

  return <Icon {...props} />;
}
