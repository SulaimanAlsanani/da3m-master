import { useQuery } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";

export const useAddAdsQuery = (
  id: string | null,
  locale: string,
  token: string
) => {
  return useQuery({
    queryKey: ["ads", id],
    queryFn: () =>
      apiServiceCall({
        url: `ads/${id}`,
        headers: {
          "Accept-Language": locale,
          Authorization: `Bearer ${token}`,
        },
      }),
    enabled: !!id,
  });
};
