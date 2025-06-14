import { useForm } from "react-hook-form";
import { Inputs } from "./types";
import { useTranslations } from "next-intl";

export const useAddAdsForm = (defaultValues?: Partial<Inputs>) => {
  const t = useTranslations("addAds");

  return useForm<Inputs>({
    defaultValues: {
      section_id: "",
      titleAr: "",
      titleEn: "",
      descriptionAr: "",
      descriptionEn: "",
      finished_at: "",
      locally: 0,
      image: undefined,
      file: undefined,
      ...defaultValues,
    },
  });
};
