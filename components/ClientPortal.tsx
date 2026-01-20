"use client";
import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ClientPortalProps {
  children: ReactNode;
  selector: string; // El id del div que creamos en el layout ('#modal-root')
}

export default function ClientPortal({ children, selector }: ClientPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Solo renderiza el portal si estamos en el cliente y el selector existe
  return mounted ? createPortal(children, document.querySelector(selector)!) : null;
}