"use server";

import { cookies } from "next/headers";
import apiServiceCall from "./apiServiceCall";
export   const logoutHandlder = async () => {
    try {

const coockieStore = cookies()
      // const token = await coockieStore.get('token')?.value
      // if(token){

        await fetch("/api/auth/logout", { method: "GET" });
      // }
      
     
    } catch (error) {
      console.log(error);
    }
  };
export const getContactUs = async (lang: string) => {
  return apiServiceCall({
    url: `setting_web/contacts`,
    headers: { "Accept-Language": lang },
  });
};
export const getAreas = async (lang: string) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  return apiServiceCall({
    url: `areas`,
    headers: { "Accept-Language": lang , "Authorization": `Bearer ${token}`},
   

  });
};
export const getCategories = async (lang: string) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  return apiServiceCall({
    url: `categories`,
    headers: { "Accept-Language": lang , "Authorization": `Bearer ${token}`},
   

  });
};

export const getHomeData = async (lang: string) => {
  return apiServiceCall({
    url: "home",
    headers: { "Accept-Language": lang },
  });
};
export const getUserProfileData = async (lang: string,profileId:string) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  return apiServiceCall({
    url: `profile/${profileId}`,
    headers: { "Accept-Language": lang ,Authorization: `Bearer ${token}`},
  });
};
export const User = async (lang: string) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  console.log("token", token)
  return apiServiceCall({
    url: "profile",
    headers: { "Accept-Language": lang  , Authorization: `Bearer ${token}`}
  });
};

export const getSectionsData = async ( lang: string) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  console.log("token", token)
  return apiServiceCall({
    url: "sections",
    headers: { "Accept-Language": lang  , Authorization: `Bearer ${token}`}
  });
};


export const sendContactData = async (lang: string, formData: any) => {
  return apiServiceCall({
    url: "contactus",
    headers: { "Accept-Language": lang },
    method: "POST",
    body: formData,
  });
};

export const getSingleHotelData = async (slug: string, lang: string) => {
  return apiServiceCall({
    url: `hotel_web/${slug}`,
    headers: { "Accept-Language": lang },
  });
};
export const getFeasibilityData = async (lang: string) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  console.log("token", token)
  return apiServiceCall({
    url: "pages/feasibility",
    headers: { "Accept-Language": lang  , Authorization: `Bearer ${token}`}
  });
};

export const getProfileData = async (lang: string) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  console.log("token", token)
  return apiServiceCall({
    url: "profile",
    headers: { "Accept-Language": lang  , Authorization: `Bearer ${token}`}
  });
};
export const getNotification = async (lang: string) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  console.log("token", token)
  return apiServiceCall({
    url: "notifications",
    headers: { "Accept-Language": lang  , Authorization: `Bearer ${token}`}
  });
};

export const getFooterSocials = async (lang: string) => {
  const cookieStore = await cookies()
  // const token = cookieStore.get('token')?.value
  // console.log("token", token)
  return apiServiceCall({
    url: "settings",
    headers: { "Accept-Language": lang }
  });
};

export const getPolicyData = async (lang: string) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  console.log("token", token)
  return apiServiceCall({
    url: "pages/policy",
    headers: { "Accept-Language": lang  , Authorization: `Bearer ${token}`}
  });
};

// export const getAdsPending = async (lang: string) => {
//   const cookieStore = await cookies()
//   const token = cookieStore.get('token')?.value
//   console.log("token", token)
//   const params = new URLSearchParams({
//     is_owner: '1',
//     type: 'refused',
//   });
//   return apiServiceCall({
//     url: `ads?${params.toString()}`,
//     headers: { "Accept-Language": lang  , Authorization: `Bearer ${token}`}
//   });
// };



// export const getBlogs = async (lang: string) => {
//     return apiServiceCall({ url: "blog", headers: { lang } })
// }

// export const getBlog = async (id: string, lang: string) => {
//     return apiServiceCall({ url: `blog/${id}`, headers: { lang: lang } })
// }

// export const getDevelopers = async (lang: string) => {
//     return apiServiceCall({ url: "developer", headers: { lang: lang } })
// }

// export const getDeveloper = async (id: string, lang: string) => {
//     return apiServiceCall({ url: `developer/${id}`, headers: { lang: lang } })
// }

// export const getTerms = async (lang: string) => {
//     return apiServiceCall({ url: `setting/terms`, headers: { lang: lang } })
// }

// export const getPrivacy = async (lang: string) => {
//     return apiServiceCall({ url: `setting/privacy`, headers: { lang: lang } })
// }

// export const getHomePropertyDiscoverData = async (lang: string) => {
//     return apiServiceCall({ url: "discover", headers: { lang: lang } })
// }

// export const getAboutUs = async (lang: string) => {
//     return apiServiceCall({ url: "aboutushome", headers: { lang: lang } })
// }

// export const getFaqs = async (lang: string) => {
//     return apiServiceCall({ url: "faq", headers: { lang: lang } })
// }

// export const getAllAreasData = async (lang: string) => {
//     return apiServiceCall({ url: "area", headers: { lang: lang } })
// }
// export const getHomeTopAreasData = async (lang: string) => {
//     return apiServiceCall({
//         url: "area/highlighted_areas",
//         headers: { lang: lang },
//     })
// }
// export const getHomeWhyChooseUsData = async (lang: string) => {
//     return apiServiceCall({ url: "whychooseus", headers: { lang: lang } })
// }
// export const getHomeDeveloperData = async (lang: string) => {
//     return apiServiceCall({ url: "developer", headers: { lang: lang } })
// }
// export const getHomeTopPalanProperyData = async (lang: string) => {
//     return apiServiceCall({ url: "product", headers: { lang: lang } })
// }
// export const getSpacificProperyData = async (slug: string, lang: string) => {
//     return apiServiceCall({ url: `product/${slug}`, headers: { lang: lang } })
// }
