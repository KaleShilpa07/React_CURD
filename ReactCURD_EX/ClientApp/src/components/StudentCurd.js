import React, { Fragment, useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton } from '@mui/material';

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { getData } from "ajv/dist/compile/validate";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import "react-toastify/dist/ReactToastify.css";

const StudentCurd = () => {
    const useIsDarkMode = () => {
        const theme = useTheme();
        return theme.palette.mode === 'dark';
    };
    const isDarkMode = useIsDarkMode();
    const [currentPhotoUrl, setCurrentPhotoUrl] = useState("");
     const [previewData, setPreviewData] = useState(false);
   
    // Add a new state for storing the selected file
    const [selectedFile, setSelectedFile] = useState(null);

    // Handler for file input change
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    const handleEditFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };


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
      const handleCloseDialog = () => { setOpen(false); };

    //
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEditModal = () => {
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

//
    const [showPreviewModal, setShowPreviewModal] = useState(false);

    const handlePreviewModal = () => {
        setShowPreviewModal(true);
    };

    const handleClosePreviewModal = () => {
        setShowPreviewModal(false);
    };
  //
    //Delete Data
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
    
    const [Name, SetName] = useState("");
    const [Age, SetAge] = useState("");
    const [Adress, SetAddress] = useState("");
    const [Class, SetClass] = useState("");

    const [Editid, SetEditid] = useState("");
    const [Editname, SetEditName] = useState("");
    const [EditAge, SetEditAge] = useState("");
    const [EditAddress, SetEditAddress] = useState("");
    const [EditClass, SetEditClass] = useState("");
    const [EditPhotoBase64, SetEditPhotoBase64] = useState("");

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
    // Function to convert a file to base64
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                resolve(reader.result.split(',')[1]); // Extract base64 part
            };

            reader.onerror = (error) => {
                reject(error);
            };
        });
    };
    //Save Data
    const HandleSave = async () => {
        const url1 = "https://localhost:7195/api/home";
        const formData = {
            Name: Name,
            Age: Age,
            Adress: Adress,
            Class: Class,
            PhotoBase64: selectedFile ? await getBase64(selectedFile) : null,
        };

        axios.post(url1, formData)
            .then((result) => {
                getData();
                Clear();
                console.log("Add data:", formData)
                toast.success("Student Add Successfully..");
            })
            .catch((error) => {
                console.error(error);
                toast.error("Error adding student");
            });
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
        SetEditPhotoBase64("");
    };
    const handleUpdate = async (id) => {
        const updatedData = {
            id: Editid,
            Name: Editname,
            Age: EditAge,
            Adress: EditAddress,
            Class: EditClass,
            //Photo: currentPhotoUrl.split(',')[1], // Extract base64 part
            PhotoBase64: currentPhotoUrl ? await getBase64(selectedFile) : null,
        };

        axios
            .put(`https://localhost:7195/api/home/${id}`, updatedData)
            .then((response) => {
                toast.success("Data updated successfully");
                // Close the modal after successful update
                refreshPage();
            })
            .catch((error) => {
                console.error(error);
                toast.error("Error updating data");
            });
    };
    const HandleEdit = (id) => {
        handleEditModal();
        axios
            .get(`https://localhost:7195/api/home/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((result) => {
                SetEditPhotoBase64(result.data.PhotoBase64);
                SetEditName(result.data.name);
                SetEditAge(result.data.age);
                SetEditAddress(result.data.adress);
                SetEditClass(result.data.class);
                setCurrentPhotoUrl(`data:image/png;base64,${result.data.photo}`);
                SetEditid(id);
               setShowEditModal(true); // You might need this line if you want to ensure the modal is visible after fetching data
            })
            .catch((error) => {
                console.error(error);
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

    const HandlePreview = (id) => {
        handlePreviewModal();
        
        axios
            .get(`https://localhost:7195/api/home/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((result) => {
                setPreviewData(result.data);
                // Open the preview modal
                setShowPreviewModal(true);
               
                 })
            .catch((error) => {
                console.error(error);
                toast.error("Error fetching student data for preview");
            });
    };


    const [showAddModal, setAddShowModal] = useState(false);

    const handleAddShowModal = () => {
        setAddShowModal(true);
    };

    const handleAddCloseModal = () => {
        setAddShowModal(false);
    };

    useEffect(() => {
        Getdata();

    }, [searchTerm]);

    const Getdata = () => {
        axios
            .get("https://localhost:7195/api/home")
            .then((result) => {
                /* Setdata(result.data);*/
                Setdata(result.data.map(item =>
                    ({ ...item, photoBase64: item.PhotoBase64 })));
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
                    <Col lg={4} md={8} style={{ position: 'fixed', width: '20%', marginLeft: '860px' }} >
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search here.."
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Col>
                    <Col lg={2} md={10} style={{ position: 'fixed', width: '20%', marginLeft: '1100px' }}>
                        <button className="btn btn-outline-success" type="submit" onClick={handleSearch}>
                            Search
                        </button>
                    </Col>

                </Row>
                
            </Container>
            <Row> <div> <IconButton color="btn btn-outline-Success" style={{ color: 'green' }} onClick={handleAddShowModal}>
                    <AddCircleOutlineIcon />Add
            </IconButton> </div></Row>
            <br></br>


            <Modal show={showAddModal} onHide={handleAddCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add New Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col lg={5} md={7}>
                            <input
                                type="Text"
                                className="form-control"
                                placeholder="Name"
                                value={Name}
                                onChange={(e) => SetName(e.target.value)}
                            />
                        </Col>
                        <Col lg={7} md={5}>
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
                        <Col lg={3} md={9}>
                            <input
                                type="Text"
                                className="form-control"
                                placeholder="Age"
                                value={Age}
                                onChange={(e) => SetAge(e.target.value)}
                            />
                        </Col>
                        <Col lg={3} md={9}>
                            <input
                                type="Text"
                                className="form-control"
                                placeholder="Class"
                                value={Class}
                                onChange={(e) => SetClass(e.target.value)}
                            />
                        </Col>
                        <Col lg={6} md={6}>
                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) => handleFileChange(e)}
                            /></Col>
                        <br />
                       
                        

                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddCloseModal}>
                        Close
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => {
                            HandleSave();
                            refreshPage();
                            handleAddCloseModal();
                        }}
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            <Table striped bordered>
                <thead>
                    <tr>
                       {/* <th>No</th>*/}
                        <th>Name</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Class</th>
                        <th>Photo</th>

                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0
                        ? data.map((item, index) => {
                            return (
                                <>
                                    <tr key={index} >
                                      {/*  <td>{index + 1}</td>*/}
                                        <td>{item.name}</td>
                                        <td>{item.age}</td>
                                        <td>{item.adress}</td>
                                        <td>{item.class}</td>
                                        <td>
                                            <div style={{ maxWidth: '50px', maxHeight: '50px', overflow: 'hidden' }}>
                                                {item.photo !== null ? (
                                                    <img
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        src={`data:image/png;base64,${item.photo}`}
                                                        alt={`${item.name}`}
                                                        onClick={() => HandlePreview(item.id)}
                                                    />
                                                ) : (
                                                    ".."
                                                )}
                                            </div>
                                        </td>
                                        <td colSpan={2}>
                                            <IconButton color="primary" onClick={handleAddShowModal}>
                                                <AddCircleOutlineIcon />
                                            </IconButton>
                                            <EditIcon
                                                style={{ cursor: 'pointer', color: 'blue' }} // Set color or other styles as needed
                                                onClick={() => HandleEdit(item.id)}
                                            ></EditIcon>

                                            &nbsp;
                                            <VisibilityIcon
                                                onClick={() => HandlePreview(item.id)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                            &nbsp;
                                            <DeleteIcon
                                                onClick={() => {
                                                    HandleDelete(item.id);
                                                }}
                                                style={{ cursor: 'pointer', color: 'red' }} // Customize the color
                                            />
                                        </td>
                                    </tr>
                                </>
                            );
                        })
                        : "...Loading"}
                </tbody>
            </Table>

            {/* New modal for preview */}
           
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
                        variant="danger"
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <div>  <Modal show={showPreviewModal} onHide={handleClosePreviewModal} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Student Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {previewData && (
                        <div>
                            <p>Name: {previewData.name}</p>
                            <p>Age: {previewData.age}</p>
                            <p>Address: {previewData.adress}</p>
                            <p>Class: {previewData.class}</p>
                            {previewData.photo && (
                                <img
                                    src={`data:image/png;base64,${previewData.photo}`}
                                    alt={`Photo of ${previewData.name}`}
                                    style={{ maxWidth: '100%', maxHeight: '400px' }}
                                />
                            )}
                        </div>
                    )}
                </Modal.Body>
            </Modal> </div>
            <div>  <Modal show={showEditModal} onHide={handleCloseEditModal} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Update/Edit Student</Modal.Title>
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
                        <br></br>&nbsp;

                        {/*Display the current photo */}
                        {currentPhotoUrl && (
                            <img
                                src={currentPhotoUrl}
                                alt="Current Photo"
                                style={{ maxWidth: '100%', maxHeight: '200px' }}
                            />
                        )}
                        &nbsp;
                        <input
                            type="file"
                            onChange={(e) => handleEditFileChange(e)}
                        />
                    </Row>

                    <br></br>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
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
            </Modal> </div>
        </Fragment>
    );
};
export default StudentCurd;