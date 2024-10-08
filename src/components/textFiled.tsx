import React from "react";
import { Field, FieldProps } from "formik";

interface TextFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder,
}) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className="mb-4">
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
          <input
            {...field}
            type={type}
            id={name}
            placeholder={placeholder}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {meta.touched && meta.error && (
            <div className="text-red-500 text-sm mt-1">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};

export default TextField;
