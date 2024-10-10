import Home from "@/components/Home";
import Title from "@/components/Title";
import { InferGetServerSidePropsType, NextPage } from "next";

const Page: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ apiToken }) => {
  return (
    <>
      <Title />
      <Home apiToken={apiToken} />
    </>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {
      apiToken: process.env.GOO_LAB_API_KEY || "",
    },
  };
};

export default Page;
