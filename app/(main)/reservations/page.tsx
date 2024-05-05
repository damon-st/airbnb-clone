import { getCurrentUser } from "@/actions/getCurrentUser";
import { getReservations } from "@/actions/getReervatiosn";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import ReservationsClient from "./_components/ReservationsClient";

type Props = {};

export default async function ReservationsPage({}: Props) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subTitle="Please login" />;
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length == 0) {
    return (
      <EmptyState
        title="No reservations found"
        subTitle="Looks like you have no resrvations on your properties"
      />
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
