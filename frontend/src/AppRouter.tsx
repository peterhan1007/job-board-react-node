import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import SignInForm from "./views/signin/SignInForm";
import SignUpForm from "./views/signup/SignUpForm";
import UserList from "./views/user/User";
import Job from "./views/job/Job";
import Layout from "./components/layout";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getProfileWithTokenAsync } from "./redux/auth/authSlice";

const AuthRoute = () => (
  <Routes>
    <Route path="/sign-up" element={<SignUpForm />} />
    <Route path="/sign-in" element={<SignInForm />} />
    <Route path="/" element={<SignInForm />} />
  </Routes>
);

const AdminRoute = () => <Route path="users" element={<UserList />} />;

const AppRoute = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="jobs" element={<Job />} />
        {AdminRoute()}
      </Route>
    </Routes>
  </Layout>
);

const PrivateRoute = () => {
  const username = useAppSelector((state) => state.auth.username);

  return username ? <Outlet /> : <Navigate replace to="/sign-in" />;
};

const AppRouter = (): JSX.Element => {
  const username = useAppSelector((state) => state.auth.username);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("api-token");
    !!token && dispatch(getProfileWithTokenAsync({ token }));
  });

  return <Router>{username ? AppRoute() : AuthRoute()}</Router>;
};

export default AppRouter;
