export type Inputs = {
  titleAr: string;
  titleEn?: string;
  descriptionAr: string;
  descriptionEn?: string;
  finished_at: string;
  locally: 0 | 1;
  image: FileList;
  file: FileList;
  section_id: string;
};

export type AddAdsProps = {
  token: string;
  locale: string;
  section: any;
  categories: any;
};

export type ArabicMonths = {
  [key: string]: string;
};
