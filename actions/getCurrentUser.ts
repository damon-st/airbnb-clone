import { auth } from "@/auth";

import prisma from "@/lib/prismadb";

export async function getSession() {
  return await auth();
}

export async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (error) {
    console.log("[ERROR_getCurrentUser]", error);
    return null;
  }
}
