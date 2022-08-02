import React, { useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Switch,
  FormControl,
  useToast,
  ModalOverlay,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
} from "@chakra-ui/react";

import { Application } from "../../redux/job/application.type";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { Job } from "../../redux/job/job.type";
import {
  updateJobAsync,
  getApplicationsAsync,
  applyRequestAsync,
  getAppliesAsync,
} from "../../redux/job/jobSlice";
import BidModal from "./bidModal";

export interface IntrinsicAttributes {
  title: string;
}

export const JobTable = ({
  jobs,
  username,
}: {
  jobs: Job[];
  username: String;
}) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const authRole = useAppSelector((state) => state.auth.role);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const role = useAppSelector((state) => state.auth.role);
  const id = useAppSelector((state) => state.auth.id);
  const bids = useAppSelector((state) => state.job.bids);
  const applies = useAppSelector((state) => state.job.applies);

  useEffect(() => {
    dispatch(getAppliesAsync());
  }, []);

  const One = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const [overlay, setOverlay] = React.useState(<One />);
  const Two = (title: string) => {
    dispatch(getApplicationsAsync({ title })).then((res) => {});
    return (
      <ModalOverlay
        bg="none"
        backdropFilter="auto"
        backdropInvert="80%"
        backdropBlur="2px"
      />
    );
  };

  const handleClick = (title: string, approved: boolean): void => {
    dispatch(updateJobAsync({ title, approved }))
      .then(() => {
        toast({
          title: "Success",
          description: "You approved this job.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((err) => console.error(err));
  };

  const handleClickAccept = (bid: Application): void => {
    const { jobId, userId } = bid;
    dispatch(applyRequestAsync({ jobId, id, userId })).then(() => {
      toast({
        title: "Success",
        description: "You applied.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    });
  };

  return (
    <TableContainer>
      <Table size="sm">
        <Thead textAlign="center">
          <Tr>
            <Th>No</Th>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Rate</Th>
            {authRole !== "FREELANCER" && <Th>Approved</Th>}
            {authRole !== "CLIENT" && <Th>Status</Th>}
            {authRole !== "CLIENT" && <Th>Bid</Th>}
            {authRole !== "FREELANCER" && <Th>Apply</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {jobs.map((job, index) => (
            <Tr
              key={index}
              onClick={() => {
                setOverlay(() => Two(job.title));
                if (role !== "FREELANCER") onOpen();
              }}
            >
              <Td>{index + 1}</Td>
              <Td>{job.title}</Td>
              <Td>{job.description}</Td>
              <Td>{job.rate}</Td>
              {authRole !== "FREELANCER" && (
                <Td>
                  <FormControl
                    display="flex"
                    alignItems="center"
                    className="center"
                  >
                    <Switch
                      id="approved"
                      size="sm"
                      onChange={() => handleClick(job.title, job.approved)}
                      defaultChecked={job.approved === true}
                    />
                  </FormControl>
                </Td>
              )}
              {authRole !== "CLIENT" && (
                <Td>
                  {applies.filter(
                    (apply) => apply.userId === id && apply.jobId === job.id
                  ).length
                    ? "working"
                    : "not working"}
                </Td>
              )}
              {authRole !== "CLIENT" && (
                <Td>
                  {" "}
                  {applies.filter(
                    (apply) => apply.userId === id && apply.jobId === job.id
                  )
                    ? "working"
                    : "not working"}
                </Td>
              )}
              {authRole !== "CLIENT" && (
                <Td>
                  <BidModal />
                </Td>
              )}
              {authRole !== "FREELANCER" && (
                <Td>
                  <FormControl
                    display="flex"
                    alignItems="center"
                    className="center"
                  >
                    <Switch
                      id="approved"
                      size="sm"
                      onChange={() => handleClick(job.title, job.approved)}
                      defaultChecked={job.approved === true}
                    />
                  </FormControl>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Bids</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {bids.length ? (
              bids.map((bid, index) => {
                return (
                  <div key={index}>
                    <p>Application Content: {bid.content}</p>
                    <span>Rate: {bid.rate}</span>
                    <Button
                      variant={"solid"}
                      ml="4"
                      onClick={() => {
                        handleClickAccept(bid);
                      }}
                      colorScheme={"teal"}
                      size={"sm"}
                    >
                      Accept
                    </Button>
                  </div>
                );
              })
            ) : (
              <span>No bids</span>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </TableContainer>
  );
};
