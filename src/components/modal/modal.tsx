import "./modal.css";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

export default function Modal({
  children,
  onOpenChange,
  open,
}: {
  readonly children: ReactNode;
  open?: boolean;
  onOpenChange?: (b: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(open);
  const modal = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        setIsOpen(false);
        if (onOpenChange) onOpenChange(false);
      }
    },
    [onOpenChange]
  );

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (modal.current && !modal.current.contains(e.target as Node)) {
        setIsOpen(false);
        if (onOpenChange) onOpenChange(false);
      }
    },
    [onOpenChange]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    isOpen && (
      <div id="modal">
        <article style={{ overflowY: "scroll", height: "100vh" }} ref={modal}>
          {children}
        </article>
      </div>
    )
  );
}
