import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import { init } from "../../redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import JobModal from "../job/jobModal";
import ProfileModal from "../user/profileModal";

const NavLink = ({ children }: { children: string }) => (
  <ReachLink to={`${children.toLowerCase()}`}>{children}</ReachLink>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.auth.username);
  const role = useAppSelector((state) => state.auth.role);
  const Links = ["Dashboard", "Jobs"];

  if (username === "admin") Links.push("users");

  const handleClickSignOut = () => {
    localStorage.clear();
    navigate("/sign-in");
    dispatch(init());
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {role !== ("FREELANCER" || "ADMIN") && <JobModal />}
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList className="width">
                <MenuItem>
                  <ProfileModal />
                </MenuItem>
                <MenuItem onClick={handleClickSignOut}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={7} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
