import React, { useState } from "react";
import { Modal, Button, Form, ListGroup, Dropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const CardDetailModal = (props) => {
  const [ label, setLabel ] = useState('');
  const [ comment, setComment ] = useState('');
  const [ comments, setComments ] = useState([]);
  const [ isCommentSaved, setIsCommentSaved ] = useState(false);
  const commentArray = [...comments];

  const handleSelect = (e) => {
    setLabel(e);
  }

  const onSave = () => {
    commentArray.push(comment);
    
    setComments(commentArray);
    setIsCommentSaved(true);
  };

  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Label
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="green">Low Priority</Dropdown.Item>
            <Dropdown.Item eventKey="yellow">Warning</Dropdown.Item>
            <Dropdown.Item eventKey="red">Urgent</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <br></br>
        {label === 'green' && <Button variant="success" onClick={props.onHide}>Low Priority</Button>}
        {label === 'yellow' && <Button variant="warning" onClick={props.onHide}>Warning</Button>}
        {label === 'red' && <Button variant="danger" onClick={props.onHide}>Urgent</Button>}
      </Modal.Body>

      <Modal.Body>
        <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control 
              as="textarea" 
              rows={3} 
              placeholder="Add comment"
              onChange={e => setComment(e.target.value)}
            />
          </Form.Group>
          <Button variant="success" onClick={onSave}>Save</Button>
        </Form>
      </Modal.Body>
      
      <Modal.Body>
        <h4>Comments</h4>
        {isCommentSaved && 
        <ListGroup>
          {comments.map((item) => {
            return <ListGroup.Item>{item}</ListGroup.Item>
          })}
        </ListGroup>
        }
      </Modal.Body>
    </Modal>
  );
}

export default CardDetailModal;