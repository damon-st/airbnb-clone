"use client";

import { Toaster } from "react-hot-toast";
import ClientOnly from "../ClientOnly";

export default function ToastProvider() {
  return (
    <ClientOnly>
      <Toaster />
    </ClientOnly>
  );
}
