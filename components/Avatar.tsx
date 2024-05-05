import Image from "next/image";

type Props = {
  src?: string | null;
};

export default function Avatar({ src }: Props) {
  return (
    <Image
      loading="lazy"
      className="rounded-full"
      height="30"
      width="30"
      alt="AVATAR"
      src={src ?? "/images/placeholder.jpg"}
    />
  );
}
