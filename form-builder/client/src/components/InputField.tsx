import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

export type InputFieldProps = {
  type: 'text' | 'checkbox' | 'radio';
  label: string;
  disabled?: boolean;
};

export default function InputField({ type, label, disabled = false }: InputFieldProps) {
  if (type === 'radio') {
    // Render a group of two radio buttons for visual clarity
    return (
      <div className="mb-4">
        <label className="block mb-1 font-medium">{label}</label>
        <RadioGroup defaultValue="option1" disabled={disabled} className="flex gap-6 ml-2">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option1" id={`${label}-option1`} disabled={disabled} />
            <label htmlFor={`${label}-option1`} className="text-sm">Option 1</label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option2" id={`${label}-option2`} disabled={disabled} />
            <label htmlFor={`${label}-option2`} className="text-sm">Option 2</label>
          </div>
        </RadioGroup>
      </div>
    );
  }
  if (type === 'checkbox') {
    return (
      <div className="mb-4 flex items-center gap-2">
        <Checkbox id={label} disabled={disabled} />
        <label htmlFor={label} className="text-sm font-medium">{label}</label>
      </div>
    );
  }
  // Default: text
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium" htmlFor={label}>{label}</label>
      <Input id={label} type="text" placeholder="Enter text..." disabled={disabled} />
    </div>
  );
} 
