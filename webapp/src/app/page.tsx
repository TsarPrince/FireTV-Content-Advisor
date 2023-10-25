import * as React from "react";
import Box from "@mui/material/Box";
import GDSCHeader from "@/components/FireTVHeader";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const metadata = {
  title: "Home | Content Advisor",
  description: "Fire TV Content Advisor",
};

export default async function HomePage() {
  const c = cookies();
  const token = c.get("token");

  if (!token) {
    redirect("/signin");
  } else {
    redirect("/recommendations");
  }

  return (
    <Box
      sx={{
        display: "grid",
        width: "80%",
        height: "80%",
        gridTemplateRows: "auto 1fr",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        gap: "2rem",
      }}
    >
      <GDSCHeader />
    </Box>
  );
}
