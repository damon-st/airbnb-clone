import Heading from "./Heading";
import Button from "./Button";
import Link from "next/link";

type Props = {
  title?: string;
  subTitle?: string;
  showRest?: boolean;
};

export default function EmptyState({
  showRest,
  subTitle = "Try changing or removing some of your filters",
  title = "No exact matches",
}: Props) {
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subTitle} center />
      <div className="w-48 mt-4 ">
        {showRest && (
          <Link href={"/"}>
            <Button outline label="Remove all filters" />
          </Link>
        )}
      </div>
    </div>
  );
}
