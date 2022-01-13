import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { Anime } from "src/interfaces/Anime";

interface Props {
  anime: Anime;
}

const CardItem = ({ anime }: Props) => {
  const router = useRouter();

  return (
    <Card elevation={6} className="glass">
      <CardMedia
        component="img"
        height="150"
        image="https://picsum.photos/350/150"
        alt="..."
      />
      <CardContent>
        <Typography variant="subtitle1">{anime.name}</Typography>
        <Rating value={anime.score} precision={0.5} readOnly />
      </CardContent>
      <CardActions sx={{ justifyContent: "right" }}>
        <Button
          variant="contained"
          onClick={() => router.push(`/review/${anime.id}`)}
        >
          Make Review
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardItem;
