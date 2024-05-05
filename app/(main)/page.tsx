import { getCurrentUser } from "@/actions/getCurrentUser";
import { getListings, IListingsParms } from "@/actions/getListing";
import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listings/ListingCard";

interface HomeProps {
  searchParams: IListingsParms;
}

export default async function Home({ searchParams }: HomeProps) {
  const [listings, currentUser] = await Promise.all([
    getListings(searchParams),
    getCurrentUser(),
  ]);
  if (listings.length === 0) {
    return <EmptyState showRest />;
  }
  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
