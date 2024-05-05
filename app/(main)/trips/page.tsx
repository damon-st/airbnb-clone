import { getCurrentUser } from "@/actions/getCurrentUser";
import { getReservations } from "@/actions/getReervatiosn";
import EmptyState from "@/components/EmptyState";
import React from "react";
import TripsClient from "./_components/TripsClient";
import ClientOnly from "@/components/ClientOnly";

type Props = {};

export default async function TrisPage({}: Props) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title="Unauthorized" subTitle="Please login"></EmptyState>
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length == 0) {
    return (
      <EmptyState
        title="No trips found"
        subTitle="Looks like you havent reserverd any trips"
      />
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
}
