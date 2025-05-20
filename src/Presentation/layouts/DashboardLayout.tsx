import { Outlet } from "react-router-dom";
import { menuRoutes } from "../router/router";
import { SideBarMenuItem } from "../components";
import { RocketIcon } from "lucide-react";
import GitHub from "@/assets/icons/GitHub";
import LinkedIn from "@/assets/icons/LikedIn";


export const DashboardLayout = () => {
  return (
    <main className="flex flex-row mt-7">
      <nav className="hidden sm:flex flex-col ml-5 w-[370px] min-h-[calc(100vh-3.0rem)] bg-white/10 p-5 rounded-3xl">
        <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 bg-clip-text text-transparent">
          Penguin GPT<span className="text-indigo-500">.</span>
        </h1>
        <span className="text-xl">Bienvenido</span>

        <div className="border-neutral-500 border my-3" />
        {/* Opciones del menú */}
        {
          <div className="space-y-2">
            {menuRoutes.map(option => (
              <SideBarMenuItem key={option.to} {...option} />
            ))}
          </div>
        }
        <div className="border-2 border-[#c2ff0d] rounded-lg p-4 mt-12 flex flex-col items-center gap-2">
          <span className="text-sm font-medium text-center">
            Nuevas funcionalidades en desarrollo!
          </span>
          <RocketIcon size={50} className="text-[#c2ff0d]" />
        </div>

        {/* Contact icons section */}
        <div className="mt-auto pt-5 flex justify-center gap-4">
          <a
            href="https://github.com/juandiego252/ReactGTP-Project.git"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            className="p-2"
          >
            <GitHub fontSize={25} className="text-white/80 hover:text-white" />
          </a>
          <a
            href="https://linkedin.com/in/devjuandiego"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2"
          >
            <LinkedIn fontSize={25} className="text-white/80 hover:text-white" />
          </a>
        </div>
      </nav>

      <section className="mx-3 sm:mx-20 flex flex-col w-full h-[calc(100vh-50px)] bg-white/10 p-5 rounded-3xl">
        <div className="flex flex-row h-full">
          <div className="flex flex-col flex-auto h-full p-1">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
};