import MoaiLangTable from "@/components/moaiLangTable/Main";
import Translation from "@/components/Translation";
import { Layout } from "@/components/layout/Layout";
import { InferGetServerSidePropsType, NextPage } from "next";
import Description from "@/components/Description";

const Page: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({}) => {
  return (
    <>
      <Layout>
        <Description />
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
