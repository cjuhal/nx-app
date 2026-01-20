"use client";

import { ReactElement, cloneElement, useState } from "react";
import Modal from "./Modal";

interface Props {
  trigger: ReactElement<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  >;
  title: string;
  children: React.ReactNode;
}

export default function ModalWrapper({ trigger, title, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

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
