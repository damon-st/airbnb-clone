import { getCurrentUser } from "@/actions/getCurrentUser";
import { getListingById } from "@/actions/getListingById";
import EmptyState from "@/components/EmptyState";
import React from "react";
import ListingClient from "./_components/ListingClient";
import { getReservations } from "@/actions/getReervatiosn";

type Props = {
  params: {
    listingId: string;
  };
};

export default async function ListingPage({ params }: Props) {
  const [listing, currentUser, reservations] = await Promise.all([
    getListingById(params),
    getCurrentUser(),
    getReservations(params),
  ]);

  if (!listing) {
    return <EmptyState showRest />;
  }

  return (
    <ListingClient
      reservations={reservations}
      currentUser={currentUser}
      listing={listing}
    />
  );
}
