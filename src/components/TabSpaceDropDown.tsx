import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useInputOutput from "@/store/useInputOutput";
import useLanguage from "@/store/useLanguage";
import useTabspace from "@/store/useTabspace";
import { formatCSS } from "@/utils/format-css/formatCss";
import { formatSQL } from "@/utils/format-sql/formatSql";

const TabSpaceDropDown = () => {
  const { setTabSpace } = useTabspace()
  const { input, setOutput } = useInputOutput()
  const { language } = useLanguage()

  const formatByLanguage = async (value: string) => {
    const spaces = parseInt(value);
    
    switch (language) {
      case 'json':
        return JSON.stringify(JSON.parse(input), null, spaces);
      case 'css':
        return await formatCSS(input, spaces);
      case 'sql':
        return await formatSQL(input, spaces);
      default:
        return input;
    }
  };

  return (<div>
    <Select defaultValue="2" onValueChange={async (value:string) => {
      try {
        setOutput(await formatByLanguage(value))
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
