import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  Row,
  ButtonGroup,
} from "reactstrap";
import {
  AiOutlinePlusCircle,
  AiOutlineCloseCircle,
  AiFillEdit,
  AiFillDelete,
} from "react-icons/ai";

const Navegation = ({ getMovies }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalClassification, setModalClassification] = useState(false);
  const [classifications, setClassifications] = useState([]);
  const [nestedModal, setNestedModal] = useState(false);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
  };

  const toggleClassification = () =>
    setModalClassification(!modalClassification);
  const toggleEdit = () => setModalEdit(!modalEdit);

  const toggle = () => setIsOpen(!isOpen);

  const getClassifications = () => {
    return fetch("/api/classification", {
      method: "GET",
    })
      .then((result) => result.json())
      .then((data) => createClassifications(data));
  };

  const editClassification = (e, id) => {
    e.preventDefault();
    const name = e.target.name.value;
    const data = {
      name,
    };
    fetch(`/api/classification/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      getClassifications();
    });
  };

  const deleteClassification = (id) => {
    fetch(`/api/classification/${id}`, {
      method: "DELETE",
    }).then((r) => getClassifications());
  };

  const newClassification = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const data = {
      name,
    };
    fetch(`/api/classification`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      getClassifications();
      toggleNested();
    });
  };

  useEffect(() => {
    getClassifications();
  }, []);

  const createClassifications = (classifications) => {
    const htmlClassifications = [];
    classifications.forEach((classification) => {
      htmlClassifications.push(
        <Form
          onSubmit={(e) => {
            editClassification(e, classification._id);
          }}
        >
          <FormGroup style={{ marginBottom: "1rem" }} className="d-flex">
            <Col style={{ marginLeft: "1rem" }} xs="2">
              <Label sm={2} for="name">
                {classification.name || ""}
              </Label>
            </Col>
            <Col style={{ marginLeft: "1rem" }} xs="auto">
              <Input type="text" name="name" id="name" defaultValue={""} />
            </Col>
            <Col style={{ marginLeft: "1rem" }} xs="auto">
              <ButtonGroup>
                <Button value="Submit">
                  <AiFillEdit />
                </Button>
                <Button
                  onClick={() => deleteClassification(classification._id)}
                >
                  <AiFillDelete />
                </Button>
              </ButtonGroup>
            </Col>
          </FormGroup>
        </Form>
      );
    });
    setClassifications(htmlClassifications);
  };

  const newMovie = (e) => {
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
    fetch(`/api/movies`, {
      method: "POST",
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

  return (
    <div>
      <Navbar
        style={{
          overflow: "hidden",
          position: "fixed",
          top: "0",
          width: "100%",
          zIndex: 1,
          background: "steelblue",
        }}
        light
        expand="md"
      >
        <NavbarBrand style={{ marginLeft: "2rem" }} href="/">
          Movies
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink style={{ cursor: "pointer" }} onClick={toggleEdit}>
                Create Movie
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                onClick={toggleClassification}
              >
                Manage Classifications
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <Modal isOpen={modalEdit} toggle={toggleEdit}>
          <ModalHeader toggle={toggleEdit}>Movie</ModalHeader>
          <ModalBody>
            <Form onSubmit={newMovie}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" defaultValue={""} />
              </FormGroup>
              <FormGroup>
                <Label for="director">Director</Label>
                <Input
                  type="text"
                  name="director"
                  id="director"
                  defaultValue={""}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="classification">Classification</Label>
                <Input
                  type="text"
                  name="classification"
                  id="classification"
                  defaultValue={""}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="urlImg">URL Image</Label>
                <Input
                  type="text"
                  name="urlImg"
                  id="urlImg"
                  defaultValue={""}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="urlTrailer">Youtube URL</Label>
                <Input
                  type="text"
                  name="urlTrailer"
                  id="urlTrailer"
                  defaultValue={""}
                  required
                />
              </FormGroup>
              <Button style={{ marginTop: "1rem" }}>Submit</Button>
            </Form>
          </ModalBody>
        </Modal>
        <Modal isOpen={modalClassification} toggle={toggleClassification}>
          <ModalHeader style={{ justifyContent: "center" }} className="d-flex">
            <Row>
              <Modal isOpen={nestedModal} toggle={toggleNested}>
                <ModalHeader>Add Classification</ModalHeader>
                <ModalBody>
                  <Form onSubmit={newClassification}>
                    <FormGroup
                      style={{ marginBottom: "1rem" }}
                      className="d-flex"
                    >
                      <Col style={{ marginLeft: "1rem" }} xs="2">
                        <Label sm={2} for="name">
                          Name
                        </Label>
                      </Col>
                      <Col style={{ marginLeft: "1rem" }} xs="auto">
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          defaultValue={""}
                        />
                      </Col>
                      <Col style={{ marginLeft: "1rem" }} xs="auto">
                        <ButtonGroup>
                          <Button value="Submit">
                            <AiOutlinePlusCircle />
                          </Button>
                          <Button onClick={toggleNested}>
                            <AiOutlineCloseCircle />
                          </Button>
                        </ButtonGroup>
                      </Col>
                    </FormGroup>
                  </Form>
                </ModalBody>
              </Modal>
              <Col>Classifications</Col>
              <Col style={{ marginLeft: "1rem" }} xs="auto">
                <ButtonGroup onClick={toggleNested}>
                  <Button>
                    <AiOutlinePlusCircle size="1.5rem" />
                  </Button>
                  <Button onClick={toggleClassification}>
                    <AiOutlineCloseCircle size="1.5rem" />
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </ModalHeader>
          <ModalBody>{classifications}</ModalBody>
        </Modal>
      </Navbar>
    </div>
  );
};

export default Navegation;
