import { businessConfig } from '../config/business';

interface LogoProps {
  className?: string;
  textClassName?: string;
}

export default function Logo({
  className = "h-12 w-auto",
}: LogoProps) {
  return (
    <img
      src="/logo-transparent.png"
      alt={businessConfig.name}
      className={className}
      referrerPolicy="no-referrer"
    />
  );
}
