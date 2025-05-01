import { cn } from "@/utils/generalUtils";
import Image from "next/image";

const EmptySection = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <div className={cn("my-10", className)}>
      <Image
        className={cn(
          "w-auto mx-auto max-w-[85%] xs:max-w-[380px]",
          "min-h-auto xs:min-h-[250px] "
        )}
        src="/nothing.svg"
        width={500}
        height={500}
        alt={text || "Indisponibilité de la section"}
      />

      <p className="mt-6 text-center font-medium text-sm">{text}</p>
    </div>
  );
};

export default EmptySection;
