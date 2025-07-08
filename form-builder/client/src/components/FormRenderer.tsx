import InputField, { InputFieldProps } from './InputField';

export type FormRendererProps = {
  fields: InputFieldProps[];
  disabled?: boolean;
};

export default function FormRenderer({ fields, disabled }: FormRendererProps) {
  return (
    <form>
      {fields.map((field, idx) => (
        <InputField key={idx} {...field} disabled={disabled} />
      ))}
    </form>
  );
} 
