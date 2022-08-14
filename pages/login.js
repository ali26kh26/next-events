import { getSession } from "next-auth/react";
import LoginForm from "../components/login/login-form/Login-form";

const LoginPage = ({ session }) => {
  return <LoginForm />;
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        session,
      },
    };
  }
}
export default LoginPage;
