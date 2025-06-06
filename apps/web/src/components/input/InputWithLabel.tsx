import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface InputWithLabelProps {
  id: string;
  label: string;
  type?: string;
  inputType?: "input" | "textarea";
  placeholder?: string;
  value: any;
  onValueChange: (value: any) => void;
}

export default function InputWithLabel({
  id,
  label,
  type = "text",
  inputType = "input",
  placeholder,
  value,
  onValueChange,
}: InputWithLabelProps) {
  if (inputType === "textarea") {
    return (
      <div className="grid w-full max-w-md items-center gap-3">
        <Label htmlFor={id}>{label}</Label>
        <Textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
        />
      </div>
    );
  }

  return (
    <div className="grid w-full max-w-md items-center gap-3">
      <Label htmlFor={id}>{label}</Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      />
    </div>
  );
}
