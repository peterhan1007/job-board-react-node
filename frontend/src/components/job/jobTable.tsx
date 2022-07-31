import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Switch,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { Job } from "../../redux/job/job.type";
import { updateJobAsync } from "../../redux/job/jobSlice";

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
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {jobs.map((job, index) => (
            <Tr key={index}>
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
              <Td>{job.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
