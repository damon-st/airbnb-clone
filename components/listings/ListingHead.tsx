import useCountries from "@/hooks/useCountries";
import { User } from "@prisma/client";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "./HeartButton";

type Props = {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: User | null;
};

export default function ListingHead({
  id,
  imageSrc,
  locationValue,
  title,
  currentUser,
}: Props) {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
}
