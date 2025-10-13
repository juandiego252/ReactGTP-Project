import { Outlet } from "react-router-dom";
import { menuRoutes } from "../router/router";
import { SideBarMenuItem } from "../components";
import { Menu, RocketIcon, X } from "lucide-react";
import GitHub from "@/assets/icons/GitHub";
import LinkedIn from "@/assets/icons/LikedIn";
import { useState } from "react";


export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const closeSideBar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div className="min-h-screen w-full px-2 sm:px-4 lg:px-8">
      <main className="flex flex-row mt-4 sm:flex-row sm:mt-7 gap-3">
        <button
          onClick={toggleSideBar}
          className="sm:hidden fixed top-4 left-4 z-40 p-2 bg-white/10 rounded-lg backdrop-blur-sm"
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? (<X size={24} className="text-white" />) : (<Menu size={24} className="text-white" />)
          }
        </button>
        {isSidebarOpen && (
          <div
            className="sm:hidden fixed inset-0 bg-black/50 z-40 transition-all"
            onClick={closeSideBar} />
        )}
        <nav
          className={`
          fixed sm:relative
          top-0 left-0
          w-[280px] sm:w-[370px]
          h-full sm:h-[calc(100vh-3.0rem)]
          bg-white/10 backdrop-blur-md
          p-5 rounded-r-3xl sm:rounded-3xl
          transform transition-transform duration-300 ease-in-out
          z-40
          overflow-y-auto custom-scrollbar
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          sm:translate-x-0 sm:flex flex-col ml-0 sm:ml-5`}>

          {/* Header */}
          <div className="flex-shrink-0">
            <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 bg-clip-text text-transparent">
              Penguin GPT<span className="text-[#c2ff0d]">.</span>
            </h1>
            <span className="text-xl">Bienvenido</span>
            <div className="border-neutral-500 border my-3" />
          </div>

          {/* Opciones del menú */}
          {
            <div className="flex-1 space-y-2 min-h-0 overflow-y-auto">
              {menuRoutes.map(option => (
                <SideBarMenuItem key={option.to} {...option} />
              ))}
            </div>
          }
          <div className="shrink-0 border-2 border-[#c2ff0d] rounded-lg p-4 mt-4 flex flex-col items-center gap-2">
            <span className="text-sm font-medium text-center">
              Nuevas funcionalidades en desarrollo!
            </span>
            <RocketIcon size={50} className="text-[#c2ff0d]" />
          </div>

          {/* Contact icons section */}
          <div className="shrink-0 mt-4 pt-5 pb-10 flex justify-center gap-4">
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
    </div>
  );
};