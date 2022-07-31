import { AddIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Form, Formik } from "formik";
import React from "react";
import { ProfileSchema } from "../../utils";
import { profileAsync } from "../../redux/auth/authSlice";

const ProfileModal = () => {
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
  const currentUserTitle = useAppSelector((state) => state.auth.title);
  const currentUserDescription = useAppSelector(
    (state) => state.auth.description
  );
  const currentUserRate = useAppSelector((state) => state.auth.rate);

  return (
    <>
      <div
        onClick={() => {
          setOverlay(<OverlayTwo />);
          onOpen();
        }}
      >
        profile
      </div>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                title: currentUserTitle,
                description: currentUserDescription,
                rate: currentUserRate,
              }}
              validationSchema={ProfileSchema}
              onSubmit={({ title, description, rate }) => {
                dispatch(profileAsync({ title, description, rate }));
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
                          placeholder="Title's length is between 10 and 30"
                        />
                        {errors.title && touched.title ? (
                          <div className="error">{errors.title}</div>
                        ) : null}
                      </FormControl>
                    </Stack>

                    <Stack>
                      <FormControl>
                        <FormLabel htmlFor="text">Description</FormLabel>
                        <Input
                          id="description"
                          type="textarea"
                          value={values.description}
                          onChange={handleChange("description")}
                          placeholder="Description's length is between 2 and 100"
                        />
                        {errors.description && touched.description ? (
                          <div className="error">{errors.description}</div>
                        ) : null}
                      </FormControl>
                    </Stack>

                    <Stack>
                      <FormControl>
                        <FormLabel htmlFor="text">Rate</FormLabel>
                        <Input
                          id="rate"
                          type="number"
                          value={values.rate}
                          onChange={handleChange("rate")}
                          placeholder="Rate's length is between 2 and 100"
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
                        Object.values(errors).toString() !== ""
                        // !values.title ||
                        // !values.description ||
                        // !values.rate
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

export default ProfileModal;
