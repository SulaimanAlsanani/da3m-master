
import localFont from 'next/font/local';

const myCustomFont = localFont({
  src: [
    {
      path: './29ltbukralight.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './29ltbukraregular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './29ltbukrabold.ttf',
      weight: '700',
      style: 'normal',
    },
  
  ],
  variable: '--font-myCustomFont', // Optional for Tailwind integration
  display: 'swap',
});

export default myCustomFont;
