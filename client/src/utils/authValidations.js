//

export const validateLogin = (email, password) => {
  const errors = [];

  // Enhanced email validation with specific messages
  if (!email.trim()) {
    errors.push("✉️ Email is required");
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    if (email.includes("@") && !email.includes(".")) {
      errors.push("❌ Missing domain (e.g., example.com)");
    } else if (!email.includes("@")) {
      errors.push("❌ Missing @ symbol in email");
    } else if (email.split("@")[1].indexOf(".") === -1) {
      errors.push("❌ Email needs a dot in domain (e.g., example.com)");
    } else {
      errors.push("❌ Invalid email format (e.g., user@example.com)");
    }
  }

  // Password validation
  if (!password.trim()) {
    errors.push("🔑 Password is required");
  } else if (password.length < 6) {
    errors.push("🔒 Password must be at least 6 characters");
  }

  return errors;
};

export const validateRegister = (
  email,
  password,
  confirmPassword,
  username
) => {
  const errors = validateLogin(email, password);

  // Username validation
  if (!username.trim()) {
    errors.push("👤 Username is required");
  } else if (username.length < 3) {
    errors.push("👤 Username must be at least 3 characters");
  }

  // Password confirmation
  if (password !== confirmPassword) {
    errors.push("🔐 Passwords do not match");
  }

  return errors;
};
