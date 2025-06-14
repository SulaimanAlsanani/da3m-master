import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import apiServiceCall from "@/lib/apiServiceCall";
import { use } from "react";
import { useRouter } from "next/navigation";

export const useAddAdsMutation = (
  locale: string,
  token: string,
  onSuccess?: () => void
) => {

      const { mutate, isPending } = useMutation({

    mutationFn: (id:any) =>
      apiServiceCall({
        url: `ads/charge/${id}`,
        headers: {
          "Accept-Language": locale,
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: {payment_method:'online'},
      }),
    onError: (error) => {
      // console.log("errorrrr consultant", (error as any)?.data?.message);

      toast.error((error as any)?.data?.message);
    },
    onSuccess: (data) => {
      console.log("data success", data);

      toast.success(data?.data?.message);
      router.push(data?.data?.data?.charge_link);
      // reset();
    },
  });
  const router = useRouter();
  return useMutation({
    mutationFn: (data: FormData) =>
      apiServiceCall({
        url: "ads",
        headers: {
          "Accept-Language": locale,
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: data,
      }),
    onError: (error) => {
      toast.error((error as any)?.data?.message);
    },
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      console.log(data)
      onSuccess?.();
      router.push(`/${locale}/my-ads`);
      // mutate(data?.data?.data?.ads?.id)
    },
  });
};
