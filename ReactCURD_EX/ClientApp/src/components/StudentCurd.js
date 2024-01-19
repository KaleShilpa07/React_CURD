import React, { Fragment, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { getData } from "ajv/dist/compile/validate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,

} from "@mui/material";
const StudentCurd = () => {

        const [searchTerm, setSearchTerm] = useState('');

        const handleSearch = () => {
            axios.get(`https://localhost:7195/api/home/search?searchTerm=${searchTerm}`)
                .then((result) => {
                    Setdata(result.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };




  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const handleClickOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const HandleDelete = (id) => {
    handleClickOpen(id);
  };
  const confirmDelete = () => {
    axios
      .delete(`https://localhost:7195/api/home/${deleteId}`)
      .then((result) => {
        if (result.status === 200) {
          toast.success("Student Delete SuccessFully..");
        }
        handleCloseDialog(); // Close the confirmation dialog
      })
      .catch((error) => {
        toast.error(error);
        handleCloseDialog(); // Close the confirmation dialog
      });
  };
  const [data, Setdata] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Name, SetName] = useState("");
  const [Age, SetAge] = useState("");
  const [Adress, SetAddress] = useState("");
  const [Class, SetClass] = useState("");

  const [Editid, SetEditid] = useState("");
  const [Editname, SetEditName] = useState("");
  const [EditAge, SetEditAge] = useState("");
  const [EditAddress, SetEditAddress] = useState("");
  const [EditClass, SetEditClass] = useState("");

  //Insert dummy data into table...
  // const rows = [
  //   {
  //     id: 1,
  //     Name: "Swara",
  //     age: 23,
  //     Address: "pune",
  //     Class: "second",

  //   },
  //   {
  //     id: 2,
  //     Name: "Sunita",
  //     age: 23,
  //     Address: "pune",
  //     Class: "second",

  //   },
  //   {
  //     id: 3,
  //     Name: "Mira",
  //     age: 23,
  //     Address: "pune",
  //     Class: "second",

  //   },
  // ];

  const refreshPage = () => {
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  };

  const HandleSave = () => {
    const url1 = "https://localhost:7195/api/home";
    const data = {
      name: Name,
      age: Age,
      adress: Adress,
      class: Class,
    };
    axios.post(url1, data).then((result) => {
      getData();
      Clear();
    });
    toast.success("Student Add SuccessFully..");
  };

  const Clear = () => {
    SetName("");
    SetAddress("");
    SetAge("");
    SetClass("");
    SetEditid("");
    SetEditName("");
    SetEditAge("");
    SetEditAddress("");
    SetEditClass("");
  };
  const handleUpdate = (id) => {
    const updatedData = {
      id: Editid,
      Name: Editname,
      Age: EditAge,
      Adress: EditAddress,
      Class: EditClass,
    };

    axios
      .put(`https://localhost:7195/api/home/${id}`, updatedData)
      .then((response) => {
        // Handle successful update
        toast.success("Data updated successfully");
        handleClose(); // Close the modal after successful update
        refreshPage();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error updating data");
      });
  };
  const HandleEdit = (id) => {
    handleShow();

    axios
      .get(`https://localhost:7195/api/home/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        SetEditName(result.data.name);
        SetEditAge(result.data.age);
        SetEditAddress(result.data.adress); // Make sure this matches the actual property name from the API response
        SetEditClass(result.data.class);
        SetEditid(id); // You don't need to set the id if it's already in the URL
      })
      .catch((error) => {
        console.error(error); // Log any errors to the console
        toast.error("Error fetching student data for edit");
      });
  };
  // const HandleDelete = (id) => {
  //   if (window.confirm("Are You sure to delete Student...") === true) {
  //     axios
  //       .delete(`https://localhost:7195/api/home/${id}`)
  //       .then((result) => {
  //         if (result.status === 200) {
  //           toast.success("Student Delete SuccessFully..");
  //           refreshPage();
  //         }
  //       })
  //       .catch((error) => {
  //         toast.error(error);
  //       });
  //   }
  // };
  
  useEffect(() => {
    Getdata();
    
  }, [searchTerm]);

  const Getdata = () => {
    axios
      .get("https://localhost:7195/api/home")
      .then((result) => {
        Setdata(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Fragment>
      <br></br>
      <ToastContainer />

      <Container>
        <Row>
          <h2>Add New Records:</h2>
          <Col lg={2} md={8}>
            <input
              type="Text"
              className="form-control"
              placeholder="Name"
              value={Name}
              onChange={(e) => SetName(e.target.value)}
            />
          </Col>
          <Col lg={4} md={8}>
            <input
              type="Text"
              className="form-control"
              placeholder="Address"
              value={Adress}
              onChange={(e) => SetAddress(e.target.value)}
            />
          </Col>
         
        </Row>
        <br></br>
        <Row>
          <Col lg={2} md={10}>
            <input
              type="Text"
              className="form-control"
              placeholder="Age"
              value={Age}
              onChange={(e) => SetAge(e.target.value)}
            />
          </Col>
          <Col lg={2} md={10}>
            <input
              type="Text"
              className="form-control"
              placeholder="Class"
              value={Class}
              onChange={(e) => SetClass(e.target.value)}
            />
          </Col>
          <br />

          <Col >
            <button
              className="btn btn-success"
              onClick={() => {
                HandleSave();
                refreshPage();
              }}
            >
              Submit
            </button>
          </Col>
          <Col lg={4} md={8} style={{ position: 'fixed', width: '20%', marginLeft: '860px' }} >
            <input
                          class="form-control"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col lg={2} md={10} style={{ position: 'fixed', width: '20%', marginLeft: '1100px' }}>
                      <button class="btn btn-outline-success" type="submit" onClick={handleSearch}>
              Search
            </button>
          </Col>

        </Row>
        
      </Container>

      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Class</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0
            ? data.map((item, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.adress}</td>
                      <td>{item.class}</td>

                      <td colSpan={2}>
                        <button
                          className="btn btn-primary"
                          onClick={() => HandleEdit(item.id)}
                        >
                          Edit
                        </button>
                        &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            HandleDelete(item.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })
            : "...Loading"}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update/Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={10} md={6}>
              <input
                type="Text"
                className="form-control"
                placeholder="Editname"
                value={Editname}
                onChange={(e) => SetEditName(e.target.value)}
              />
            </Col>
            <Col xs={10} md={6}>
              <input
                type="Text"
                className="form-control"
                placeholder="EditAddress"
                value={EditAddress}
                onChange={(e) => SetEditAddress(e.target.value)}
              />
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col xs={10} md={6}>
              <input
                type="Text"
                className="form-control"
                placeholder="EditAge"
                value={EditAge}
                onChange={(e) => SetEditAge(e.target.value)}
              />
            </Col>
            <Col xs={10} md={6}>
              <input
                type="Text"
                className="form-control"
                placeholder="EditClass"
                value={EditClass}
                onChange={(e) => SetEditClass(e.target.value)}
              />
            </Col>
          </Row>

          <br></br>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleUpdate(Editid);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this student?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              confirmDelete();
              refreshPage();
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default StudentCurd;
