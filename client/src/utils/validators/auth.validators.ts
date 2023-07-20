import * as yup from "yup";

export const loginValidator = yup.object({
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Invalid Email Address!"
    )
    .required(),
  zipcode: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(4, "Must be more than 4 digits")
    .required()
    .typeError("Zipcode should be a number and minimum value must be 4 digits"),
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
