import { UserBadge } from "@/app/components/UserBadge";
import { ReactNode } from "react";
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
        <div className="w-full px-4 border-b border-b-gray-200 flex-shrink-0 flex items-center space-x-2">
            {title && <div className="text-2xl font-bold py-2">{title}</div>}
            {leftComponents}
            <div className="flex-1"> </div>
            {rightComponents}
        </div>
    );
}
