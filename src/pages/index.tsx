import { GetServerSideProps } from "next";
import List from "src/components/Anime/List";
import { URI } from "src/env";
import { Anime } from "src/interfaces/Anime";

interface Props {
  animes: Anime[];
}

const Index = ({ animes }: Props) => <List animes={animes} />;

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${URI}/api/animes`);
  const result = await response.json();
  return {
    props: {
      animes: result.data,
    },
  };
};

export default Index;
