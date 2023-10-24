"use client";
import React from "react";
import WatchPartyChat from "@/components/WatchPartyChat";
import WatchPartyPlayer from "@/components/WatchPartyPlayer";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const movie = Object.fromEntries([...searchParams.entries()]);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      }}
    >
      <div
        style={{
          gridColumn: "span 3 / span 3",
        }}
      >
        <WatchPartyPlayer movie={movie} />
      </div>
      <div
        style={{
          gridColumn: "span 1 / span 1",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "25%",
            height: "100%",
          }}
        >
          <WatchPartyChat />
        </div>
      </div>
    </div>
  );
};

export default Page;
