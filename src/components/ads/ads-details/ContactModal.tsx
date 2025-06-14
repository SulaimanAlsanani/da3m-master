import React from "react";
import closeModal from '@/public/images/close-modal.svg';
import Image from "next/image";
import contactPhone from '@/public/images/contact-phone.svg';
import contactTwitter from '@/public/images/contact-twitter.svg';
import contactFacebook from '@/public/images/contact-facebook.svg';
import contactInstegram from '@/public/images/contact-integram.svg';
import contactSnap from '@/public/images/contact-snap.svg';
import contactWhatsapp from '@/public/images/contact-whatsapp.svg';
import MainLink from "@/components/shared/formcomponents/MainLink";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    socials:{id:string,type:string, link:string, name:string}[]
};

const ContactModal = ({socials, isOpen, onClose }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#9F7A32]/[0.31] z-[9999] p-4">
            <div className="bg-white w-full max-w-[513px] p-6 rounded-lg relative flex flex-col items-center justify-center">
            <div className="absolute -top-2 cursor-pointer -right-1 bg-white w-[40px] h-[40px] rounded-full border-[3px] flex items-center justify-center border-[#DFD4BD]" onClick={onClose}>
                    <Image src={closeModal} alt="closeModal" />
                </div>  
                <div className="text-center mb-8">
                    <h2 className="text-[#333C52] font-bold text-[24px]">تواصل مع المعلن</h2>
                    <p className="text-sm text-[#909090] mt-1">يمكنك التواصل مع المعلن عبر الوسائل التالية</p>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    {
                    
                    // [{ img: contactPhone, text: "+966 551201489500" },
                    //   { img: contactTwitter, text: "ziad_abdalla732" },
                    //   { img: contactFacebook, text: "ziad_abdalla732" },
                    //   { img: contactInstegram, text: "ziad_abdalla732" },
                    //   { img: contactSnap, text: "ziad_abdalla732" },
                    //   { img: contactWhatsapp, text: "ziad_abdalla732" }]
                      
                    socials.length >0 ?  socials?.map((item, index) => (
                        <a  target="_blank" href={item.type === "whatsapp" ? `https://wa.me/${item.link}` :item?.link} key={index} className="bg-[#f9f9fa] w-full max-w-[417px] rounded-[14px] px-5 h-[51px] flex items-center gap-3">
                            <Image src={
                                item.type === "facebook"? contactFacebook : item.type ==="twitter"? contactTwitter : item.type === "instagram"? contactInstegram : item.type === "snapshat"? contactSnap : item.type === "whatsapp"? contactWhatsapp : contactPhone
                            } className="w-[22px] h-[22px]" alt="contactIcon" />
                            <h3 className="text-[14px] text-[#333C52]" dir="ltr">{item.name}</h3>
                        </a>
                    )) :(<div className="font-bold text-primary text-center" >No Data founded.</div>)}
                </div>
            </div>
        </div>
    );
};

export default ContactModal;