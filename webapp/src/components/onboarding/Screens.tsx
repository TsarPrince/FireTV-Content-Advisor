"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Interests from "./Interests";
import PrivacySettings from "./PrivacySettings";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";

export default function HorizontalNonLinearStepper() {
  const router = useRouter();
  const Screens: { [x: string]: React.FunctionComponent<never> } = {
    "Choose your interests": Interests,
    "Privacy settings": PrivacySettings,
  };

  const steps = Object.keys(Screens);
  const [screenData, setScreenData] = React.useState<(object | null)[]>(
    Array.from({ length: steps.length }, () => null)
  );

  React.useEffect(() => {
    console.log({ genres: screenData[0] });
  });

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const [loading, setLoading] = React.useState<boolean>(false);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleFinish = () => {
    if (completedSteps() === totalSteps() - 1) {
      // const updatedData: Prisma.UserUpdateInput = {
      //   onboardingData: {
      //     create: {
      //       genres: (screenData[0] ?? []) as string[],
      //       // privacySettings: ,
      //     },
      //   },
      // };
      // // Send an api request to update the onboarding details
      // setLoading(true);
      // const response = fetch("/api/user", {
      //   method: "PATCH",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   credentials: "include",
      //   body: JSON.stringify({
      //     updateData: {},
      //   }),
      // });
      // setLoading(false);
      router.push("/dashboard");
    } else handleComplete();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            {React.createElement(Screens[steps[activeStep]], {
              initialData: screenData[activeStep],
              onChange: (data: object) => {
                const newData = [...screenData];
                newData[activeStep] = data;
                setScreenData(newData);
              },
            } as never)}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleFinish} loading={loading}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                  // <Link href={"/recommendations"}>
                  //   <Button>Finish</Button>
                  // </Link>
                ))}
            </Box>
          </>
        )}
      </div>
    </Box>
  );
}
