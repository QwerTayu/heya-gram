import MainContainer from "@/components/mainContainer";
import React from "react";
import { PiCaretLeftBold } from "react-icons/pi";

function Modal({ open, onClose, children }) {
  return (
    <div className={`
      fixed inset-0 flex justify-center items-center
      transition-colors w-[100%] h-full z-50
      ${open ? "visible" : "invisible"}
      `}
    >
        <MainContainer active='user'>
            <button className="p-2" onClick={onClose}>
                <PiCaretLeftBold size={24}/>
            </button>
            {children}
        </MainContainer>
    </div>
  );
}

export default Modal;
