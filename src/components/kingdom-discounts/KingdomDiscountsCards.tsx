import React from "react";
import Card from "../shared/Card";
import kingdom from "@/public/images/kingdom.jpg";

const KingdomDiscountsCards: React.FC = () => {
    return (
        <div className="flex flex-wrap justify-center items-center lg:gap-2 gap-10 mt-10">
            <Card
                image={kingdom.src}
                title="امتلك وحدتك العقارية في مشروع التعمير"
                name="سلطان الفايز"
                date="05 مايو 2025"
                rating="4.6"
            />
            <Card
                image={kingdom.src}
                title="فرصةفرصةفرصة مميزة في مشروع التعمير"
                name="محمد خالد"
                date="12 يونيو 2025"
                rating="4.8"
            />
            <Card
                image={kingdom.src}
                title="احجز وحدتك الآن بأفضل الأسعار"
                name="أحمد الزهراني"
                date="20 يوليو 2025"
                rating="4.9"
            />
            <Card
                image={kingdom.src}
                title="احجز وحدتك الآن بأفضل الأسعار"
                name="أحمد الزهراني"
                date="20 يوليو 2025"
                rating="4.9"
            />
        </div>
    );
};

export default KingdomDiscountsCards;
