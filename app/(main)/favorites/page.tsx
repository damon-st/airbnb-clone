import { getCurrentUser } from "@/actions/getCurrentUser";
import { getFavoriteListings } from "@/actions/getFavoritesListing";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import FavoritesClient from "./_components/FavoritesClient";

export default async function FavoritePage() {
  const [favorites, currentUser] = await Promise.all([
    getFavoriteListings(),
    getCurrentUser(),
  ]);
  if (favorites.length == 0) {
    return (
      <EmptyState
        title="Not favorites found"
        subTitle="Looks like you have no favorite listings"
      />
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={favorites} currentUser={currentUser} />
    </ClientOnly>
  );
}
