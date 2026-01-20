"use client";
import { useState, ReactElement, cloneElement } from "react";
import Modal from "./Modal";

interface Props {
  trigger: ReactElement; // Aquí recibes el botón
  title: string;
  children: React.ReactNode; // Contenido del modal
}

export default function ModalWrapper({ trigger, title, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // Clonamos el botón para inyectarle el evento onClick sin que el padre sepa nada
  const triggerWithProps = cloneElement(trigger, {
    onClick: () => setIsOpen(true),
  });

  return (
    <>
      {triggerWithProps}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
        {children}
      </Modal>
    </>
  );
}