import { Route } from "react-router-dom";
import SignInForm from "../../views/signin/SignInForm";

function SignIn() {
  return <Route path="/sign-in" element={<SignInForm />} />;
}

export default SignIn;
