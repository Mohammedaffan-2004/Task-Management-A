
export const validators = {
 
  email: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!regex.test(email)) return "Invalid email format";
    return null;
  },

  
  password: (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Za-z]/.test(password)) return "Password must contain at least one letter";
    if (!/\d/.test(password)) return "Password must contain at least one number";
    return null;
  },

  
  name: (name) => {
    if (!name) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (name.trim().length > 50) return "Name cannot exceed 50 characters";
    return null;
  },

 
  required: (value, fieldName = "This field") => {
    if (!value || (typeof value === "string" && !value.trim())) {
      return `${fieldName} is required`;
    }
    return null;
  },

 
  minLength: (value, min, fieldName = "This field") => {
    if (value && value.length < min) {
      return `${fieldName} must be at least ${min} characters`;
    }
    return null;
  },

 
  maxLength: (value, max, fieldName = "This field") => {
    if (value && value.length > max) {
      return `${fieldName} cannot exceed ${max} characters`;
    }
    return null;
  },
};


export const validateForm = (data, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const fieldRules = rules[field];
    const value = data[field];

    for (const rule of fieldRules) {
      const error = rule(value);
      if (error) {
        errors[field] = error;
        break; 
      }
    }
  });

  return errors;
};



export default validators;