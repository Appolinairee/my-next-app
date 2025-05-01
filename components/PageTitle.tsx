import { cn } from "@/utils/generalUtils";
import { BsX } from "react-icons/bs";

const PageTitle = ({
  title,
  icon,
  setState,
  className = "",
  titleClass = "",
}: PageTitle) => {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <div className="flex gap-3 items-center">
        {icon && (
          <div className="py-[8px] px-[10px] bg-primary/15 rounded-full flex items-center justify-center relative">
            {icon}
          </div>
        )}

        <h3
          className={`text-[20px] font-semibold whitespace-nowrap truncate max-w-[350px] text-dark ${titleClass}`}
        >
          {title}
        </h3>
      </div>

      {setState && (
        <button
          className={cn(
            "cursor-pointer p-[2px] bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200 flex items-center justify-center",
            className
          )}
          onClick={() => setState(false)}
          aria-label="Fermer"
        >
          <BsX className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default PageTitle;
