import Image from "next/image";
import { Icon } from "@iconify/react";
import MainLink from "@/components/shared/formcomponents/MainLink";
import Container from "@/components/shared/formcomponents/Container";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

type SocialLinks = {
  instagram: string;
  snapchat: string;
  whatsapp: string;
  facebook: string;
  tiktok: string;
};

type SettingsData = {
  notifications_count: number;
  notify: boolean;
  mobile: string;
  email: string;
  logo: string;
  socials: SocialLinks;
  footer_logo: string;
  favicon: string;
};

const Footer = async ({ footerData }: { footerData: SettingsData }) => {
  console.log("footerData from foooter", footerData);
  const socials: SocialLinks = footerData.socials || {};

  const t = await getTranslations("footer");
  const mainLinks = [
    {
      href: "/#sections",
      text: t("sections"),
    },
    {
      href: "/join-us",
      text: t("join_us"),
    },
    {
      href: "/#services",
      text: t("services"),
    },
    {
      href: "/ads",
      text: t("ads"),
    },
    {
      href: "/#contactUs",
      text: t("get_in_touch"),
    },
    {
      href: "/policy",
      text: t("privacy_policy"),
    },
  ];
  const legalLinks = [
    {
      href: `mailto:${footerData?.email}` || "/",
      text: t("via_email"),
    },

    {
      href: ` https://wa.me/${footerData?.mobile}` || "/",
      text: t("via_phone"),
    },
    {
      href: `mailto:${footerData?.email}` || "/",
      text: footerData?.email || "info@example.com",
    },
    {
      href: `https://wa.me/${footerData?.mobile}` || "/",
      text: footerData?.mobile || "+966 51200154892",
    },
  ];
  const mobile = [
    {
      href: `mailto:${footerData?.email}` || "/",
      text: t("via_email"),
    },

    
    {
      href: `mailto:${footerData?.email}` || "/",
      text: footerData?.email || "info@example.com",
    },
    {
      href: ` https://wa.me/${footerData?.mobile}` || "/",
      text: t("via_phone"),
    },
    {
      href: `https://wa.me/${footerData?.mobile}` || "/",
      text: footerData?.mobile || "+966 51200154892",
    },
  ];

  const socialMedia = [
    {
      href: socials.facebook,
      icon: "meteor-icons:facebook",
      name: "Facebook",
    },
    {
      href: socials.instagram,
      icon: "hugeicons:instagram",
      name: "Instagram",
    },
    {
      href: socials.tiktok,
      icon: "ix--tiktok-logo",
      name: "Tiktok",
    },
    {
      href: socials.snapchat,
      icon: "mdi:snapchat",
      name: "Snapchat",
    },
    {
      href: `https://wa.me/${socials.whatsapp}`,
      icon: "ic:twotone-whatsapp",
      name: "Whatsapp",
    },
  ];

  return (
  <> 
   <a className=" absolute bottom-[50px] lg:bottom-[120px] xl:bottom-[150px]   rtl:start-5 z-[9999999999999]" href=
   {`https://wa.me/${socials.whatsapp}`}>
    <Icon  icon="stash:social-whatsapp-solid" className="fixed cursor-pointer logo-loading hover:!opacity-100  text-[green]  size-[60px] lg:[70px] xl:size-[90px]"/>

    </a>
  
   <footer className="imageFooter  pt-[60px] md:pt-[120px] mt-[45px] lg:mt-[100px]  text-white relative">
  <Image
    src="/images/footer-logo.png"
    alt="logo"
    width={170}
    height={170}
    className="w-[90px] h-[90px] md:w-[130px] md:h-[130px] lg:w-[170px] lg:h-[170px] absolute  right-[50%] top-[-30px] lg:top-[-65px] translate-x-1/2"
  />
  <Container className="!py-4 space-y-[30px]">
    <div className="grid grid-cols-1 md:grid-cols-5   lg:gap-0">
      {/* Main Links */}
      <div className="mb-8 md:mb-0 md:mx-5 col-span-5 lg:col-span-3 grid grid-cols-3 gap-2 lg:gap-7">
        <h3 className="text-[18px] font-bold col-span-3">
          {t("important_links")}
        </h3>
        <ul className="  col-span-3 grid grid-cols-3 gap-2 lg:gap-6">
          {mainLinks?.map((link, index) => (
            <li
              key={link?.href && index}
              className="flex items-center gap-2"
            >
              <Image
                src="/images/Ellipse.svg"
                alt="bullet"
                width={14}
                height={14}
              />
              <MainLink
                href={link?.href || "/"}
                className="text-[14px] col-span-1 "
              >
                {link?.text}
              </MainLink>
            </li>
          ))}
        </ul>
      </div>
      <div className=" md:mx-5 flex flex-col  lg:hidden justify-center  m-auto w-full   gap-4 lg:gap-7">
        <h3 className=" text-center col-span-12 text-[18px] font-semibold   ">
          {t("contact_us")}
        </h3>

        


        <ul className=" grid w-full  grid-cols-12 gap-2 lg:gap-6">
          {mobile?.map((link, index) => (
            <li
              key={link?.href && index}
              className="flex justify-center w-full col-span-12 lg:justify-start items-center gap-2"
            >
              {index == 0 && (
                <Image
                  src="/images/email.svg"
                  alt="email"
                  width={24}
                  height={24}
                />
              )}
              {index == 2 && (
                <Image
                  src="/images/phone.svg"
                  alt="phone"
                  width={24}
                  height={24}
                />
              )}
              <a
                href={link?.href || "/"}
                className="text-[14px] col-span-12  "
                target="_blank"
              >
                {link?.text}
              </a>
            </li>
          ))}
        </ul>

      </div>
      {/* Legal Links */}
      <div className=" md:mx-5 col-span-5 hidden  lg:col-span-2 lg:grid grid-cols-3 gap-2 lg:gap-7">
        <h3 className="text-[18px] font-semibold  col-span-3 ">
          {t("contact_us")}
        </h3>
        <ul className="col-span-3 grid grid-cols-2 gap-2 lg:gap-6">
          {legalLinks?.map((link, index) => (
            <li
              key={link?.href && index}
              className="flex items-center gap-2"
            >
              {index == 0 && (
                <Image
                  src="/images/email.svg"
                  alt="email"
                  width={24}
                  height={24}
                />
              )}
              {index == 1 && (
                <Image
                  src="/images/phone.svg"
                  alt="phone"
                  width={24}
                  height={24}
                />
              )}
              <a
                href={link?.href || "/"}
                className="text-[14px] col-span-1 "
                target="_blank"
              >
                {link?.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="flex flex-col justify-center items-center  lg:pb-[30px]">
      {/* Social Media */}
      <div>
        <div className="flex gap-5 flex-wrap my-2 mb-4">
          {socialMedia?.map((link, index) => (
            <Link
              key={link?.icon || index}
              target="_blank"
              href={link?.href || "/"}
              className="border border-[#fff]/[0.14] text-[#fff] hover:bg-[#fff] hover:text-[#9F7A32] rounded-full p-[6px] w-[34px] h-[34px] flex items-center justify-center group"
            >
              {link?.name == "Tiktok" ? (
                <svg
                  id="Group_179623"
                  data-name="Group 179623"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18.572"
                  height="20.773"
                  viewBox="0 0 18.572 20.773"
                >
                  <path
                    id="Path_71350"
                    data-name="Path 71350"
                    d="M36,20.773a6.7,6.7,0,0,1-4.124-1.4,6.836,6.836,0,0,1-.633-.553,6.61,6.61,0,0,1-.3-9.112A6.694,6.694,0,0,1,36,7.452a6.918,6.918,0,0,1,1.01.075l.519.077v4.609l-.8-.264a2.293,2.293,0,0,0-2.353.567,2.273,2.273,0,0,0,.461,3.554,2.286,2.286,0,0,0,3.459-1.956l0-4.779V0h4.4l.005.6a4.319,4.319,0,0,0,1.726,3.421,4.3,4.3,0,0,0,2.611.872c.022,0,.022,0,.226.014l.566.04V9.291h-.815a8.484,8.484,0,0,1-3.361-.683,8.754,8.754,0,0,1-.946-.469l.014,6a6.587,6.587,0,0,1-1.974,4.689A6.693,6.693,0,0,1,37.006,20.7a6.875,6.875,0,0,1-1.01.075Zm0-12.1a5.491,5.491,0,0,0-4.147,1.854,5.391,5.391,0,0,0,.245,7.435,5.643,5.643,0,0,0,.52.454A5.494,5.494,0,0,0,36,19.556a5.691,5.691,0,0,0,.832-.061A5.483,5.483,0,0,0,39.9,17.959a5.375,5.375,0,0,0,1.612-3.824l-.019-8.374.983.758a7.484,7.484,0,0,0,1.659.967,7.285,7.285,0,0,0,2.485.577V6.1A5.5,5.5,0,0,1,43.7,5a5.54,5.54,0,0,1-2.1-3.344q-.043-.215-.069-.434H39.515V9.334l0,4.779a3.507,3.507,0,1,1-3.505-3.5c.1,0,.2,0,.3.013V8.678c-.1-.006-.208-.009-.312-.009Z"
                    transform="translate(-29.264)"
                     className="fill-white group-hover:fill-[#9F7A32]"
                  />
                </svg>
              ) : (
                <Icon icon={link?.icon} className="w-6 h-6" />
              )}
            </Link>
          ))}
        </div>
      </div>
      <p className="text-[12px] ">{t("copyright")}</p>
    </div>
  </Container>
</footer></>
  );
};

export default Footer;
