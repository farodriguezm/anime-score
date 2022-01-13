import { GetServerSideProps } from "next";
import New from "src/components/Anime/New";
import { URI } from "src/env";

interface Props {
  uri: string;
}

const Index = ({ uri }: Props) => {
  return <New uri={uri} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      uri: URI,
    },
  };
};

export default Index;
