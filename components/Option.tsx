import { cn } from "@/utils/generalUtils";
import { FaCheckCircle } from "react-icons/fa";

const Option = ({
  option,
  onClick,
  isSelected,
  className,
}: SelectOptionType) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 px-3 py-2 w-full text-[14px] hover:bg-gray-200 overflow-hidden transition-all cursor-pointer border-t border-gray-200",
        className
      )}
      onClick={onClick}
    >
      {option.label}

      {isSelected && <FaCheckCircle className="w-[14px] " />}
    </div>
  );
};

export default Option;
