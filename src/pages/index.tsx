import MoaiLangTable from "@/components/moaiLangTablea/Main";
import Translation from "@/components/Translation";
import { Layout } from "@/components/layout/Layout";
import { InferGetServerSidePropsType, NextPage } from "next";

const Page: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({}) => {
  return (
    <>
      <Layout>
        <Translation />
        <MoaiLangTable />
      </Layout>
    </>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Page;
