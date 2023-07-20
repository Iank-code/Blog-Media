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
    .matches(/^[0-9]+$/, "should be only digits")
    .min(4, "should be more than 4 digits")
    .required(),
});

export type LoginInput = yup.InferType<typeof loginValidator>;

export const signupValidator = yup.object({
  username: yup
    .string()
    .min(4, "Username should be at least 4 characters")
    .max(50, "Username should not exceed 50 characters")
    .required(),

  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Invalid Email Address!"
    )
    .required(),
  zipcode: yup
    .string()
    .matches(/^[0-9]+$/, "should be only digits")
    .min(4, "should be more than 4 digits")
    .required(),
  password: yup
    .string()
    .min(6, "Password should be atleast 6 characters")
    .required(),
  password_confirmation: yup
    .string()
    .min(6, "Password confirmation should be at least 4 characters")
    .required("Password confirmation is required")
    .oneOf([
      yup.ref("password"),
      "Password confirmation does not match with your password",
    ]),
});

export type SignupInput = yup.InferType<typeof signupValidator>;
