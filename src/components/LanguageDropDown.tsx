import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useLanguage from "@/store/useLanguage";
import { Roboto } from "next/font/google";
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const LanguageDropDown = () => {
  const { language, setLanguage } = useLanguage()

  const handleLanguage = (language: string) => {
    setLanguage(language)
  }
  
  return (<div>
    <Select defaultValue={language} onValueChange={handleLanguage}>
      <SelectTrigger className={`h-[42px] text-2xl font-bold ${roboto.className} border border-gray-400 rounded shadow [&_svg]:scale-150 [&_svg]:pl-1`}>
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="json" className="text-2xl font-bold" >JSON Formatter</SelectItem>
          <SelectItem value="css" className="text-2xl font-bold" >CSS Formatter</SelectItem>
          <SelectItem value="sql" className="text-2xl font-bold" >SQL Formatter</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  );
};

export default LanguageDropDown;