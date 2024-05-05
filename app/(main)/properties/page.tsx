import { getCurrentUser } from "@/actions/getCurrentUser";
import { getReservations } from "@/actions/getReervatiosn";
import EmptyState from "@/components/EmptyState";
import React from "react";
import TripsClient from "./_components/PropertiesClient";
import ClientOnly from "@/components/ClientOnly";
import { getListings } from "@/actions/getListing";

type Props = {};

export default async function PropertiesPage({}: Props) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title="Unauthorized" subTitle="Please login"></EmptyState>
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length == 0) {
    return (
      <EmptyState
        title="No properties found"
        subTitle="Looks like you have no properites"
      />
    );
  }

  return (
    <ClientOnly>
      <TripsClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
}
