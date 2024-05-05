import prisma from "@/lib/prismadb";

interface IParams {
  listingId?: string;
}
export const getListingById = async (params: IParams) => {
  try {
    const { listingId } = params;
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });
    if (!listing) {
      return null;
    }
    return listing;
  } catch (error) {
    console.log("[ERROR_getListingById]", error);
    return null;
  }
};
