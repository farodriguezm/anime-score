import { Grid } from "@mui/material";
import { Anime } from "src/interfaces/Anime";
import CardItem from "./CardItem";

interface Props {
  animes: Anime[];
}

const List = ({ animes }: Props) => {
  return (
    <Grid container spacing={5}>
      {animes.map((el, index) => {
        return (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CardItem anime={el} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default List;
