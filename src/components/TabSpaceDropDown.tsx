import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useInputOutput from "@/store/useInputOutput";
import useLanguage from "@/store/useLanguage";
import useTabspace from "@/store/useTabspace";
import { formatCSS } from "@/utils/format-css/formatCss";
import { formatHTML } from "@/utils/format-html/formatHTML";
import { formatJS } from "@/utils/format-js/formatJS";

const TabSpaceDropDown = () => {
  const { setTabSpace } = useTabspace()
  const { input, setOutput } = useInputOutput()
  const { language } = useLanguage()

  return (<div>
    <Select defaultValue="2" onValueChange={(value) => {
      try {
        (language === 'json') ? setOutput(JSON.stringify(JSON.parse(input), null, parseInt(value))) :
        (language === 'css') ? setOutput(formatCSS(input, parseInt(value))) :
        (language === 'html') ? setOutput(formatHTML(input, parseInt(value))) :
        (language === 'js') ? setOutput(formatJS(input, parseInt(value))) :
        setOutput(input)
        setTabSpace(parseInt(value))
      } catch (err ) {
        if (err instanceof Error) {
          setOutput(err.message);
        } else {
          setOutput('An unknown error occurred');
        }
      }
    }}>
      <SelectTrigger className="w-[50px] h-[42px] border border-gray-400 rounded shadow [&_svg]:hidden">
        <SelectValue placeholder="Tab Space" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="2">2x</SelectItem>
          <SelectItem value="4">4x</SelectItem>
          <SelectItem value="8">8x</SelectItem>
          <SelectItem value="16">16x</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  );
};

export default TabSpaceDropDown;
