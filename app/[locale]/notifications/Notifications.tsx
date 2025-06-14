import Image from 'next/image';
import React from 'react';
import notificationsCard from '@/public/images/notificationCard.svg';
import date from '@/public/images/date.svg';

// Define the TypeScript interface for notifications
interface Notification {
  id: number;
  title: string;
  date: string;
  description: string;
}

interface NotificationsProps {
  notificationsData: Notification[];
}

const Notifications: React.FC<NotificationsProps> = ({ notificationsData }) => {
  return (
    <div className="   justify-center grid grid-cols-12  lg:justify-start w-full gap-2  lg:mt-10">
      {notificationsData.map((notif) => (
        <div 
          key={notif.id} 
          className="w-full col-span-12 lg:col-span-6  lg:h-[164px] bg-[#f7f7f8] rounded-[14px] p-5"
        >
          <div>
            <div className='flex items-center gap-4'>
              <Image src={notificationsCard} alt='notificationsCard' />
              <div>
                {/* @ts-ignore */}
                <h2 className='text-[#333C52] font-bold'>{notif?.data?.title}</h2>
                <p className='flex gap-1'>
                  <Image src={date} alt='date' />
                  {/* @ts-ignore */}
                  <span className='text-[#7C7C7C]'>{notif.created_at}</span>
                </p>
              </div>
            </div>
            {/* @ts-ignore */}
            <p className='mt-3'>{notif?.data?.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
