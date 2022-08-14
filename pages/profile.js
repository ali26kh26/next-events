import { getSession } from "next-auth/react";
import React from "react";
import ProfileInfo from "../components/profile/Profile-info";

export default function ProfilePage({ session }) {
  return <ProfileInfo />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
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
