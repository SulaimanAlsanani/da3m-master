import React from 'react';
import Container from '../shared/formcomponents/Container';
import discount from '@/public/images/kindgom-discount.png';
import Image from 'next/image';
import KingdomDiscountsCards from './KingdomDiscountsCards';

const KingdomDiscounts = () => {
    return (
        <Container>
            <div className="flex flex-wrap sm:flex-nowrap justify-between items-center w-full gap-3 sm:gap-5">
                <div className="flex items-center gap-3 sm:gap-5 w-full sm:w-auto justify-center sm:justify-start">
                    <Image src={discount} alt="discount" />
                    <span className="text-[28px] sm:text-[33px] text-[#9F7A32] font-bold text-center sm:text-right">
                        تخفيضات المملكة
                    </span>
                </div>
                <div className="w-full sm:w-auto flex justify-center">
                    <button className="w-full sm:w-[285.47px] h-[61px] flex justify-center items-center bg-[#9F7A32] rounded-[14px] text-white">
                        عرض جميع التخفيضات
                    </button>
                </div>
            </div>
            <KingdomDiscountsCards/>
        </Container>
    );
}

export default KingdomDiscounts;
