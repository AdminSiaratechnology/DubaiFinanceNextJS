// components/SearchableSelect.tsx
import Select, { StylesConfig } from "react-select";
import { Country } from "country-state-city";
import { useMemo } from "react";
import { Label } from "@/components/ui/Form";

interface Option {
    label: string;
    value: string;
}

interface SearchableSelectProps {
    label: string;
    value: string | null; // Changed to accept string for easier integration
    onChange: (value: string) => void;
    placeholder?: string;
    isDisabled?: boolean;
    required?: boolean;
    className?: string;
}

export default function CountrySearchableSelect({
    label,
    value,
    onChange,
    placeholder = "Select your country...",
    isDisabled = false,
    required = false,
    className = "",
}: SearchableSelectProps) {
    // Generate country options once
    const countryOptions = useMemo(() => {
        return Country.getAllCountries().map((country) => ({
            label: country.name,
            value: country.name, // Using name for nationality field
            flag: country.flag,
        }));
    }, []);

    // Find current option based on string value
    const selectedOption = useMemo(() => {
        return countryOptions.find((opt) => opt.value === value) || null;
    }, [value, countryOptions]);

    // Premium styles with dark mode support
    const customStyles: StylesConfig<Option, false> = {
        control: (base, state) => ({
            ...base,
            minHeight: "44px",
            borderRadius: "1rem",
            backgroundColor: "var(--card)",
            borderColor: state.isFocused ? "var(--brand)" : "var(--border)",
            boxShadow: state.isFocused ? "0 0 0 2px rgba(230, 192, 79, 0.2)" : "none",
            transition: "all 0.2s ease",
            "&:hover": {
                borderColor: "var(--brand)",
            },
        }),
        placeholder: (base) => ({
            ...base,
            color: "var(--text-muted)",
            fontSize: "0.875rem",
            fontWeight: "500",
        }),
        singleValue: (base) => ({
            ...base,
            color: "var(--text-primary)",
            fontSize: "0.875rem",
            fontWeight: "600",
        }),
        input: (base) => ({
            ...base,
            color: "var(--text-primary)",
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "0.75rem",
            boxShadow: "var(--shadow-soft)",
            overflow: "hidden",
            zIndex: 50,
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? "var(--brand)"
                : state.isFocused
                    ? "rgba(230, 192, 79, 0.1)"
                    : "transparent",
            color: state.isSelected ? "var(--brand-foreground)" : "var(--text-primary)",
            fontSize: "0.875rem",
            fontWeight: state.isSelected ? "700" : "500",
            padding: "10px 16px",
            cursor: "pointer",
            "&:active": {
                backgroundColor: "var(--brand)",
            },
        }),
    };

    return (
        <div className={`flex flex-col ${className}`}>
            <Label className="text-[10px] uppercase font-bold tracking-widest pl-1" required>{label}</Label>
            <Select
                value={selectedOption}
                options={countryOptions}
                onChange={(opt) => onChange(opt ? opt.value : "")}
                placeholder={placeholder}
                isDisabled={isDisabled}
                isSearchable
                styles={customStyles}
                classNamePrefix="react-select"
                formatOptionLabel={(option: any) => (
                    <div className="flex items-center gap-2">
                        {/* <span className="text-lg leading-none">{option.flag}</span> */}
                        <span>{option.label}</span>
                    </div>
                )}
            />
        </div>
    );
}
