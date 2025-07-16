import HelperText from "./HelperText";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

const Field = ({ id, label, error, children }: FieldProps) => {
  return (
    <div className="mt-4">
      <label className="text-sm font-bold ml-3 mb-2 inline-block" htmlFor={id}>
        {label}
      </label>
      {children}
      {error && <HelperText type="error" message={error} />}
    </div>
  );
};

export default Field;