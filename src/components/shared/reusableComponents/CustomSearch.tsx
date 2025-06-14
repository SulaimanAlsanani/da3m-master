import { useTranslations } from "next-intl";
import Image from "next/image";

type Props = {
  setIsclicked?: (value: boolean) => void;
  isClicked?: boolean;
  lang?: "ar" | "en";
  isMobile?: boolean;
  className?: string;
  parentClass?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Customsearch = ({ setIsclicked, isClicked, onChange, lang,parentClass, isMobile, className }: Props) => {
  const t = useTranslations("navbar");
  return (
    <div className={`relative   w-full lg:w-[180px] ${parentClass&&parentClass} `}>
      <label htmlFor="Search" className="sr-only"></label>

      <input
        type="search"
        id="Search"
        placeholder={t("search")}
        onChange={onChange}
        className={`rounded-[10px]  h-full w-full  bg-white !text-black  focus:outline-none border-[1px] border-[#EBEBEB] border-solid  ps-[34px] pe-[6px] py-[4px]  md:py-[12px]  sm:text-sm ${className&&className}`}
      />

      <span className="absolute inset-y-0 start-0 grid w-10 place-content-center">
        <div  className="text-gray-600 hover:text-gray-700 ">
          <span className="sr-only">Search</span>

          <Image width={20} height={20} src="/images/search.svg" alt="icons" />
        </div>
      </span>
      {!isMobile && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          className={`absolute top-[50%]  transform translate-y-[-50%] cursor-pointer hidden md:block ${
            lang == "ar" ? "left-4" : "right-4"
          }`}
          onClick={() => setIsclicked && setIsclicked(!isClicked)}
        >
          <path
            fill="#D6C6A7"
            d="M9.043 5.793L2.836 12l6.207 6.207l1.414-1.414L5.664 12l4.793-4.793zm5.914 12.414L21.164 12l-6.207-6.207l-1.414 1.414L18.336 12l-4.793 4.793z"
          />
        </svg>
      )}
    </div>
  );
};

export default Customsearch;
