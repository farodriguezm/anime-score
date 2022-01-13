import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Rating,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

interface Props {
  animeId: string;
  uri: string;
}

interface Review {
  content: string;
  score: number;
  animeId: string;
}

const New = ({ animeId, uri }: Props) => {
  const router = useRouter();
  const [review, setReview] = useState({
    content: "",
    score: 0,
  });

  const handlerChange = (e: any) => {
    if (e.target.name == "score") {
      setReview({ ...review, [e.target.name]: parseFloat(e.target.value) });
    } else {
      setReview({ ...review, [e.target.name]: e.target.value });
    }
  };

  const handlerSubmit = () => {
    if (review.score > 0) {
      sendReview({ ...review, animeId });
      setReview({
        content: "",
        score: 0,
      });
    }
  };

  const sendReview = async (review: Review) => {
    const response = await fetch(`${uri}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });
    const result = await response.json();

    if (result.data?.id) router.push("/");
  };

  return (
    <Card elevation={6}>
      <CardContent>
        <Box>
          <TextField
            name="content"
            label="Review"
            multiline
            rows={4}
            sx={{ width: "100%" }}
            value={review.content}
            onChange={handlerChange}
          />
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "right", marginTop: "0.5rem" }}
        >
          <Rating
            name="score"
            precision={0.5}
            value={review.score}
            onChange={handlerChange}
          />
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "right" }}>
        <Button variant="contained" onClick={handlerSubmit}>
          Send Review
        </Button>
      </CardActions>
    </Card>
  );
};

export default New;
