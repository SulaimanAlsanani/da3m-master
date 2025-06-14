import React, { useEffect, useState } from 'react';
import { TfiClose } from "react-icons/tfi";

type ModalProps ={
    children: React.ReactNode
    title?: string
    className?:string
    modalClass?:string
    openCloseModal: React.Dispatch<React.SetStateAction<boolean>>,
    close?: boolean
   
}

const CustomModal = (props: ModalProps) => {
    const closeModal = () => {
        props.openCloseModal((prevState) => !prevState);
        
        
    };
    return (
        <>
            <div onClick={(e)=>{
                e.stopPropagation();
                closeModal()
            }}   id="crud-modal" data-aos-duration="1000" data-aos="zoom-in"    aria-hidden="true" className="fixed top-0 right-0 left-0 w-full z-[888] flex justify-center items-center  h-[100%] bg-gray-800 bg-opacity-80">
             <div onClick={e => e.stopPropagation()} className={`  flex justify-center ...`}>
  {/* Button is outside here */}
              {props.close && <button onClick={closeModal} className="hidden lg:flex w-fit absolute top-[100px] z-[999]  !right-[100px] items-center  mb-3 "><TfiClose className="size-10 " /></button>}
</div>
                <div   onClick={(e) => e.stopPropagation()} className={`relative p-4 flex justify-center  flex-col w-[40%]  !h-[70vh]   max-h-[100%] ${props.className} `}>
            
                    <div  className={`relative w-full flex flex-col  bg-white overflow-x-auto h-auto rounded-[8px] p-4  shadow dark:bg-gray-700 ${props.modalClass&&props.modalClass}`}>
                        
                    {props.close && <button onClick={closeModal} className="flex lg:hidden w-full items-center justify-center mb-3 "><TfiClose className="size-10 " /></button>}

                        {props.children}
                      
                    
                    </div>
                </div>


            </div>
        </>
    );
};

export default CustomModal;
