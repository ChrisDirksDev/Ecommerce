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
    <div className={clsx(`bg-white shadow-lg rounded-2xl p-8 w-full max-w-md transition ${onClick ? 'cursor-pointer' : ''}`, className)} onClick={handleClick}>
      {title && <h3 className="mb-4 text-center">{title}</h3>}
      <div>{children}</div>
      {footer && <div className="mt-4 border-t pt-4">{footer}</div>}
    </div>
  );
};

export default Card;
