// PosterManagement.js
import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Card,
  Container,
  Row,
  Col,
  Alert,
  InputGroup,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import { getPosters, addPoster, deletePoster } from "../hooks/usePosters";
import "./PosterManagement.css";

const PosterManagement = () => {
  const appUrl = import.meta.env.VITE_API_URL;
  const [posters, setPosters] = useState([]);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPosters();
  }, []);

  const fetchPosters = async () => {
    const data = await getPosters();
    setPosters(data);
  };

  const handleAddPoster = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    await addPoster(formData);
    fetchPosters();
    handleClose();
  };

  const handleDeletePoster = async (id) => {
    await deletePoster(id);
    fetchPosters();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filteredPosters = posters.filter((poster) =>
    poster.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <div className="text-center my-4">
        <Button
          variant="primary"
          onClick={handleShow}
          className="btn-add-poster"
        >
          +
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Poster</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" onClick={handleAddPoster}>
                Add Poster
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by title"
          aria-label="Search by title"
          aria-describedby="basic-addon2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>

      {filteredPosters.length === 0 ? (
        <Alert variant="info" className="text-center">
          No posters available. Click the "+" button to add a new poster.
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredPosters.map((poster) => (
            <Col key={poster._id}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={appUrl + `/uploads/${poster.image.filename}`}
                  className="card-img-top"
                />
                <Card.Body>
                  <Card.Title>{poster.title}</Card.Title>
                  <Card.Text>{poster.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    {new Date(poster.createdAt).toLocaleString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </small>
                  <Dropdown className="float-end">
                    <Dropdown.Toggle variant="link" id="dropdown-basic">
                      <i className="fas fa-ellipsis-h"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => handleDeletePoster(poster._id)}
                      >
                        Delete
                      </Dropdown.Item>
                      {/* Add more options as needed */}
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default PosterManagement;
