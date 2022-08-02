import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { useAppDispatch } from "../../app/hooks";
import { ErrorMessage, Form, Formik } from "formik";
import { createJobAsync } from "../../redux/job/jobSlice";
import { JobSchema } from "../../utils";

const JobModal = () => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const dispatch = useAppDispatch();

  return (
    <>
      <Button
        id="create-job-button"
        variant={"solid"}
        ml="4"
        onClick={() => {
          setOverlay(<OverlayTwo />);
          onOpen();
        }}
        colorScheme={"teal"}
        size={"sm"}
        mr={4}
        leftIcon={<AddIcon />}
      >
        Job
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Create a job</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                title: "",
                description: "",
                rate: 1,
                status: "",
              }}
              validationSchema={JobSchema}
              onSubmit={({ title, description, rate, status }) => {
                dispatch(createJobAsync({ title, description, rate, status }));
              }}
            >
              {({ errors, touched, values, handleChange }) => (
                <Form>
                  <Stack spacing="6">
                    <Stack spacing="5">
                      <FormControl>
                        <FormLabel htmlFor="text">Title</FormLabel>
                        <Input
                          id="title"
                          type="text"
                          value={values.title}
                          onChange={handleChange("title")}
                          placeholder="Title's length is between 2 and 20"
                        />
                        <ErrorMessage name="title" />
                      </FormControl>
                    </Stack>

                    <Stack>
                      <FormControl>
                        <FormLabel htmlFor="text">Description</FormLabel>
                        <Input
                          id="description"
                          type="text"
                          value={values.description}
                          onChange={handleChange("description")}
                          placeholder="Description's length is between 10 and 100"
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
                          placeholder="Rate's length is between 1 and 120"
                        />
                        {errors.rate && touched.rate ? (
                          <div className="error">{errors.rate}</div>
                        ) : null}
                      </FormControl>
                    </Stack>

                    <Stack>
                      <FormControl>
                        <FormLabel htmlFor="text">Status</FormLabel>
                        <Input
                          id="status"
                          type="text"
                          value={values.status}
                          onChange={handleChange("status")}
                          placeholder="Status's length is between 2 and 100"
                        />
                        {errors.status && touched.status ? (
                          <div className="error">{errors.status}</div>
                        ) : null}
                      </FormControl>
                    </Stack>

                    <Button
                      id="ok"
                      colorScheme={"blue"}
                      variant={"solid"}
                      type="submit"
                      onClick={onClose}
                      disabled={
                        Array.isArray(errors) ||
                        Object.values(errors).toString() !== "" ||
                        !values.title ||
                        !values.description ||
                        !values.status
                      }
                    >
                      OK
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default JobModal;
