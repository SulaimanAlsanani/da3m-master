import { Checkbox } from "@/components/ui/checkbox"
type Props = {
    text?:string
    textColor?:string
    textSize?:string,
    value?:boolean
    onChange: (value: boolean) => void
}
function CustomCheckBox({text,textColor,textSize, value, onChange}:Props) {
    return (
        <div className="flex items-center space-x-2 gap-2">
          <Checkbox
           checked={value}
           onCheckedChange={(value:boolean)=>onChange(value)}
            id="terms"
            onChange={(value)=> console.log(value)}
            className="border-none bg-[#DFDFDF] rounded-md h-4 w-4 data-[state=checked]:bg-[#5BB98D] data-[state=checked]:border-[#5BB98D]"
          />
          <label
            htmlFor="terms"
            className={ ` leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${textColor?textColor:""}  ${textSize?textSize:" text-sm font-medium"}`}
          >
            {text}
          </label>
        </div>
      )
}

export default CustomCheckBox