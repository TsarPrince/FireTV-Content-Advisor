import { Box } from "@mui/material";
import FireTVLogo from "./FireTVLogo";

export default function GDSCHeader() {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        padding: "1rem",
        gap: "2.5rem",
      }}
    >
      <FireTVLogo />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <h1 style={{ margin: 0 }}>Leaderboard 2023-24</h1>
        <h3 style={{ margin: 0, opacity: 0.9 }}>Fire TV</h3>
      </Box>
    </Box>
  );
}
