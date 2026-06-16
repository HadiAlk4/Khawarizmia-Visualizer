import {clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps { children?: React.ReactNode, className?: string, footer?: React.ReactNode, footerClassName?: string }

const Card = ({ 
    children = <p className= "text-gray-400"> default card component </p>, 
    className, 
    footer = <p className= "text-gray-400"> default footer component </p>,
    footerClassName,

    } : CardProps) => {

    const defaultStyle = "flex flex-col bg-white border border-gray-400 p-6 rounded-lg shadow-md";
    const defaultFooterStyle = "mt-auto pt-4 border-t border-gray-100 text-sm";

    return (
        <div 
        className={cn(defaultStyle, className)}>
            <div className="flex-1">
            {children}
        </div>

        <footer className={cn(defaultFooterStyle, footerClassName)}> 
            <div>
            {footer}
            </div>
        </footer>

        </ div>
    );
};

export default Card;