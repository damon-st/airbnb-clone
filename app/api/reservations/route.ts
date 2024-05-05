import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const { listingId, startDate, endDate, totalPrice } = await req.json();

    if (!listingId || !startDate || !endDate || !totalPrice) {
      return NextResponse.error();
    }

    const likstingAndReservations = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });
    return NextResponse.json(likstingAndReservations);
  } catch (error) {
    console.log("[ERROR_RESERVATIONS_API_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
