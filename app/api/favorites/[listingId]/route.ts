import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IParams {
  listingId?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const { listingId } = params;
    if (!listingId || typeof listingId !== "string") {
      return new NextResponse("Params not found", { status: 400 });
    }
    let favoritesIds = [...(currentUser.favoritesIds || [])];

    favoritesIds.push(listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoritesIds,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[ERROR_SERVER_FAVORITE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const { listingId } = params;
    if (!listingId || typeof listingId !== "string") {
      return new NextResponse("Params not found", { status: 400 });
    }

    let favoritesIds = [...(currentUser.favoritesIds || [])];

    favoritesIds = favoritesIds.filter((v) => v !== listingId);
    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoritesIds,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[ERROR_SERVER_FAVORITE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
