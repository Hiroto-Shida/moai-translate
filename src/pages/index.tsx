import Home from "@/components/Home";
import Title from "@/components/Title";
import { InferGetServerSidePropsType, NextPage } from "next";

const Page: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({}) => {
  return (
    <>
      {/* <Title /> */}
      <Home />
    </>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Page;
