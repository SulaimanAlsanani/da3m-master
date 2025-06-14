import { RadioGroupItem } from "../ui/radio-group";

// Reusable Input Field
export const InputField = ({
    label,
    register,
    type = "text",
    dir = "rtl",
    error,
  }: any) => (
    <div className="relative col-span-12 md:col-span-4">
      <input
        type={type}
        dir={dir}
        className="border border-[#3C435C]/[0.14] text-start h-[55px] w-full text-[#848484] pt-5 px-6 rounded-[14px] focus:outline-none"
        placeholder={label}
        {...register}
      />
      <label className="absolute top-2 start-6 text-[#848484] text-[12px]">
        {label}
      </label>
      {error && <p className="text-end text-red-500 text-sm">{error.message}</p>}
    </div>
  );
  
  // Reusable Radio Option
  export const RadioOption = ({ value, label }: { value: string; label: string }) => (
    <div className="flex gap-2 items-center">
      <RadioGroupItem value={value} id={`radio-${value}`} />
      <label htmlFor={`radio-${value}`}>{label}</label>
    </div>
  );