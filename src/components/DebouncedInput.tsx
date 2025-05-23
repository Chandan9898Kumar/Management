import { useEffect, useState } from "react";
import { Input } from "@/components/input";

interface DebouncedInputProps {
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
  placeholder?: string;
  className?: string;
}

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 300,
  placeholder,
  className,
}: DebouncedInputProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value !== initialValue) {
        onChange(value);
      }
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, initialValue, debounce, onChange]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className={className}
    />
  );
}