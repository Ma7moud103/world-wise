import { useState, useCallback, useRef } from "react";

export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(
    Object.keys(initialValues).reduce(
      (acc, key) => ({ ...acc, [key]: null }),
      {}
    )
  );

  const rulesRef = useRef(validationRules);

  const validateField = (fieldName, value) => {
    const rule = rulesRef.current[fieldName];
    if (!rule) return null;

    if (!value) {
      return rule.required || `${fieldName} is required`;
    }
    if (rule.regex && !rule.regex.test(value)) {
      return rule.invalid || `Invalid ${fieldName} format`;
    }
    return null;
  };

  const handleChange = useCallback(
    (fieldName) => (e) => {
      const value = e.target.value;
      setValues((prev) => ({ ...prev, [fieldName]: value }));

      const error = validateField(fieldName, value);
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
    },
    []
  ); 

  const isValid = useCallback(() => {
    return (
      Object.values(errors).every((error) => error === null) &&
      Object.values(values).every((value) => value !== "")
    );
  }, [errors, values]);

  return { values, errors, handleChange, isValid };
};
