import { Box } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { getUsersAsync } from "../../redux/user/userSlice";
import { UserTable } from "../../components/user/userTable";

export default function UserList() {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);

  return (
    <>
      <Box
        sx={{
          ".chakra-table__container": { bg: "gray.50", color: "gray.700" },
        }}
        p={6}
      >
        <UserTable users={users} />
      </Box>
    </>
  );
}
