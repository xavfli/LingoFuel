import { Fuel } from 'lucide-react';
import type { SVGProps } from 'react';

interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function Logo({ size = 32, className, ...props }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <Fuel className={className} size={size} color="hsl(var(--primary))" {...props} />
      <span className="text-2xl font-bold text-primary">
        LingoFuel
      </span>
    </div>
  );
}
