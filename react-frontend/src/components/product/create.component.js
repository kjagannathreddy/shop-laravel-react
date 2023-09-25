import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import appUrl from '../../config.js';

export default function CreateProduct() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [validationError,setValidationError] = useState({});

  const changeHandler = (event) => {
		setImage(event.target.files[0]);
	};

  const isValidFloat = (value) => {
    // Use parseFloat and isNaN to validate float input
    const floatValue = parseFloat(value);
    return !isNaN(floatValue);
  };

  const handlePriceChange = (event) => {
    const inputValue = event.target.value;
    // Validate the input using a custom function
    if (isValidFloat(inputValue)) {
      setPrice(parseFloat(inputValue));
      setValidationError({ ...validationError, price: '' }); // Clear the error for the price field
    } else {
      setValidationError({ ...validationError, price: 'Please enter a valid float number.' }); // Set validation error for the price field
    }
  };

  const createProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('price', price);
    formData.append('category', category);

    await axios.post(`${appUrl.api}products`, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Create Product</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={createProduct}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} onChange={(event)=>{
                              setTitle(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={(event)=>{
                              setDescription(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Image" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={changeHandler} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row> 
                    <Col>
                      <Form.Group controlId="Price">
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                            type="text"
                            value={price}
                            onChange={handlePriceChange}
                            isInvalid={!!validationError.price}
                          />
                          <Form.Control.Feedback type="invalid">
                            {validationError.price}
                          </Form.Control.Feedback>
                      </Form.Group>
                    </Col>  
                  </Row>
                  <Row> 
                    <Col>
                      <Form.Group controlId="Category">
                          <Form.Label>Category</Form.Label>
                          <Form.Control
                            type="text"
                            value={category}
                            onChange={(event)=>{
                              setCategory(event.target.value)
                            }}
                          />
                      </Form.Group>
                    </Col>  
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Save
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}