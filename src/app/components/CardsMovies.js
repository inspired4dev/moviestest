import React from "react";
import {
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  ButtonToolbar,
  ButtonGroup,
  Button,
} from "reactstrap";
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
function CardsMovies({
  movies,
  setTrailer,
  toggleTrailer,
  setInfoEdit,
  toggleEdit,
  deleteMovie,
  getMovies,
}) {
  const moviesCards = movies.map((movie) => {
    const { _id, name, director, classification, urlImg, urlTrailer } = movie;
    return (
      <Col
        style={{
          margin: "0.5rem",
        }}
        key={_id}
        xs="3"
      >
        <Card>
          <CardImg
            top
            style={{ objectFit: "cover", height: "350px" }}
            width="100%"
            src={urlImg}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle tag="h5">{name}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {classification}
            </CardSubtitle>
            <CardText>{`Director: ${director}`}</CardText>
            <ButtonToolbar>
              <ButtonGroup>
                <Button
                  onClick={() => {
                    setTrailer(urlTrailer);
                    toggleTrailer();
                  }}
                >
                  <AiFillEye />
                </Button>
                <Button
                  onClick={() => {
                    setInfoEdit(movie);
                    toggleEdit();
                  }}
                >
                  <AiFillEdit />
                </Button>
                <Button
                  onClick={() => {
                    deleteMovie(_id).then((result) => getMovies());
                  }}
                >
                  <AiFillDelete />
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </CardBody>
        </Card>
      </Col>
    );
  });
  return moviesCards;
}

export default CardsMovies;
