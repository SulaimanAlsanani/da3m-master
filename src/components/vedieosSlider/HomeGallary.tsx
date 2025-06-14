'use client';

import React from 'react';
import VedioSlider from './VedioSlider';
import CustomModal from '../shared/reusableComponents/CustomModal';

interface HomeGallaryProps {
  open: boolean;
  items: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeIndex: number;
  sectionIndex: number;
  activeSectionIndexProp?: number;
  pathName: string;
}

const HomeGallary: React.FC<HomeGallaryProps> = ({
  open,
  items,
  setOpen,
  activeIndex,
  sectionIndex,
  activeSectionIndexProp,
}) => {
  const shouldShowModal = activeSectionIndexProp === sectionIndex  && open
  if (!shouldShowModal) return null;

  return (
    <CustomModal
      close
      modalClass="!w-full !h-full !bg-transparent lg:!bg-white"
      className="!w-full lg:!w-[80%] xl:!w-[50%] !h-[95vh] lg:!h-[70%] px-0"
      openCloseModal={setOpen}
    >
      <VedioSlider activeIndex={activeIndex} items={items} />
    </CustomModal>
  );
};

export default HomeGallary;
