import * as Yup from "yup";
export const signUpSchema = Yup.object({
  userName: Yup.string()
    .required("Name is required")
    .min(3, "Minlength is 3 characters"),
  email: Yup.string().required("Email is required").email("enter valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/,
      "Password must contain letters, numbers, and special characters"
    ),
  rePassword: Yup.string()
    .required("rePassword is required")
    .oneOf([Yup.ref("password")], "confirm password don't match with password"),
});
export const loginSchema = Yup.object({
  email: Yup.string().required("Email is required").email("enter valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/,
      "Password must contain letters, numbers, and special characters"
    ),
});
