import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";
import Navbar from "./Navbar";
import ModalTrailer from "./ModalTrailer";
import CreateMovies from "./CardsMovies";
import ModalEdit from "./ModalEdit";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [modalTrailer, setModalTrailer] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [infoEdit, setInfoEdit] = useState({});

  const toggleTrailer = () => setModalTrailer(!modalTrailer);
  const toggleEdit = () => setModalEdit(!modalEdit);

  const editMovie = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const director = e.target.director.value;
    const classification = e.target.classification.value;
    const urlImg = e.target.urlImg.value;
    const urlTrailer = e.target.urlTrailer.value;
    const data = {
      name,
      director,
      classification,
      urlImg,
      urlTrailer,
    };
    fetch(`/api/movies/${infoEdit._id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      toggleEdit();
      getMovies();
    });
  };

  const getMovies = () => {
    return fetch("/api/movies", {
      method: "GET",
    })
      .then((result) => result.json())
      .then((data) => setMovies(data));
  };

  const deleteMovie = (id) => {
    return fetch(`/api/movies/${id}`, {
      method: "DELETE",
    });
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <Navbar getMovies={getMovies} />
      <Row
        style={{ justifyContent: "center", marginTop: "8rem" }}
        className="d-flex"
      >
        <CreateMovies
          movies={movies}
          setTrailer={setTrailer}
          toggleTrailer={toggleTrailer}
          setInfoEdit={setInfoEdit}
          toggleEdit={toggleEdit}
          deleteMovie={deleteMovie}
          getMovies={getMovies}
        />
      </Row>
      <ModalTrailer
        modalTrailer={modalTrailer}
        toggleTrailer={toggleTrailer}
        trailer={trailer}
      />
      <ModalEdit
        modalEdit={modalEdit}
        toggleEdit={toggleEdit}
        editMovie={editMovie}
        infoEdit={infoEdit}
      />
    </>
  );
};

export default Movies;
