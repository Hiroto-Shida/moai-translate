import MoaiLangTable from "@/components/moaiLangTable/Main";
import Translation from "@/components/Translation";
import { Layout } from "@/components/layout/Layout";
import { InferGetServerSidePropsType, NextPage } from "next";
import Description from "@/components/Description";

const Page: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ apiKey }) => {
  return (
    <>
      <Layout>
        <Description />
        <Translation apiKey={apiKey} />
        <MoaiLangTable />
      </Layout>
    </>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {
      apiKey: process.env.GOO_LAB_API_KEY || "",
    },
  };
};

export default Page;
