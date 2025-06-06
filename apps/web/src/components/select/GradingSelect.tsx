import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface GradingSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}
export function GradingSelect({ value, onValueChange }: GradingSelectProps) {
  const options = ["FAIL", "PASS", "GOOD", "VERY_GOOD", "EXCELLENT"];

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="เลือก" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((options) => (
            <SelectItem key={crypto.randomUUID()} value={options}>
              {options}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
