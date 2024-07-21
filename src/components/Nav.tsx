"use client";

import { Home, TrendingUp, Compass, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();
  const navItems = [
    { icon: Home, href: "/", label: "Home" },
    { icon: TrendingUp, href: "/coins/trending", label: "Trending" },
    { icon: Compass, href: "/coins/explore", label: "Explore" },
    { icon: Star, href: "/coins/watchlist", label: "Watchlist" },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 sm:relative sm:bottom-auto sm:left-auto sm:transform-none bg-primary-foreground rounded-full sm:rounded-md shadow-lg px-6 py-3 z-50 ">
      <ul className="flex space-x-8">
        {navItems.map(({ icon: Icon, href, label }) => (
          <li key={href}>
            <Link href={href} className="flex flex-col items-center group">
              <Icon
                size={24}
                className={`${
                  pathname === href ? "text-blue-400" : "text-gray-400"
                } group-hover:text-blue-400 transition-colors`}
              />
              <span className="text-xs mt-1 sm:hidden">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
