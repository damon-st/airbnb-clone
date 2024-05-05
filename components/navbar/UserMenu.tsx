"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { useLoginModal } from "@/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRentModal } from "@/hooks/useRentModal";
import { useRouter } from "next/navigation";
type Props = {
  currentUser?: User | null;
};

export default function UserMenu({ currentUser }: Props) {
  const router = useRouter();
  const { onOpen } = useRegisterModal();
  const { onOpen: onOpenLogin } = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);
  const rentModal = useRentModal();
  const toggleOpen = useCallback(() => {
    setIsOpen((v) => !v);
  }, []);
  const logout = () => {
    signOut();
  };

  const onRent = useCallback(() => {
    if (!currentUser) {
      return onOpenLogin();
    }
    //open rent modal
    rentModal.onOpen();
  }, [currentUser, onOpenLogin, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block  text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="My reservations"
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="My properties"
                />
                <MenuItem onClick={onRent} label="Airbnb my home" />
                <MenuItem onClick={logout} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={onOpenLogin} label="Login" />
                <MenuItem onClick={onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
