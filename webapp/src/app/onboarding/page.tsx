import SwipeableTextMobileStepper from "@/components/onboarding/Screens";
import { Container } from "@mui/material";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { checkUserOnboarding } from "@/lib/db/controllers/user-utils";
import { isTokenValid } from "@/lib/db/controllers/token.utils";

export default async function OnBoarding() {
  const c = cookies();
  const token = c.get("token");

  // Check if the user is logged in already
  if (!token) {
    redirect("/signin");
  } else {
    // Check if the token is valid
    const tokenIsValid = await isTokenValid(token.value);
    if (tokenIsValid) {
      // Check user onboarding
      const hasCompletedOnboarding = await checkUserOnboarding(token.value);
      if (hasCompletedOnboarding) {
        redirect("/recommendations");
      }
    } else {
      // Token isn't valid, clear the cookies and redirect to signin
      c.delete("token");
      redirect("/signin");
    }
  }

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
