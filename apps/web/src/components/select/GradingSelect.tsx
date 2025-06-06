import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface GradingSelectProps {
  gradingType: "normal" | "skill";
  value: string;
  onValueChange: (value: string) => void;
}
export function GradingSelect({ gradingType, value, onValueChange }: GradingSelectProps) {
  const NORMAL_OPTIONS = ["FAIL", "PASS", "GOOD", "VERY_GOOD", "EXCELLENT"];
  const SKILL_OPTIONS = ["FAIL", "PASS"];

  const options = gradingType === "normal" ? NORMAL_OPTIONS : SKILL_OPTIONS;

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
