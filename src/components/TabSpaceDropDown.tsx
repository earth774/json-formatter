import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useInputOutput from "@/store/useInputOutput";
import useTabspace from "@/store/useTabspace";

const TabSpaceDropDown = () => {
  const { setTabSpace } = useTabspace()
  const { input, setOutput } = useInputOutput()

  return (<div>
    <Select defaultValue="2" onValueChange={(value) => {
      setTabSpace(parseInt(value))
      setOutput(JSON.stringify(JSON.parse(input), null, parseInt(value)))
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
