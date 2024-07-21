import React from "react";
import Header from "@/components/Header";
import WatchList from "@/components/WatchList";

export default function CoinsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen flex flex-col">
      <Header />
      <div className="flex">
        <div className="w-full p-4 sm:w-2/3">{children}</div>
        <div className="w-1/3 p-4 hidden sm:block ">
          <div className="sticky top-24 right-5">
            <WatchList />
          </div>
        </div>
      </div>
    </section>
  );
}
