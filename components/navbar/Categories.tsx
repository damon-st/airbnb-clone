"use client";
import React from "react";
import Container from "@/components/Container";
import { categories } from "@/lib/common/categories";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {};

export default function Categories({}: Props) {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathName = usePathname();
  const isMainPage = pathName === "/";
  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            selected={item.label == category}
            key={item.label}
            label={item.label}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
}
