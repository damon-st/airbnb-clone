import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { useLoginModal } from "./useLoginModal";
import { User } from "@prisma/client";
import toast from "react-hot-toast";

interface IUseFavorite {
  listingId: string;
  currentUser?: User | null;
}

export const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoritesIds ?? [];
    return list.includes(listingId);
  }, [currentUser?.favoritesIds, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      if (!currentUser) return loginModal.onOpen();
      try {
        let request;
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Succes");
      } catch (error) {
        console.log(error);
        toast.error("Something wrong");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};
