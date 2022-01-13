import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import New from "src/components/Review/New";
import { URI } from "src/env";

interface Props {
  uri: string;
}

const NewReview = ({ uri }: Props) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <New animeId={id as string} uri={uri} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      uri: URI,
    },
  };
};

export default NewReview;
