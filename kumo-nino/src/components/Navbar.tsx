"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dog, Home, Calendar, User, Settings, DoorClosed } from "lucide-react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const paginas = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <Home className="w-6 h-6 text-[#302F2C]" />,
    },
    {
      name: "Mis Mascotas",
      link: "/canines",
      icon: <Dog className="w-6 h-6 text-[#302F2C]" />,
    },
    {
      name: "Asistencia",
      link: "/asistencia",
      icon: <Calendar className="w-6 h-6 text-[#302F2C]" />,
    },
  ];

  const userOptions = [
    {
      name: "Profile",
      link: "/profile",
      icon: <User className="w-6 h-6 text-[#302F2C]" />,
    },
    {
      name: "Settings",
      link: "/settings",
      icon: <Settings className="w-6 h-6 text-[#302F2C]" />,
    },
    {
      name: "Logout",
      link: "/login",
      icon: <DoorClosed className="w-6 h-6 text-[#302F2C]" />,
    },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-[#CBB89D]/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-[#D9B778] p-2 rounded-xl">
              <Dog className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#302F2C]">PawCare</h1>
              <p className="text-sm text-[#302F2C]/70">Bienvenida</p>
            </div>
          </div>

          <nav className="flex space-x-1">
            {paginas.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.link}
                  className="w-full rounded-lg text-left px-4 py-2 text-sm text-[#302F2C] hover:bg-[#CBB89D]/20 flex items-center"
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              </li>
            ))}
          </nav>

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full focus:outline-none focus:ring-2 focus:ring-[#D9B778]"
            >
              <Image
                src="/profile_photo.jpg"
                alt="logo kumo-nino"
                width={50}
                height={50}
                className="rounded-full"
              />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#CBB89D]/20 z-50 px-4 py-2">
                <ul className="py-2">
                  {userOptions.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.link}
                        className="w-full rounded-lg text-left px-4 py-2 text-sm text-[#302F2C] hover:bg-[#CBB89D]/20 flex items-center"
                      >
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
