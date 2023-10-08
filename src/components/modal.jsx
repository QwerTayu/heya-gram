import MainContainer from "@/components/mainContainer";
import React from "react";
import { PiCaretLeftBold } from "react-icons/pi";

function Modal({ open, onClose, children, title }) {
    return (
        <div className={`
            fixed inset-0 flex justify-center items-center
            transition-colors w-[100%] h-full z-50
            ${open ? "visible" : "invisible"}
            `}
        >
            <MainContainer active='user'>
                <div className="flex gap-3">
                    <button className="p-2" onClick={onClose}>
                        <PiCaretLeftBold size={24}/>
                    </button>
                    <div className="flex flex-col justify-center font-bold">
                        {title}
                    </div>
                </div>
                <div className="px-3" >
                    {children}
                </div>
            </MainContainer>
        </div>
    );
}

export default Modal;
