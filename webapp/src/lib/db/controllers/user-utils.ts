import prisma from "../prisma";
import { getDataFromToken } from "./token.utils";

export async function checkUserOnboarding(token: string) {
  const { email } = getDataFromToken(token);
  const data = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      onboardingData: true,
    },
  });

  const boardingDataPresent = !!data?.onboardingData;

  return boardingDataPresent;
}

export async function getUserFromEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}
