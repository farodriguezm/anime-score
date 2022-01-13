import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

interface Props {
  uri: string;
}

interface Anime {
  name: string;
  description: string;
  score: number;
}

const New = ({ uri }: Props) => {
  const router = useRouter();
  const [anime, setAnime] = useState({
    name: "",
    description: "",
  });

  const handlerChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setAnime({ ...anime, [name]: value });
  };

  const handlerSubmit = () => {
    createAnime({ ...anime, score: 0 });
    setAnime({
      name: "",
      description: "",
    });
  };

  const createAnime = async (anime: Anime) => {
    const response = await fetch(`${uri}/api/animes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(anime),
    });
    const result = await response.json();

    if (result.data?.id) router.push("/");
  };

  return (
    <Card>
      <CardContent>
        <Box>
          <TextField
            name="name"
            variant="outlined"
            label="Name"
            sx={{ width: "100%" }}
            value={anime.name}
            onChange={handlerChange}
          />
        </Box>
        <Box sx={{ marginTop: "1rem" }}>
          <TextField
            name="description"
            variant="outlined"
            label="Description"
            multiline
            rows={4}
            sx={{ width: "100%" }}
            value={anime.description}
            onChange={handlerChange}
          />
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "right" }}>
        <Button variant="contained" onClick={handlerSubmit}>
          Save
        </Button>
      </CardActions>
    </Card>
  );
};

export default New;
