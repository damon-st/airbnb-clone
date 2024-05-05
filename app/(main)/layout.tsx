import { getCurrentUser } from "@/actions/getCurrentUser";
import ClientOnly from "@/components/ClientOnly";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SearchModal";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default async function LayoutMain({ children }: Props) {
  const currentUser = await getCurrentUser();
  return (
    <main className="size-full">
      <Navbar currentUser={currentUser} />
      <ClientOnly>
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <SearchModal />
      </ClientOnly>
      <div className="pb-20 pt-28">{children}</div>
    </main>
  );
}
