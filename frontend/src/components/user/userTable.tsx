import * as React from "react";
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
} from "@chakra-ui/react";

import { User } from "../../redux/user/user.type";
import { useAppDispatch } from "../../app/hooks";
import { updateUserAsync } from "../../redux/user/userSlice";

export const UserTable = ({ users }: { users: User[] }) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const handleClick = (name: string, approved: boolean): void => {
    dispatch(updateUserAsync({ name, approved }))
      .then(() => {
        toast({
          title: "Success",
          description: "Admin approved this user.",
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
            <Th>Name</Th>
            <Th>Role</Th>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Rate</Th>
            <Th>Approved</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{user.name}</Td>
              <Td>{user.role}</Td>
              <Td>{user.title}</Td>
              <Td>{user.description}</Td>
              <Td>{user.rate}</Td>
              <Td>
                <FormControl
                  display="flex"
                  alignItems="center"
                  className="center"
                >
                  <Switch
                    id="approved"
                    size="sm"
                    onChange={() => handleClick(user.name, user.approved)}
                    defaultChecked={user.approved === true}
                  />
                </FormControl>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
