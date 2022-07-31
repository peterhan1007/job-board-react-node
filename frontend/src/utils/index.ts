import * as Yup from "yup";

const SignSchema = () =>
  Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(6, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

const SignUpSchema = () =>
  Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(6, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    title: Yup.string()
      .min(6, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    description: Yup.string()
      .min(10, "Too Short!")
      .max(200, "Too Long!")
      .required("Required"),
    rate: Yup.number().min(1).max(120).required("Required"),
  });

const JobSchema = () =>
  Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    description: Yup.string()
      .min(10, "Too Short!")
      .max(200, "Too Long!")
      .required("Required"),
    rate: Yup.number().min(1).max(120).required("Required"),
    status: Yup.string()
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
  });

const ProfileSchema = () =>
  Yup.object().shape({
    title: Yup.string()
      .min(1, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    description: Yup.string()
      .min(1, "Too Short!")
      .max(200, "Too Long!")
      .required("Required"),
    rate: Yup.number().min(1).max(120).required("Required"),
  });

const ApplicationSchema = () =>
  Yup.object().shape({
    content: Yup.string()
      .min(1, "Too Short!")
      .max(200, "Too Long!")
      .required("Required"),
    rate: Yup.number().min(1).max(120).required("Required"),
  });

export {
  SignSchema,
  SignUpSchema,
  JobSchema,
  ProfileSchema,
  ApplicationSchema,
};
