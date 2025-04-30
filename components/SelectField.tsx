"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Option from "./Option";
import Label from "./Label";

const SelectField = forwardRef<HTMLDivElement, SelectFieldProps>(
  (
    {
      className = "",
      value,
      onChange,
      errorMessage,
      label,
      icon: Icon,
      options,
      inputClass = "",
      placeholder,
      isRequired,
      cardClassName = "",
      isSearchable = false,
    },
    ref
  ) => {
    const [inputId, setInputId] = useState<string>("");
    const [selected, setSelected] = useState<string | number | undefined>(
      value
    );
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const selectRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const generatedId = `select_${Math.random().toString(36).substr(2, 9)}`;
      setInputId(generatedId);
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);

    const handleButtonClick = () => {
      setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (optionValue: string | number) => {
      setSelected(optionValue);
      onChange(optionValue);
      setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const filteredOptions = options?.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div>
        {label && (
          <Label
            title={label}
            icon={Icon}
            htmlFor={inputId}
            required={!!isRequired}
          />
        )}

        <div
          ref={(node) => {
            selectRef.current = node;
            if (ref) {
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                (ref as React.MutableRefObject<HTMLDivElement | null>).current =
                  node;
              }
            }
          }}
          className={`${className} relative flex flex-col gap-2 bg-white w-auto text-[15px] rounded-[15px]`}
        >
          <button
            type="button"
            className={`${inputClass} btn-base border-btn !justify-between !font-normal !px-4`}
            onClick={handleButtonClick}
          >
            <span>
              {options?.find((option) => option.value == (selected || value))
                ?.label ||
                placeholder ||
                label}
            </span>

            <MdKeyboardArrowDown
              className={`inline-block text-dark/90 font-medium transition-all duration-150 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {isOpen && (
            <div
              className={`absolute top-[95%] left-0 mt-2 bg-white border border-gray-300 rounded-[15px] shadow-soft z-10 p-2 py-1  w-full ${cardClassName}`}
            >
              {isSearchable && (
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="input !rounded-[10px] !py-[8px]"
                />
              )}

              <p className="font-medium text-[14px] mx-2 mb-1">{placeholder}</p>

              {filteredOptions.map((option) => (
                <Option
                  key={option.value}
                  option={option}
                  isSelected={option.value === selected}
                  onClick={() => handleOptionClick(option.value)}
                  className=""
                />
              ))}
            </div>
          )}
        </div>

        {errorMessage && <p className="input-error-message">{errorMessage}</p>}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";

export default SelectField;
