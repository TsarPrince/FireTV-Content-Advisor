import SwipeableTextMobileStepper from "@/components/onboarding/Screens";
import { Container } from "@mui/material";

export default function OnBoarding() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <SwipeableTextMobileStepper />
    </Container>
  );
}
