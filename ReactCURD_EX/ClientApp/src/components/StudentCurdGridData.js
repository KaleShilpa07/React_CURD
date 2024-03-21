import React, { Fragment, useState, useEffect } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Form, Modal, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import "react-toastify/dist/ReactToastify.css";


import AddStudentValidations from "./Validations/AddStudentValidations";

const StudentCurdGridData = () => {

    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };
    const [Degree, SetDegree] = useState([]);
    const [selectedDegree, setSelectedDegree] = useState("");
    const [courses, setCourses] = useState([]);
    const [CourceName, setSelectedCourse] = useState("");
    const [CourceCode, setSelectedCourseCode] = useState("");

    // fetchCoursesByDegree Dropdown code
    const handleEditCourseChange = (e) => {
        const selectedCourseName = e.target.value;
        SetEditCourceName(selectedCourseName);
        const selectedCourse = courses.find(course => course.courceName === selectedCourseName);
        if (selectedCourse) {
            SetEditCourceCode(selectedCourse.courceCode);
        } else {
            SetEditCourceCode("");
        }
    };
    const fetchCoursesByDegree = (degreeName) => {
        axios.get(`https://localhost:7195/api/home/GetCoursesByDegree/${degreeName}`)
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    };
    const handleDegreeChange = (e) => {
        const selectedDegree = e.target.value;
        SetEditDegree(selectedDegree);
        setSelectedDegree(selectedDegree);
        setSelectedCourse(""); // Clear selected course when degree changes
        setSelectedCourseCode(""); // Clear selected course code when degree changes

        fetchCoursesByDegree(selectedDegree);

    };
    const handleCourseChange = (e) => {
        const selectedCourceName = e.target.value;
        const selectedCourse = courses.find(course => course.courceName === selectedCourceName);
        if (selectedCourse) {
            setSelectedCourseCode(selectedCourse.courceCode);  // Set the selected course code
            setFormData(prevData => ({
                ...prevData,
                CourceName: selectedCourceName,
                CourceCode: selectedCourse.courceCode,  // Update the course code in the formData state
            }));
        }
        else {
            setSelectedCourseCode('');  // Reset the selected course code if no course is selected
            setFormData(prevData => ({
                ...prevData,
                CourceName: '',  // Clear the course name in the formData state
                CourceCode: '',  // Clear the course code in the formData state
            }));
        }
    };

     // Add a new state for storing the currentPhotoUrl
    const [currentPhotoUrl, setCurrentPhotoUrl] = useState("");
    const [previewData, setPreviewData] = useState(false);

    // Add a new state for storing the selected file
    const [selectedFile, setSelectedFile] = useState(null);

    // Handler for file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    }

    const handleEditFileChange = (e) => {
        SetEditPhotoBase64();
        setSelectedFile(e.target.files[0]);
    };
    // Function to convert a file to base64
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                resolve(reader.result.split(",")[1]); // Extract base64 part
            };

            reader.onerror = (error) => {
                reject(error);
            };
        });
    };

    //search data
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = () => {
        axios
            .get(`https://localhost:7195/api/home/search?searchTerm=${searchTerm}`)
            .then((result) => {
                Setdata(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState();

    const handleClickOpen = (id) => {  setDeleteId(id); setOpen(true); };
    const handleCloseDialog = () => { setOpen(false);  };

    //Edit modal
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEditModal = () => {setShowEditModal(true);  };
    const handleCloseEditModal = () => { setShowEditModal(false);};

    // Preview modal 
    const [showPreviewImage, setShowPreviewImage] = useState(false);
    const handlePreviewModalImage = () => { setShowPreviewImage(true); };
    const handleClosePreviewModalImage = () => {  setShowPreviewImage(false); };
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const handlePreviewModal = () => {  setShowPreviewModal(true);   };
    const handleClosePreviewModal = () => {  setShowPreviewModal(false);  };

    //Delete multiple records
    const [selectedRows, setSelectedRows] = useState([]);
    const handleDeleteSelectedRows = async () => {

        if (selectedRows.length === 0) {
            // If no rows are selected, show an error toast immediately
            //toast.error("Please select rows to delete multiple records", { position: "top-center" });
            return; // Return to exit the function early
        }
        axios.delete('https://localhost:7195/api/home/deleteMultiple', {
            data: selectedRows,

        }).then((result) => {
            if (result.status === 200) {
                toast.success("Student Delete SuccessFully..", { position: "top-center" });
            }
            handleCloseDialog(); // Close the confirmation dialog
        })
            .catch((error) => {
                //   toast.error("Please Select Row To Delete Multiple Records..", { position: "top-center" });
    });
    };
    const HandleMultiDelete = (id) => {   handleClickOpen(id);}
    const HandleDelete = (id) => {  handleClickOpen(id); };
    const confirmDelete = () => {
        axios
            .delete(`https://localhost:7195/api/home/${deleteId}`)
            .then((result) => {
                if (result.status === 200) {
                    toast.success("Student Delete SuccessFully..", { position: "top-center" });

                }
                handleCloseDialog(); // Close the confirmation dialog
            })
            .catch((error) => {

                handleCloseDialog(); // Close the confirmation dialog
            });
    };

    //select multiple checkboxes using id and delete rec
    const [selectAll, setSelectAll] = useState(false);

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        const allCheckbox = document.querySelectorAll('input[type="checkbox"][name="rowCheckbox"]');
        const selectedIds = [];

        allCheckbox.forEach((checkbox) => {
            checkbox.checked = isChecked;
            const itemId = parseInt(checkbox.value);
            if (isChecked) {
                selectedIds.push(itemId);
            }
            // Call handleCheckboxChange for each checkbox
            handleCheckboxChange({ target: checkbox });
        });

        // Update selected rows state with all item ids when "Select All" is checked
        setSelectedRows(isChecked ? selectedIds : []);
    }
    const handleCheckboxChange = (e) => {
        const itemId = parseInt(e.target.value);
        setSelectedRows((prev) =>
            e.target.checked
                ? [...prev, itemId]
                : prev.filter((id) => id !== itemId)
        );
    };

    // State variable to store data fetched from the server
    const [data, Setdata] = useState([]);
    // State variables for editing data
    const [Editid, SetEditid] = useState("");
    const [Editname, SetEditName] = useState("");
    const [EditAge, SetEditAge] = useState("");
    const [EditCity, SetEditCity] = useState("");
    const [EditDegree, SetEditDegree] = useState("");
    const [EditPhotoBase64, SetEditPhotoBase64] = useState("");
    const [EditDOB, SetEditDOB] = useState(new Date()); // Initial value, you can replace it with your actual initial value
    const [EditGender, SetEditGender] = useState("");
    const [EditIsActive, SetEditIsActive] = useState("");
    const [EditMobileNo, SetEditMobileNo] = useState("");
    const [EditEmailId, SetEditEmailId] = useState("");
    const [EditCredits, SetEditCredits] = useState("");
    const [EditGrade, SetEditGrade] = useState("");
    const [EditEnrollmentDate, SetEditEnrollmentDate] = useState("");
    const [EditCourceCode, SetEditCourceCode] = useState("");
    const [EditCourceName, SetEditCourceName] = useState("");



    //Save student Data

// State variable to store form validation errors
    const [errors, setErrors] = useState({});
    // State variable to store form data
    const [formData, setFormData] = useState({
        Name: "",   // Name field in the form
        Age: "",
        DOB: "",
        Gender: "",
        City: "",
        EmailId: "",
        CourceName: "",
        CourceCode: "",
        Credits: "",
        Grade: "",
        EnrollmentDate: "",
        MobileNo: "",
        IsActive: "",
        Degree: "",
        photo: null, // Change to null
    });
    const handleInputChange = (event) => {
        const { name, value, type } = event.target;
         let inputValue = value; // Define inputValue here
        if (type === 'checkbox') {
            // For other radio buttons, convert the value to a boolean
            inputValue = value === 'true';
        }
        // Update formData with the input value
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: inputValue
        }));

        console.log(name, inputValue); // Log name and inputValue
    };
    const HandleSave = async (event) => {
        event.preventDefault();
        try {
            const formDataCopy = { ...formData };

            if (selectedFile) {
                formDataCopy.photo = await getBase64(selectedFile);
            }
            const validationErrors = AddStudentValidations(formDataCopy);
            setErrors(validationErrors);
            if (Object.keys(validationErrors).length > 0) {
                return;
            }
            const response = await axios.post('https://localhost:7195/api/home', formDataCopy);
            if (response.status === 200) {
                console.log('Save successful:', response.data);
                setFormData({ ...formData, photo: null });
                setSelectedFile(null);
                handleAddCloseModal();
                refreshPage();
            } else {
                console.error('Failed to add student:', response.data);
            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };
    // Create an object with updated data

    const handleUpdate = async (id) => {
        const updatedData = {
            id: Editid,// Assuming Editid is the ID of the item being updated
            Name: Editname,// Assuming EditName is the updated name
            Age: EditAge,
            City: EditCity,
            Degree: EditDegree,
            DOB: EditDOB,
            EmailId: EditEmailId,
            MobileNo: EditMobileNo,
            Gender: EditGender,
            IsActive: EditIsActive,
            Credits: EditCredits,
            Grade: EditGrade,
            EnrollmentDate: EditEnrollmentDate,
            CourceCode: EditCourceCode,
            CourceName: EditCourceName,
            //Photo: currentPhotoUrl.split(',')[1], // Extract base64 part
            PhotoBase64: currentPhotoUrl ? await getBase64(selectedFile) : null,

        };

        axios
            .put(`https://localhost:7195/api/home/${id}`, updatedData)
            .then((response) => {
                toast.success("Data updated successfully", { position: "top-center" });
                // Close the modal after successful update


            })
            .catch((error) => {
                console.error(error, { position: "top-center" });
                toast.error("Error updating data", { position: "top-center" });
            });
    };
    //fetch data for the item with the specified id from your API endpoint.
    const HandleEdit = (id) => {
        handleEditModal();// Open the edit modal
           // Fetch data for the item with the specified id
        axios
            .get(`https://localhost:7195/api/home/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((result) => {
                // Assuming result.data contains the fetched data
            // Set state variables with the fetched data
                SetEditPhotoBase64(result.data.PhotoBase64);
                SetEditName(result.data.name);
                SetEditAge(result.data.age);
                SetEditCity(result.data.city);
                SetEditDegree(result.data.degree);
                SetEditDOB(result.data.dob);
                SetEditEmailId(result.data.emailId);
                SetEditMobileNo(result.data.mobileNo);
                SetEditGender(result.data.gender);
                SetEditIsActive(result.data.isActive);
                SetEditCourceName(result.data.courceName);
                SetEditCredits(result.data.credits);
                SetEditGrade(result.data.grade);
                SetEditEnrollmentDate(result.data.enrollmentDate);
                SetEditCourceCode(result.data.courceCode);
                setCurrentPhotoUrl(`data:image/png;base64,${result.data.photo}`);
                SetEditid(id);
                setShowEditModal(true); // You might need this line if you want to ensure the modal is visible after fetching data
            })
            .catch((error) => {
                  // Handle errors
                console.error(error);
                  // Show an error toast notification
                toast.error("Error fetching student data for edit", { position: "top-center" });
            });
    };

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
                toast.error("Error fetching student data for preview", { position: "top-center" });
            });
    };
    const [showAddModal, setAddShowModal] = useState(false);
    const handleAddShowModal = () => {  setAddShowModal(true); };
    const handleAddCloseModal = () => {setAddShowModal(false); };
    const Getdata = () => {
        axios
            .get("https://localhost:7195/api/home")
            .then((result) => {
                /* Setdata(result.data);*/
                Setdata(
                    result.data.map((item) => ({
                        ...item,
                        photoBase64: item.PhotoBase64,
                    }))
                );
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //useEffect perform side effects in function components
    //Like data fetching, subscriptions, or manually changing the DOM.
    useEffect(() => {
        axios.get('https://localhost:7195/api/home/GetDegree')
            .then(response => {
                SetDegree(response.data);
            })
            .catch(error => {
                console.error('Error fetching degrees:', error);
            });
        Getdata();
         // Effect code
    }, [searchTerm]);

       // It Define the columns for the grid
    const columns: GridColDef[] = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130, headerClassName: 'custom-header-name' },
        { field: 'dob', headerName: 'DOB', width: 130, headerClassName: 'custom-header-name' },
        { field: 'gender', headerName: 'Gender', width: 90, headerClassName: 'custom-header-name' },
        { field: 'emailId', headerName: 'Email', width: 130, headerClassName: 'custom-header-name' },
        { field: 'city', headerName: 'City', width: 100, headerClassName: 'custom-header-name' },
        { field: 'mobileNo', headerName: 'MobileNo', width: 130, headerClassName: 'custom-header-name' },
        { field: 'photo', headerName: 'Photo', width: 130, headerClassName: 'custom-header-name' },
        { field: 'degree', headerName: 'Degree', width: 130, headerClassName: 'custom-header-name' },
        { field: 'courceName', headerName: 'CourceName', width: 130, headerClassName: 'custom-header-name' },
        { field: 'courceCode', headerName: 'CourceCode', width: 130, headerClassName: 'custom-header-name' },
        { field: 'credits', headerName: 'Credit', width: 90, headerClassName: 'custom-header-name' },
        { field: 'grade', headerName: 'Grade', width: 90, headerClassName: 'custom-header-name' },
        { field: 'age', headerName: 'Age', type: 'number', width: 90, headerClassName: 'custom-header-name' },

        {
            field: 'isActive',
            headerName: 'Active',
            width: 90,
            headerClassName: 'custom-header-name',
            valueGetter: (params) => params.row.isActive ? 'Active' : 'Not Active'
},
    {
            field: 'Actions',
            headerName: 'Actions',
            width: 130, headerClassName: 'custom-header-name',
            renderCell: (params) => (
                <div>
                    <EditIcon
                        style={{ cursor: "pointer", color: "blue" }}
                        onClick={() => HandleEdit(params.id)}
                    />
                    &nbsp;
                    <VisibilityIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => HandlePreview(params.id)}
                    />
                    &nbsp;
                    <DeleteIcon
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => HandleDelete(params.id)}
                    />
                </div>
            ),
        },
    ];
    console.log("Data before passing to DataGrid:", data);
    return (
        <Fragment > <br></br>
            <ToastContainer style={{ marginTop: "5px", position: "absolute" }} />
           {/*search data and Delete All btn*/}
            <Container >
                <Row>
                    <Col sx={{ flexGrow: 1, display: 'flex', marginTop: "20px" }} mx={2}
                        lg={4} md={8} style={{ position: "fixed", width: "13%", marginLeft: "30px" }}>
                       <Button
                                color="btn btn-Success"
                                style={{ color: "white", marginLeft: "15px" }}
                                onClick={handleAddShowModal}>
                                <AddCircleOutlineIcon />
                                &nbsp; Add New
                            </Button>{" "}
                    </Col>
                    <Col
                        sx={{ flexGrow: 1, display: 'flex', marginTop: "20px" }}
                        mx={2}
                        lg={4}
                        md={8}
                        style={{ position: "fixed", width: "13%", marginLeft: "700px" }}
                    >
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search here.."
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Col>
                    <Col
                        sx={{ flexGrow: 1, display: 'flex', marginTop: "20px" }}
                        lg={2}
                        md={10}
                        style={{ position: "fixed", width: "20%", marginLeft: "900px" }}
                    >
                        <button
                            className="btn btn-outline-success"
                            type="submit"
                            onClick={handleSearch}
                        >
                            Search
                        </button>&nbsp;
                        {data && data.length > 0 &&
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => {
                                    HandleMultiDelete();

                                }}
                            >
                                DeleteAll
                            </button>
                        }
                    </Col>
                </Row>
            </Container>
            <br></br>
            <br></br>
            {/* Get Table Data*/}
            <div style={{ textAlign: "center", height: 640, width: '92%', position: "absolute" }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    classes={{ root: 'custom-table' }}
                    autoHeight // Enable autoHeight to fix the header
                    disableExtendRowFullWidth // Disable extending rows to full width
                />
            </div>

            {/* Confirm delete*/}
            <Dialog /*style={{ backgroundColor: 'gray' }}*/ open={open} onClose={handleCloseDialog}>
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
                            handleDeleteSelectedRows();
                            confirmDelete();
                        }}
                        variant="danger"
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/*Image Preview Data */}
            <div>
                <Modal style={{ /*backgroundColor: 'gray',*/ marginTop: "110px" }}
                    show={showPreviewImage}
                    onHide={handleClosePreviewModalImage}
                    animation={true}
                >
                    <Modal.Header closeButton>
                        <marquee> <Modal.Title> {previewData && (

                            <h >{previewData.name}'s Photo and MobileNo: {previewData.mobileNo} </h>)}
                        </Modal.Title></marquee>
                    </Modal.Header>
                    <Modal.Body>
                        {previewData && (
                            <div >
                                {previewData.photo && (
                                    <img
                                        src={`data:image/png;base64,${previewData.photo}`}
                                        alt={`Photo of ${previewData.name}`}
                                        style={{ maxWidth: "100%", maxHeight: "600px" }}
                                    />
                                )}
                            </div>
                        )}
                    </Modal.Body>
                </Modal>{" "}
            </div>

            {/*Student Preview Data */}
            <div style={{
                position: "fixed",
                origin: "50%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}>
                {" "}
                <Modal style={{ /*backgroundColor: 'gray',*/ marginTop: "30px" }}
                    show={showPreviewModal}
                    onHide={handleClosePreviewModal}
                    animation={true}
                    centered
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title><span style={{ textAlign: "center" }}>Student Preview</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {previewData && (
                            <div>
                                <Row >
                                    <Col xs={12} md={6}> <div>
                                        <p> Name: {previewData.name}         </p>
                                        <p> DOB: {previewData.dob}         </p>

                                        <p> Age: {previewData.age}         </p>
                                        <p> Gender: {previewData.gender}   </p>

                                        <p> Email Id: {previewData.emailId}</p>
                                        <p> City: {previewData.city}</p>  </div></Col>

                                    <Col xs={12} md={6}><div>
                                        <p> Degree: {previewData.degree}</p>
                                        <p> Mobile No: {previewData.mobileNo} </p>

                                        <p> Cource Name: {previewData.courceName}</p>
                                        <p> Cource Code: {previewData.courceCode}</p>

                                        <p> Grade: {previewData.grade}              </p>
                                        <p> Cource Credits: {previewData.credits}  </p>

                                    </div>
                                    </Col>  </Row>
                                <p> Enrollment Date: {previewData.enrollmentDate}</p>
                                <div style={{ paddingTop: "30px", paddingLeft: "20px" }}>
                                    {previewData.photo && (
                                        <img
                                            src={`data:image/png;base64,${previewData.photo}`}
                                            alt={`Photo of ${previewData.name}`}
                                            style={{ maxWidth: "100%", maxHeight: "400px" }}
                                        />
                                    )}</div>
                            </div>
                        )}

                    </Modal.Body>
                </Modal>{" "}
            </div>

            {/* Add Model*/}
            <Modal style={{ /*backgroundColor: 'gray'*/ marginTop: "30px" }} show={showAddModal} onHide={handleAddCloseModal} centered
                size="lg"  className="custom-modal">
                <Modal.Header closeButton >
                    <Modal.Title><span style={{ textAlign: "center" }}>Add New Student</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={HandleSave}>
                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group>
                                    <Form.Label></Form.Label>
                                    <input
                                        type="text"
                                        autocomplete="off"
                                        className={`form-control ${errors.Name && 'is-invalid'}`}
                                        placeholder="Name"
                                        name="Name"
                                        value={formData.Name}
                                        onChange={handleInputChange}
                                    />
                                    {errors.Name && (
                                        <span className='text-danger'>{errors.Name}</span>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group>
                                    <Form.Label> </Form.Label>
                                    <input
                                        type="text" autoComplete="off"
                                        className={`form-control ${errors.MobileNo && 'is-invalid'}`}
                                        placeholder="Mobile No"
                                        name="MobileNo"
                                        value={formData.MobileNo}
                                        onChange={handleInputChange}
                                    />
                                    {errors.MobileNo && (
                                        <span className='text-danger'>{errors.MobileNo}</span>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group>
                                    <Form.Label></Form.Label>
                                    <input
                                        type="text" autoComplete="off"
                                        className={`form-control ${errors.Age && 'is-invalid'}`}
                                        placeholder="Age"
                                        name="Age"
                                        value={formData.Age}
                                        onChange={handleInputChange}
                                    />
                                    {errors.Age && (
                                        <span className='text-danger'>{errors.Age}</span>
                                    )}
                                </Form.Group>

                            </Col>

                            <Col xs={12} md={6}>
                                <Form.Group>
                                    <Form.Label></Form.Label>
                                    <input
                                        type="text" autoComplete="off"
                                        className={`form-control ${errors.City && 'is-invalid'}`}
                                        placeholder="City"
                                        name="City" value={formData.City}
                                        onChange={handleInputChange}
                                    />
                                    {errors.City && (
                                        <span className='text-danger'>{errors.City}</span>
                                    )}
                                </Form.Group>
                            </Col>
                            <Row>
                                <Col xs={12} md={6} style={{ width: "340px" }}>
                                    <Form.Group>
                                        <Form.Label></Form.Label>
                                        <Form.Select
                                            className={`form-control ${errors.Degree && 'is-invalid'}`}
                                            name="Degree"
                                            value={formData.Degree}
                                            onChange={(e) => {
                                                handleDegreeChange(e);  // Pass the event object to handleDegreeChange
                                                handleInputChange(e);   // Pass the event object to handleInputChange
                                            }}
                                        >
                                            <option value="">Select Degree</option>
                                            {Degree.map(degree => (
                                                <option key={degree.DegreeId} value={degree.name}>
                                                    {degree.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        {errors.Degree && <span className='text-danger'>{errors.Degree}</span>}
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6} style={{ marginLeft:"20px", width: "300px" }}>
                                    <Form.Group>
                                        <Form.Label></Form.Label>
                                        <Form.Select
                                            className={`form-control ${errors.CourceName && 'is-invalid'}`}
                                            name="CourceName"
                                            value={formData.CourceName}
                                            onChange={(e) => {
                                                handleCourseChange(e);  // Pass the event object to handleDegreeChange
                                                handleInputChange(e);   // Pass the event object to handleInputChange
                                            }}
                                        >
                                            <option value="">Select Course</option>
                                            {courses.map(course => (
                                                <option key={course.courseId} value={course.courceName}>
                                                    {course.courceName}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        {errors.CourceName && <span className='text-danger'>{errors.CourceName}</span>}
                                    </Form.Group>
                                </Col> </Row>
                            <Col xs={12} md={6}>
                                <Form.Group>
                                    <Form.Label></Form.Label>
                                    <Form.Select
                                        className={`form-control ${errors.CourceCode && 'is-invalid'}`}
                                        name="CourceCode" value={formData.CourceCode}
                                        onChange={(e) => {
                                            setSelectedCourseCode(e);  // Pass the event object to handleDegreeChange
                                            handleInputChange(e);   // Pass the event object to handleInputChange
                                        }}
                                    >
                                        <option value="">Select Course Code</option>
                                        {courses.map(course => (
                                            <option key={course.courseId} value={course.courceCode}>
                                                {course.courceCode}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    {errors.CourceCode && <span className='text-danger'>{errors.CourceCode}</span>}
                                </Form.Group>
                            </Col>




                            <Col xs={12} md={6}>
                                <Form.Group>
                                    <Form.Label></Form.Label>

                                    <input
                                        type="text" autocomplete="off"
                                        className={`form-control ${errors.Grade && 'is-invalid'}`}
                                        placeholder="Enter Grade"
                                        name="Grade"
                                        value={formData.Grade}
                                        onChange={handleInputChange}
                                    />
                                    {errors.Grade && (
                                        <span className='text-danger'>{errors.Grade}</span>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group>
                                    <Form.Label></Form.Label>
                                    <input

                                        type="text" autoComplete="off"
                                        className={`form-control ${errors.Credits && 'is-invalid'}`}
                                        placeholder="Credits"
                                        name="Credits"
                                        value={formData.Credits}
                                        onChange={handleInputChange}
                                    />
                                    {errors.Credits && (
                                        <span className='text-danger'>{errors.Credits}</span>
                                    )}
                                </Form.Group>
                            </Col>

                            <Col xs={12} md={6}>
                                <Form.Group>
                                    <Form.Label></Form.Label>
                                    <input
                                        type="text" autoComplete="off"
                                        className={`form-control ${errors.EmailId && 'is-invalid'}`}
                                        placeholder="Email Id"
                                        name="EmailId"
                                        value={formData.EmailId}
                                        onChange={handleInputChange}
                                    />
                                    {errors.EmailId && (
                                        <span className='text-danger'>{errors.EmailId}</span>
                                    )}

                                </Form.Group>
                            </Col>

                        </Row>

                        <br></br>
                        <Row>

                            <Col xs={12} md={6}>
                                <Form.Group>
                                    <div>
                                        <label>Gender &nbsp;:&nbsp;&nbsp;

                                            <Form.Check
                                                inline
                                                value="Male"
                                                label="Male"
                                                type="radio"
                                                id="maleRadio"
                                                name="Gender"
                                                checked={formData.Gender === "Male" || formData.Gender === "male"}

                                                onChange={handleInputChange}
                                            />
                                            <Form.Check
                                                inline
                                                value="Female"
                                                label="Female"
                                                type="radio"
                                                id="femaleRadio"
                                                name="Gender"
                                                checked={formData.Gender === "Female" || formData.Gender === "female"}

                                                onChange={handleInputChange}
                                            />

                                        </label>
                                    </div>
                                </Form.Group><div>
                                    {errors.Gender && (
                                        <span className='text-danger'>{errors.Gender}</span>
                                    )}</div>
                            </Col>


                            <Col xs={12} md={6}>
                                <Form.Group>
                                    <label>IsActive &nbsp;&nbsp;&nbsp;
                                        <Form.Check
                                            type="checkbox"
                                            label="Yes"
                                            id="isActiveCheckbox"
                                            name="IsActive"
                                            checked={formData.IsActive === true}
                                            onChange={handleInputChange}
                                            style={{ color: formData.IsActive ? 'green' : 'black', cursor: 'pointer' }}
                                            inline
                                            value={true}

                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            type="checkbox"
                                            id="isActiveCheckbox"
                                            name="IsActive"
                                            value={false}  // Set the value to false
                                            checked={formData.IsActive === false}
                                            style={{ color: formData.IsActive ? 'red' : 'black', cursor: 'pointer' }}
                                            onChange={handleInputChange}
                                        />
                                        <div>
                                            {errors.IsActive && (
                                                <span className='text-danger'>{errors.IsActive}</span>
                                            )}</div>
                                    </label>
                                </Form.Group>

                            </Col>

                        </Row>
                        <Row>
                            <Col xs={12} md={6} style={{ marginTop: "24px", width: "330px" }}>
                                <Form.Group>
                                    <Form.Label> </Form.Label>
                                    <DatePicker
                                        name="DOB"
                                        autoComplete="off"
                                        selected={formData.DOB ? new Date(formData.DOB) : null}
                                        onChange={(date) => {
                                            const formattedDate = date.toISOString().split('T')[0];
                                            setFormData(prevData => ({
                                                ...prevData,
                                                DOB: formattedDate
                                            }));
                                        }}
                                        dateFormat="dd-MMM-yy"
                                        className={`form-control ${errors.DOB && 'is-invalid'}`}
                                        placeholderText="Date of Birth"
                                        isValidDate={(date) => {
                                            return date <= new Date();
                                        }}
                                    />
                                </Form.Group>
                                {errors.DOB && (
                                    <span className='text-danger'>{errors.DOB}</span>
                                )}
                            </Col>&nbsp;&nbsp;
                            <Col
                                xs={12}
                                md={6}
                                style={{ marginLeft: "25px", marginTop: "24px", width: "330px" }}
                            >
                                <Form.Group>
                                    <Form.Label> </Form.Label>
                                    <DatePicker
                                        dateFormat="dd-MMM-yy"
                                        autoComplete="off"
                                        name="EnrollmentDate"
                                        selected={formData.EnrollmentDate ? new Date(formData.EnrollmentDate) : null}
                                        onChange={(date) => {
                                            const formattedDate = date.toISOString().split('T')[0];
                                            setFormData(prevData => ({
                                                ...prevData,
                                                EnrollmentDate: formattedDate
                                            }));
                                        }}
                                        className={`form-control ${errors.EnrollmentDate && 'is-invalid'}`}
                                        placeholderText="EnrollmentDate"
                                    />
                                </Form.Group>
                                {errors.EnrollmentDate && (
                                    <span className='text-danger'>{errors.EnrollmentDate}</span>
                                )}
                            </Col>

                        </Row>
                        <Row>

                            <Col xs={12} md={6} style={{ marginTop: "5px", width:"330px" }}>
                                <Form.Group>
                                    <Col xs={12} md={6} style={{ marginTop: "5px" }}>

                                        <Form.Group>
                                            <Form.Label></Form.Label>
                                            <input type="file" onChange={(e) => handleFileChange(e)} />

                                            {selectedFile && (
                                                <img
                                                    src={URL.createObjectURL(selectedFile)}
                                                    alt="Selected File"
                                                    style={{ marginTop:"15px", maxWidth: "100%", maxHeight: "200px" }}
                                                />

                                            )}</Form.Group>

                                        <div> {errors.photo && <span style={{ color: 'red' }}>{errors.photo}</span>}</div>

                                    </Col>
                                </Form.Group>

                            </Col>
                        </Row>
                        <div className="mt-3 d-flex justify-content-end align-items-center">
                            <Button variant="danger" onClick={handleAddCloseModal}>
                                Close
                            </Button>
                            <div className="mx-2" style={{
                                borderLeft: '1px'
                            }} >
                                <Button type="submit" variant="primary">
                                    Submit
                                </Button>
                            </div>
                        </div>

                    </form>

                </Modal.Body>

            </Modal>

            {/*  Edit Model*/}
            <Modal
                   
                    show={showEditModal}
                    onHide={handleCloseEditModal}
                    animation={true}
                    centered
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title><span style={{ textAlign: "center" }}>Update/Edit Student</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form >
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group>
                                        <Form.Label></Form.Label>
                                        <input
                                            type="text" autoComplete="off"
                                            className="form-control"
                                            placeholder="Edit Name"
                                            value={Editname}
                                            onChange={(e) => SetEditName(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group>
                                        <Form.Label> </Form.Label>
                                        <input
                                            type="text" autoComplete="off"
                                            className="form-control"
                                            placeholder="Edit Mobile No"
                                            value={EditMobileNo}
                                            onChange={(e) => SetEditMobileNo(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group>
                                        <Form.Label></Form.Label>
                                        <input
                                            type="text" autoComplete="off"
                                            className="form-control"
                                            placeholder="Edit Age"
                                            value={EditAge}
                                            onChange={(e) => SetEditAge(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group>
                                        <Form.Label></Form.Label>
                                        <input
                                            type="text" autoComplete="off"
                                            className="form-control"
                                            placeholder="Edit City"
                                            value={EditCity}
                                            onChange={(e) => SetEditCity(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6} style={{ width: "340px" }}>
                                    <Form.Group>
                                        <Form.Label></Form.Label>
                                        <Form.Select
                                            value={EditDegree}
                                            onChange={handleDegreeChange}
                                        >
                                            <option value="">Select Degree</option>
                                            {Degree.map(degree => (
                                                <option key={degree.DegreeId} value={degree.name}>
                                                    {degree.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        {errors.Degree && <span className='text-danger'>{errors.Degree}</span>}
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6} style={{ marginLeft:"20px", width: "300px" }}>
                                    <Form.Group>
                                        <Form.Label></Form.Label>
                                        <Form.Select
                                            value={EditCourceName}
                                            onChange={handleEditCourseChange}
                                        >
                                            <option value="">Select Course</option>
                                            {courses.map(course => (
                                                <option key={course.courseId} value={course.courceName}>
                                                    {course.courceName}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col> </Row>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group>
                                        <Form.Label></Form.Label>
                                        <Form.Select
                                            value={EditCourceCode}
                                            onChange={handleEditCourseChange}
                                        >
                                            <option value="">Select Course Code</option>
                                            {courses.map(course => (
                                                <option key={course.courseId} value={course.courceCode}>
                                                    {course.courceCode}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        {errors.CourceCode && <span className='text-danger'>{errors.CourceCode}</span>}
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group>
                                        <Form.Label></Form.Label>

                                        <input
                                            type="text" autoComplete="off"
                                            className="form-control"
                                            placeholder="Edit Grade"
                                            value={EditGrade}
                                            onChange={(e) => SetEditGrade(e.target.value)}
                                        />
                                        {errors.Grade && (
                                            <span className='text-danger'>{errors.Grade}</span>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group>
                                        <Form.Label></Form.Label>
                                        <input
                                            type="text" autoComplete="off"
                                            className="form-control"
                                            placeholder="EditCredits"
                                            value={EditCredits}
                                            onChange={(e) => SetEditCredits(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group>
                                        <Form.Label></Form.Label>
                                        <input
                                            type="text" autoComplete="off"
                                            className="form-control"
                                            placeholder="Edit Email Id"
                                            value={EditEmailId}
                                            onChange={(e) => SetEditEmailId(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={4} style={{ marginTop: "24px", width: "300px" }} >
                                    <Form.Group>
                                        <div>
                                            <label>Gender &nbsp;:&nbsp;&nbsp;

                                                <Form.Check
                                                    inline
                                                    value={EditGender}
                                                    label="Male"

                                                    id="maleRadio"
                                                    name="genderRadio"
                                                    type="radio"
                                                    checked={EditGender === "Male" || EditGender === "male"}
                                                    onChange={() => SetEditGender("Male")}
                                                />
                                                <Form.Check
                                                    inline
                                                    value={EditGender}
                                                    label="Female"

                                                    id="femaleRadio"
                                                    name="genderRadio"
                                                    type="radio"
                                                    checked={EditGender === "Female" || EditGender === "female"}
                                                    onChange={() => SetEditGender("Female")}
                                                />
                                            </label>   </div>
                                    </Form.Group>

                                </Col> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;

                                <Col xs={12} md={4} style={{ marginTop: "24px", width: "300px", marginLeft: "0px" }} >
                                    <Form.Group>
                                        <label>IsActive &nbsp;:&nbsp;&nbsp;

                                            <Form.Check
                                                inline
                                                label="Yes"
                                                type="checkbox"
                                                id="checkboxTrue"
                                                name="IsActive"
                                                checked={EditIsActive === true}
                                                style={{ color: EditIsActive ? 'green' : 'black', cursor: 'pointer' }}
                                                onChange={() => SetEditIsActive(true)}
                                            />
                                            <Form.Check
                                                inline
                                                label="No"
                                                type="checkbox"
                                                id="checkboxFalse"
                                                name="IsActive"
                                                checked={EditIsActive === false}
                                                style={{ color: EditIsActive ? 'red' : 'black', cursor: 'pointer' }}
                                                onChange={() => SetEditIsActive(false)}
                                            />


                                        </label>
                                    </Form.Group>

                                </Col>
                            </Row>


                            <Row>
                                <Col xs={12} md={6} style={{ marginTop: "24px", width: "330px" }}>
                                    <Form.Group>
                                        <Form.Label>Date of Birth</Form.Label>
                                        <DatePicker
                                            selected={EditDOB ? new Date(EditDOB) : null}
                                            onChange={(date) => SetEditDOB(date)}
                                            className="form-control"
                                            placeholderText={
                                                EditDOB
                                                    ? new Date(EditDOB).toLocaleDateString()
                                                    : "Select DOB"
                                            }
                                        />
                                    </Form.Group>
                                </Col>&nbsp;&nbsp;
                                <Col
                                    xs={12}
                                    md={6}
                                    style={{ marginLeft: "25px", marginTop: "24px", width: "330px" }}
                                >
                                    <Form.Group>
                                        <Form.Label>Enrollment Date </Form.Label>
                                        <DatePicker
                                            selected={
                                                EditEnrollmentDate ? new Date(EditEnrollmentDate) : null
                                            }
                                            onChange={(date) => SetEditEnrollmentDate(date)}
                                            className="form-control"
                                            placeholderText={
                                                EditEnrollmentDate
                                                    ? new Date(EditEnrollmentDate).toLocaleDateString()
                                                    : "Select EnrollmentDate"
                                            }
                                        />
                                    </Form.Group>
                                </Col></Row>
                            <br></br>

                            <Row>
                                {/* Display the current photo */}
                                {currentPhotoUrl && (
                                    <Col xs={12} md={6}>
                                        <Form.Group>
                                            <Form.Label></Form.Label>
                                            <img
                                                src={currentPhotoUrl}
                                                alt="Current Photo"
                                                style={{ maxWidth: "100%", maxHeight: "200px" }}
                                            />
                                        </Form.Group>
                                    </Col>
                                )}
                                {/* File Input */}
                                <Col xs={12} md={6} style={{ marginTop: "30px" }}>
                                    <Form.Group>
                                        <Form.Label></Form.Label>

                                        <input
                                            type="file"
                                            onChange={(e) => handleEditFileChange(e)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="mt-3 d-flex justify-content-end align-items-center">
                                <Button variant="danger" onClick={handleCloseEditModal}>
                                    Close
                                </Button>
                                <div className="mx-2" style={{
                                    borderLeft: '1px'
                                }} >
                                    <Button
                                        variant="primary"
                                        onClick={() => {
                                            handleUpdate(Editid);

                                        }}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>

                        </form>

                    </Modal.Body>

                </Modal >
        </Fragment>
    );
};
export default StudentCurdGridData;
