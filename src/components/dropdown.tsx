import React, { useState, useRef, useEffect } from "react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  placeholder?: string;
  onChange: (selectedOption: DropdownOption) => void;
  defaultValue?: DropdownOption;
  disabled?: boolean;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  defaultValue,
  disabled = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    defaultValue || null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: DropdownOption) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className={`relative inline-block bg-gray-100 text-left ${className}`}
      ref={dropdownRef}
    >
      <div>
        <button
          type="button"
          className={`inline-flex bg-gray-800 justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={toggleDropdown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={disabled}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <button
                key={option.value}
                className={`${
                  selectedOption?.value === option.value
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700"
                } block w-full text-left bg-gray-100 px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900`}
                role="menuitem"
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
