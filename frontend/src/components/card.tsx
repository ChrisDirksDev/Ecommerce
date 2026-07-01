import clsx from "clsx";
import { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const Card = ({ title, children, footer, onClick, className }: CardProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent click event from firing if the user clicks a button or link inside the card
    if ((e.target as HTMLElement).tagName === "BUTTON" || (e.target as HTMLElement).tagName === "A") {
      return;
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={clsx(`surface-panel p-6 w-full transition duration-200 ${onClick ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(47,36,28,0.12)]' : ''}`, className)} onClick={handleClick}>
      {title && <h3 className="mb-4">{title}</h3>}
      <div>{children}</div>
      {footer && <div className="mt-5 border-t border-[var(--color-border)] pt-5">{footer}</div>}
    </div>
  );
};

export default Card;
