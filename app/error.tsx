"use client";
import EmptyState from "@/components/EmptyState";
import React, { useEffect } from "react";

type Props = {
  error: Error;
};

export default function ErrorPage({ error }: Props) {
  useEffect(() => {
    console.log("[ERROR_PAGE]", error);
  }, [error]);

  return <EmptyState title="Uh Oh" subTitle="Something went wrong" />;
}
