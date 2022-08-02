import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { loginAsync } from "../../redux/auth/authSlice";
import { SignSchema } from "../../utils";
import * as React from "react";

export default function SignInForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { errors, touched, values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: SignSchema,
    onSubmit: ({ name, password }) => {
      dispatch(loginAsync({ name, password }))
        .then((res) => {
          navigate("/jobs", { replace: true });
          toast({
            title: "Success",
            description: "You're logged in successfully.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((error) => console.error(error));
    },
  });

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <form onSubmit={handleSubmit} id="sign_in_form">
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>Sign in to your account</Heading>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                id="username"
                type="text"
                value={values.name}
                onChange={handleChange("name")}
              />
              {errors.name && touched.name ? (
                <div className="error">{errors.name}</div>
              ) : null}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                id="password"
                type="password"
                value={values.password}
                onChange={handleChange("password")}
              />
              {errors.password && touched.password ? (
                <div className="error">{errors.password}</div>
              ) : null}
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.500"}>Forgot password?</Link>
              </Stack>
              <ReachLink to={"/sign-up"}>Sign up</ReachLink>
              <Button colorScheme={"blue"} variant={"solid"} type="submit">
                Sign in
              </Button>
            </Stack>
          </Stack>
        </form>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
