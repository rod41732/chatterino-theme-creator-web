import { ReactNode } from "react";
import Link from "next/link";

interface TopbarProps {
    title?: string;
    leftComponents?: ReactNode;
    rightComponents?: ReactNode;
}

export function Topbar({
    title,
    leftComponents,
    rightComponents,
}: TopbarProps) {
    return (
        <div className="w-full px-4 border-b border-b-gray-200 flex-shrink-0 flex items-center h-12">
            <Link href="/">
                <img
                    src="/logo.webp"
                    width="36"
                    height="36"
                    alt="logo"
                    className="mr-2"
                />
            </Link>
            {title && (
                <div className="text-2xl leading-none font-bold py-2 flex-shrink-0">
                    {title}
                </div>
            )}
            {leftComponents}
            <div className="flex-1"> </div>
            {rightComponents}
        </div>
    );
}
