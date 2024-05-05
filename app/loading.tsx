import { BiLoader } from "react-icons/bi";

export default function Loading() {
  return (
    <div className="size-full flex items-center justify-center">
      <BiLoader size={100} className="text-rose-500 animate-spin" />
    </div>
  );
}
