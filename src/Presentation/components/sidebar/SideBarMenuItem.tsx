import React from "react";
import { NavLink, useLocation } from "react-router-dom"

interface Props {
    to: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}
export const SideBarMenuItem = ({ description, icon, title, to }: Props) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
        <NavLink
            key={to}
            to={to}
            className={
                ({ isActive }) => isActive ? "flex justify-center items-center bg-neutral-700/100 rounded-md p-2 transition-colors"
                    : "flex justify-center items-center hover:bg-neutral-700/100 rounded-md p-2 transition-colors"
            }
        >
            <div className="mr-4 text-[#c2ff0d]">
                {icon}

            </div>
            <div className="flex flex-col flex-grow">
                <span className={`text-lg ${isActive ? "text-white font-semibold" : "text-white"}`}>
                    {title}
                </span>
                <span className="text-gray-300 text-sm">
                    {description}
                </span>
            </div>
        </NavLink>
    )
}
