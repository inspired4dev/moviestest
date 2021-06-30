import React from "react";
import {
    Button,
    ModalHeader,
    ModalBody,
    Modal,
    Form,
    FormGroup,
    Label,
    Input,
  } from "reactstrap";

function ModalEdit({ modalEdit, toggleEdit, editMovie, infoEdit }) {
  return (
    <Modal isOpen={modalEdit} toggle={toggleEdit}>
      <ModalHeader toggle={toggleEdit}>Movie</ModalHeader>
      <ModalBody>
        <Form onSubmit={editMovie}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              defaultValue={infoEdit.name || ""}
            />
          </FormGroup>
          <FormGroup>
            <Label for="director">Director</Label>
            <Input
              type="text"
              name="director"
              id="director"
              defaultValue={infoEdit.director || ""}
            />
          </FormGroup>
          <FormGroup>
            <Label for="classification">Classification</Label>
            <Input
              type="text"
              name="classification"
              id="classification"
              defaultValue={infoEdit.classification || ""}
            />
          </FormGroup>
          <FormGroup>
            <Label for="urlImg">URL Image</Label>
            <Input
              type="text"
              name="urlImg"
              id="urlImg"
              defaultValue={infoEdit.urlImg || ""}
            />
          </FormGroup>
          <FormGroup>
            <Label for="urlTrailer">Youtube URL</Label>
            <Input
              type="text"
              name="urlTrailer"
              id="urlTrailer"
              defaultValue={infoEdit.urlTrailer || ""}
            />
          </FormGroup>
          <Button style={{ marginTop: "1rem" }}>Submit</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
}

export default ModalEdit;
