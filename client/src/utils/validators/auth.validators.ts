import * as yup from "yup";

export const loginValidator = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

export type LoginInput = yup.InferType<typeof loginValidator>;

export const signupValidator = yup.object({
  name: yup
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(50, "Name must be less than 50 characters")
    .required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
  password_confirmation: yup
    .string()
    .min(6, "Password confirmation must be at least 4 characters")
    .required("Password confirmation is required")
    .oneOf([
      yup.ref("password"),
      "Password confirmation does not match with your password",
    ]),
  // file: yup.mixed().required("File is required")
});

export type SignupInput = yup.InferType<typeof signupValidator>;
