import prisma from "@/lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export const getFavoriteListings = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoritesIds ?? [])],
        },
      },
    });
    return favorites;
  } catch (error) {
    return [];
  }
};
