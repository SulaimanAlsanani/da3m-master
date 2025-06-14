export type Social = {
    name: string;
    link: string;
    type: string;
    id: string;
  };
  
  export type Inputs = {
    name: string;
    mobile: string;
    address: string;
    email: string;
    area_name: string;
    type: string;
    category_name: string;
    // "socials[twitter]": string;
    // "socials[facebook]": string;
    // "socials[instagram]": string;
    // "socials[snapchat]": string;
    // "socials[whatsapp]": string;
    socials: {
      twitter: string;
      facebook: string;
      instagram: string;
      snapchat: string;
      whatsapp: string;
    };
    has_licence: 0|1|number;
    category_id: any;
    brief: string;
    area_id: string;
    image: FileList | null;
  };