export const VALIDATION_RULES = {
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    required: "Email is required",
    invalid: "Invalid email format"
  },
  password: {
    regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    required: "Password is required",
    invalid:
      "Password must be at least 8 characters long and contain at least one letter and one number"
  },
  phone: {
    regex: /^01[0125]\d{8}$/,
    required: "Phone is required",
    invalid: "Invalid phone number format"
  }
}