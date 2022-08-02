import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useAppDispatch } from "../../app/hooks";
import { Form, Formik } from "formik";

import { createApplicationAsync } from "../../redux/job/jobSlice";
import { ApplicationSchema } from "../../utils";

const BidModal = () => {
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
  const toast = useToast();

  return (
    <>
      <Button
        variant={"solid"}
        onClick={() => {
          setOverlay(<OverlayTwo />);
          onOpen();
        }}
        colorScheme={"teal"}
        size={"sm"}
      >
        Application
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Write a bid</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                content: "",
                rate: 1,
              }}
              validationSchema={ApplicationSchema}
              onSubmit={({ content, rate }) => {
                dispatch(createApplicationAsync({ content, rate })).then(
                  (res) => {
                    toast({
                      title: "Success",
                      description: "You wrote a bid successfully",
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                    });
                  }
                );
              }}
            >
              {({ errors, touched, values, handleChange }) => (
                <Form>
                  <Stack spacing="6">
                    <Stack>
                      <FormControl>
                        <FormLabel htmlFor="text">content</FormLabel>
                        <Textarea
                          id="content"
                          value={values.content}
                          onChange={handleChange("content")}
                          placeholder="content's length is between 10 and 100"
                        />
                        {errors.content && touched.content ? (
                          <div className="error">{errors.content}</div>
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

                    <Button
                      colorScheme={"blue"}
                      variant={"solid"}
                      type="submit"
                      onClick={onClose}
                      disabled={
                        Array.isArray(errors) ||
                        Object.values(errors).toString() !== "" ||
                        !values.content ||
                        !values.rate
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

export default BidModal;
