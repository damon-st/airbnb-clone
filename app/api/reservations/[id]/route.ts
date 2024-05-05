import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
type IParams = {
  id: string;
};

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const { id } = params;

    if (!id || typeof id !== "string") {
      return NextResponse.error();
    }

    const reservation = await prisma.reservation.deleteMany({
      where: {
        id,
        OR: [
          {
            userId: currentUser.id,
          },
          {
            listing: {
              userId: currentUser.id,
            },
          },
        ],
      },
    });
    return NextResponse.json(reservation);
  } catch (error) {
    console.log("[ERROR_RESERVATION_DELETEE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
