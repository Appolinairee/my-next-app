"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoLinkExternal } from "react-icons/go";
import { cn } from "@/utils/generalUtils";

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { name: "Utilisateurs", path: "/", target: "_self" },
    { name: "Pays", path: "/countries", target: "_blank" },
    { name: "Crypto", path: "/crypto", target: "_blank" },
  ];

  return (
    <div className="pb-18">
      <nav className="fixed w-full z-50 px-[5%] border-b border-gray-100 bg-white transition-all duration-300 text-[15px]">
        <div className="flex items-center space-x-4 sm:space-x-8">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <div
                key={link.name}
                className={cn(
                  "relative group pt-1",
                  isActive ? "" : "text-gray-700"
                )}
              >
                <Link
                  href={link.path}
                  target={link.target}
                  rel={
                    link.target === "_blank" ? "noopener noreferrer" : undefined
                  }
                >
                  <span className="inline-flex items-center gap-1 py-2 px-1 font-medium  hover:text-black transition-colors duration-200 group">
                    {link.name}
                    {link.target === "_blank" && (
                      <GoLinkExternal className="w-3 h-3" />
                    )}
                  </span>
                </Link>

                <div
                  className={`h-[2px] bg-primary rounded-[10px] absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-100 ${
                    isActive ? "w-[30px]" : "w-0"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
