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
    </Box>
  );
}
