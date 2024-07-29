import * as yup from "yup";

export const authValidatorSchema = yup.object({
  email: yup.string().email("please enter a valid Email").required("Email is a valid field"),
  username: yup
    .string()
    .required("username is a valid field")
    .min(3, "username must be at least 3 chars long")
    .max(15, "username must be at most 15 chars long"),
  name: yup
    .string()
    .required("name is a valid field")
    .min(3, "name must be at least 3 chars long")
    .max(10, "name must be at most 10 chars long"),
  password: yup
    .string()
    .required("password is a required field")
    .min(8, "password must be at least 8 chars long")
    .max(24, "password must be at most 24 chars long"),
});
