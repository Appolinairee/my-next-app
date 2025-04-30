/* eslint-disable @typescript-eslint/no-explicit-any */
type SelectFieldProps = {
  className?: string;
  value?: string | number | any;
  onChange: any;
  errorMessage?: string | null;
  label?: string;
  icon?: React.ReactElement;
  options: OptionType[];
  inputClass?: string;
  placeholder?: string;
  isRequired?: boolean;
  cardClassName?: string;
  errors?: Record<string, any>;
  isSearchable?: boolean;
};

type SelectOptionType = {
  option: Option;
  onClick: VoidFunction;
  className?: string;
  isSelected: boolean;
};

interface LabelProps {
  title: string;
  htmlFor: string;
  icon?: React.ReactNode;
  required?: boolean;
  className?: string;
}

type TableProps<T> = {
  data: T[];
  columns: string[];
  RowComponent: React.FC<{ item: T }>;
};
