import { BiLoader } from "react-icons/bi";

export default function Loader() {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center w-full">
      <BiLoader size={70} className="text-rose-500 animate-spin" />
    </div>
  );
}
