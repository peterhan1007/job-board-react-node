import * as React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  useToast,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";

import { Logo } from "../../assets/Logo";
import { OAuthButtonGroup } from "../../components/signin/OAuthButtonGroup";
import { SignUpSchema } from "../../utils";
import { registerAsync } from "../../redux/auth/authSlice";
import { useAppDispatch } from "../../app/hooks";

export const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
              Create your account
            </Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
          boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Formik
            initialValues={{
              name: "",
              password: "",
              title: "",
              description: "",
              rate: 0,
              radio: "1",
            }}
            validationSchema={SignUpSchema}
            onSubmit={({ name, password, title, description, rate, radio }) => {
              dispatch(
                registerAsync({
                  name,
                  password,
                  title,
                  description,
                  rate,
                  radio,
                })
              ).then(() => {
                navigate("/sign-in", { replace: true });
                toast({
                  title: "Success",
                  description: "You're registered.",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              });
            }}
          >
            {({ errors, touched, values, handleChange }) => (
              <Form>
                <Stack spacing="6">
                  <Stack spacing="5">
                    <FormControl>
                      <FormLabel htmlFor="text">Name</FormLabel>
                      <Input
                        id="name"
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
                        type="password"
                        value={values.password}
                        onChange={handleChange("password")}
                      />
                      {errors.password && touched.password ? (
                        <div className="error">{errors.password}</div>
                      ) : null}
                    </FormControl>
                  </Stack>

                  <Stack spacing="5">
                    <FormControl>
                      <FormLabel htmlFor="text">Title</FormLabel>
                      <Input
                        id="title"
                        type="text"
                        value={values.title}
                        onChange={handleChange("title")}
                      />
                      {errors.title && touched.title ? (
                        <div className="error">{errors.title}</div>
                      ) : null}
                    </FormControl>
                  </Stack>

                  <Stack spacing="5">
                    <FormControl>
                      <FormLabel htmlFor="text">Description</FormLabel>
                      <Input
                        id="description"
                        type="text"
                        value={values.description}
                        onChange={handleChange("description")}
                      />
                      {errors.description && touched.description ? (
                        <div className="error">{errors.description}</div>
                      ) : null}
                    </FormControl>
                  </Stack>

                  <Stack spacing="5">
                    <FormControl>
                      <FormLabel htmlFor="text">Rate</FormLabel>
                      <Input
                        id="rate"
                        type="number"
                        value={values.rate}
                        onChange={handleChange("rate")}
                      />
                      {errors.rate && touched.rate ? (
                        <div className="error">{errors.rate}</div>
                      ) : null}
                    </FormControl>
                  </Stack>

                  <FormControl>
                    <RadioGroup
                      id="radio"
                      value={values.radio}
                      onChange={handleChange("radio")}
                    >
                      <Stack spacing={5} direction="row">
                        <Radio colorScheme="red" value="1">
                          Freelancer
                        </Radio>
                        <Radio colorScheme="green" value="2">
                          Client
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>

                  <Button colorScheme={"blue"} variant={"solid"} type="submit">
                    Sign up
                  </Button>
                  <Stack spacing="6">
                    <Link to={"/sign-in"}>Sign in</Link>
                    <OAuthButtonGroup />
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Container>
  );
};

export default SignUpForm;
