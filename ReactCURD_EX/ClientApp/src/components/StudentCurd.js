import React, { Fragment, useState, useEffect } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TableContainer,
    IconButton, Paper
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import "react-toastify/dist/ReactToastify.css";

const StudentCurd = () => {

    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };
    const [Degree, SetDegree] = useState([]);
    const [selectedDegree, setSelectedDegree] = useState('');
    const [courses, setCourses] = useState([]);
    const [CourceName, setSelectedCourse] = useState('');
    const [CourceCode, setSelectedCourseCode] = useState('');
    const [errors, setErrors] = useState({});

    const handleEditCourseChange = (e) => {
        const selectedCourseName = e.target.value;
        SetEditCourceName(selectedCourseName);
        const selectedCourse = courses.find(course => course.courceName === selectedCourseName);
        if (selectedCourse) {
            SetEditCourceCode(selectedCourse.courceCode);
        } else {
            SetEditCourceCode('');
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
        setSelectedCourse(''); // Clear selected course when degree changes
        setSelectedCourseCode(''); // Clear selected course code when degree changes
     
        fetchCoursesByDegree(selectedDegree);
       
    };

    const handleCourseChange = (e) => {
        const CN = e.target.value;
        setSelectedCourse(CN);
        const selectedCN = courses.find(course => course.courceName === CN);
        if (selectedCN) {
            setSelectedCourseCode(selectedCN.courceCode);
            setErrors(prevErrors => ({ ...prevErrors, CourceName: '', CourceCode: '' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, CourceName: 'Invalid course name' }));
            setSelectedCourseCode('');
        }
    };


    const [currentPhotoUrl, setCurrentPhotoUrl] = useState("");
    const [previewData, setPreviewData] = useState(false);

    // Add a new state for storing the selected file
    const [selectedFile, setSelectedFile] = useState(null);

    // Handler for file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        // Check if a file was selected
        if (!file) {
            setErrors(prevErrors => ({
                ...prevErrors,
                photo: 'Please select a file.', // Set error message if no file is selected
            }));
            return;
        }

        // Clear error for the photo field
        setErrors(prevErrors => ({
            ...prevErrors,
            photo: '',
        }));

        // Handle additional validations if needed, such as file type or size
        const allowedTypes = ['image/jpeg', 'image/png']; // Add more allowed file types as needed
        if (!allowedTypes.includes(file.type)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                photo: 'Invalid file type. Please select a JPEG or PNG file.', // Set error message for invalid file type
            }));
            return;
        }

        // Handle file size validation if needed
        const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSizeInBytes) {
            setErrors(prevErrors => ({
                ...prevErrors,
                photo: 'File size exceeds the maximum limit of 10MB.', // Set error message for exceeding file size
            }));
            return;
        }

        // Clear error if file passes all validations
        setErrors(prevErrors => ({
            ...prevErrors,
            photo: '',
        }));

        // Proceed with setting the selected file
        setSelectedFile(file);

    };
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

    const handleClickOpen = (id) => {
        setDeleteId(id);
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };

    //Edit modal
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEditModal = () => {
        setShowEditModal(true);
    };
    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    // Preview modal

    const [showPreviewImage, setShowPreviewImage] = useState(false);
    const handlePreviewModalImage = () => {
        setShowPreviewImage(true);
    };
    const handleClosePreviewModalImage = () => {
        setShowPreviewImage(false);
    };
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const handlePreviewModal = () => {
        setShowPreviewModal(true);
    };
    const handleClosePreviewModal = () => {
        setShowPreviewModal(false);
    };

    //Delete Data
    const [selectedRows, setSelectedRows] = useState([]);
    const handleDeleteSelectedRows = async () => {

        if (selectedRows.length === 0) {
            // If no rows are selected, show an error toast immediately
            toast.error("Please select rows to delete multiple records", { position: "top-center" });
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
                toast.error("Please Select Row To Delete Multiple Records..", { position: "top-center" });

            });
    };

    const HandleMultiDelete = (id) => {
        handleClickOpen(id);
    }
    const HandleDelete = (id) => {
        handleClickOpen(id);
    };
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
                toast.error(error, { position: "top-center" });
                handleCloseDialog(); // Close the confirmation dialog
            });
    };

    //select multiple checkboxes using id and delete rec
    const [selectAll, setSelectAll] = useState(false);
    //const handleSelectAll = (e) => {
    //    const isChecked = e.target.checked;
    //    setSelectAll(isChecked);
    //    const allCheckbox = document.querySelectorAll('input[type="checkbox"][name="rowCheckbox"]');
    //    const selectedIds = [];

    //    allCheckbox.forEach((checkbox) => {
    //        checkbox.checked = isChecked;
    //        const itemId = parseInt(checkbox.value);
    //        if (isChecked) {
    //            selectedIds.push(itemId);
    //        }
    //    });
    //}
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


    const [data, Setdata] = useState([]);
    const [Name, SetName] = useState("");
    const [IsActive, SetIsActive] = useState("");
    const [Age, SetAge] = useState("");
    const [City, SetCity] = useState("");
    // const [Degree, SetDegree] = useState("");
    const [DOB, SetDOB] = useState("");
    const [Gender, SetGender] = useState("");
    const [MobileNo, SetMobileNo] = useState("");
    const [EmailId, SetEmailId] = useState("");
    //const [CourceName, setCourceName] = useState("");
    // const [CourceCode, setCourceCode] = useState("");

    const [Credits, SetCredits] = useState("");
    const [Grade, SetGrade] = useState("");
    const [EnrollmentDate, SetEnrollmentDate] = useState("");
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


    //Get dummy data to show dropdown...

    const GetGrade = [
        { Grade: "A" },
        { Grade: "B" },
        { Grade: "C" },
        { Grade: "D" },
        { Grade: "E" },
        { Grade: "F" },

    ];


    //clear data into form
    const Clear = () => {
        SetName("");
        SetCity("");
        SetAge("");
        SetDOB("");
        SetGender("");
        SetMobileNo("");
        SetEmailId("");
        SetDegree("");
        SetIsActive("");

        SetEditCourceName("");
        SetEditCourceCode("");
        SetEditCredits("");
        SetEditGrade("");
        SetEditEnrollmentDate("");
        EditPhotoBase64("");
        SetEditCity("");
        SetEditid("");
        SetEditName("");
        SetEditAge("");
        SetEditDOB("");
        SetEditMobileNo("");
        SetEditEmailId("");
        SetEditGender("");
        SetEditIsActive("");
        SetEditDegree("");
        SetEditPhotoBase64("");
    };
    //Save student Data
    //const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        Name: '',
        Age: '',
        DOB: '',
        Gender: '',
        City: '',
        EmailId: '',
        courceName: '',
        courceCode: '',
        Credits: '',
        Grade: '',
        EnrollmentDate: '',
        MobileNo: '',
        IsActive: '',
        Degree: '',
        photo: '',
    })
    const handleInputChange = (e) => {
        console.log("Event:", e);
        if (e && e.target) {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
            console.log(name, "-------Show Names----------");
            console.log(value, "-------Show values----");
            console.log(setErrors, "----Show setErrors------");
            console.log(setFormData, "-----Show setValue------");
        } else {
            console.error("Event or event target is undefined");
        }
    };
   
    
    const handleClickSave = async () => {

        HandleSave(); 
    };
    const HandleSave = async (e) => {
        //e.preventDefault();
        //// Validate the form fields
        //const ValidationErrors = {}
        //if (!formData.Name.trim()) {
        //    ValidationErrors.Name = "Enter Name";
        //}

        //if (!formData.Age.trim()) {
        //    ValidationErrors.Age = "Enter Age";
        //}

        //// Add validations for other fields...
        //if (!formData.DOB.trim()) {
        //    ValidationErrors.DOB = "Enter Date of Birth";
        //}

        //if (!formData.Gender.trim()) {
        //    ValidationErrors.Gender = "Select Gender";
        //}

        //if (!formData.City.trim()) {
        //    ValidationErrors.City = "Enter City";
        //}

        //if (!formData.EmailId.trim()) {
        //    ValidationErrors.EmailId = "Enter Email Address";
        //} else if (!/^[a-zA-Z0-9]+@gmail\.com$/.test
        //    (formData.EmailId)) {
        //    ValidationErrors.EmailId="Email not valid please Enter Valid Email id "
        //    }

        //if (!formData.courceName.trim()) {
        //    ValidationErrors.courceName = "Select Course Name";
        //}

        //if (!formData.courceCode.trim()) {
        //    ValidationErrors.courceCode = "Enter Course Code";
        //}

        //if (!formData.Credits.trim()) {
        //    ValidationErrors.Credits = "Enter Credits";
        //} else if (!/^[1-5]$/.test
        //    (formData.Credits)) {
        //    ValidationErrors.Credits = "Credits must be 1 to 5 please Enter Valid Credits "
        //}
        
        //if (!formData.Grade.trim()) {
        //    ValidationErrors.Grade = "Select Grade";
        //} else if (!/^[A-F]$/.test
        //    (formData.Grade)) {
        //    ValidationErrors.Grade = "Grade must be A to F please Enter Valid Grade "
        //}

        //if (!formData.EnrollmentDate.trim()) {
        //    ValidationErrors.EnrollmentDate = "Enter Enrollment Date";
        //}

        //if (!formData.MobileNo.trim()) {
        //    ValidationErrors.MobileNo = "Enter Mobile Number";
        //} else if (!/^\d{10}$/.test
        //    (formData.MobileNo)) {
        //    ValidationErrors.MobileNo = "Mobile Number valid only 10 digits please Enter Valid Mobile number "
        //}

        //if (!formData.IsActive.trim()) {
        //    ValidationErrors.IsActive = "Select Active Status";
        //}

        //if (!formData.Degree.trim()) {
        //    ValidationErrors.Degree = "Select Degree";
        //}
        //setErrors(ValidationErrors)
        //if (Object.keys(ValidationErrors).length === 0) {

            try {
                // Gather all the form data
                const formData = {
                    Name: Name,
                    Age: Age,
                    DOB: DOB,
                    Gender: Gender,
                    City: City,
                    EmailId: EmailId,
                    courceName: CourceName,
                    courceCode: CourceCode,
                    Credits: Credits,
                    Grade: Grade,
                    EnrollmentDate: EnrollmentDate,
                    MobileNo: MobileNo,
                    IsActive: IsActive,
                    Degree: selectedDegree,
                    photo: selectedFile ? await getBase64(selectedFile) : null,
                };
                const response = await axios.post('https://localhost:7195/api/home', formData);

                if (response.status === 200) {
                    // Success response
                    console.log('Save successful:', response.data);
                    toast.success('Student added successfully', {
                        position: "top-center"
                    });
                    // Optionally, clear the form fields or close the modal
                    handleAddCloseModal();
                    Clear();
                } else {
                    // Handle other status codes
                    console.error('Failed to add student:', response.data);
                    toast.error('Failed to add student', {
                        position: "top-center"
                    });
                }
            } catch (error) {
                // Handle network errors or other exceptions
                console.error('Error saving data:', error);
                toast.error('Error saving data. Please try again later.', {
                    position: "top-center"
                });
            }
        //}
    };


    const handleUpdate = async (id) => {
        const updatedData = {
            id: Editid,
            Name: Editname,
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
                refreshPage();

            })
            .catch((error) => {
                console.error(error, { position: "top-center" });
                toast.error("Error updating data", { position: "top-center" });
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
                console.error(error);
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
    const HandlePreview2 = (id) => {

        handlePreviewModalImage();

        axios
            .get(`https://localhost:7195/api/home/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((result) => {
                setPreviewData(result.data);
                // Open the preview modal

                setShowPreviewImage(true);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Error fetching student data for preview", { position: "top-center" });
            });
    };

    const [showAddModal, setAddShowModal] = useState(false);
    const handleAddShowModal = () => {
        setAddShowModal(true);
    };
    const handleAddCloseModal = () => {
        setAddShowModal(false);

    };

    const handleIsActiveChange = (itemId) => {
        Setdata((prevData) =>
            prevData.map((item) =>
                item.id === itemId ? { ...item, isActive: !item.isActive } : item
            )
        );
        const checkbox = document.getElementById(`checkbox_${itemId}`);
        if (checkbox) {
            checkbox.classList.toggle('Red');
        }
    };
    // Disable all checkboxes by default
    const [checkboxesDisabled, setCheckboxesDisabled] = useState(true);

    useEffect(() => {
        axios.get('https://localhost:7195/api/home/GetDegree')
            .then(response => {
                SetDegree(response.data);
            })
            .catch(error => {
                console.error('Error fetching degrees:', error);
            });
        Getdata();

    }, [searchTerm]);

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

    return (
        <Fragment >
            <br></br>
            <ToastContainer style={{ marginTop: "60px" }} />

            {/*search data and Delete All btn*/}
            <Container style={{ marginTop: "50px" }}>
                <Row>
                    <Col
                        mx={2}
                        lg={4}
                        md={8}
                        style={{ position: "fixed", width: "15%", marginLeft: "860px" }}
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
                        lg={2}
                        md={10}
                        style={{ position: "fixed", width: "20%", marginLeft: "1100px" }}
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
                                    refreshPage();
                                }}
                            >
                                DeleteAll
                            </button>
                        }
                    </Col>
                </Row>
            </Container>

            {/*  Add student button*/}
            <Row>
                {" "}
                <div>
                    {" "}
                    <IconButton
                        color="btn btn-outline-Success"
                        style={{ color: "green" }}
                        onClick={handleAddShowModal}
                    >
                        <AddCircleOutlineIcon />
                        &nbsp; Add New
                    </IconButton>{" "}
                </div>
            </Row>
            <br></br>

            {/* Get Table Data*/}
            <TableContainer component={Paper} sx={{
                marginBottom: 2, padding: '0.5%', position: "fixed",
                top: "120px"
            }}>
                <Table
                    striped
                    bordered
                    style={{
                        backgroundColor: "#EAECEC",
                        padding: "20px",
                        marginRight: "40px",
                        top: "100px",
                        overflowX: "auto", // Add this line for horizontal scrollbar
                        maxWidth: "100%", // Ensure the table takes the full width
                    }}
                >
                    <thead>
                        <tr style={{ textAlign: "center", backgroundColor: "gray" }}>

                            <th>  <input
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={selectAll}
                            /></th>
                            {/*  <th>StudentId</th>*/}
                            <th>Name</th>
                            <th>DOB</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>City</th>

                            <th>Mobile</th>
                            <th>Photo</th>
                            <th>Degree</th>
                            <th>Cources</th>
                            <th>CourceCode</th>
                            <th>Credit</th>
                            <th>Grade</th>
                            <th>Enroll Date</th>
                            <th>Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0
                            ? data.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index} style={{ textAlign: "center", height: "Auto" }}>
                                            {/*  <td>{index + 1}</td>*/}
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    name="rowCheckbox"
                                                    value={item.id}
                                                    onChange={handleCheckboxChange}
                                                />


                                            </td>
                                            {/* <td>{item.id}</td>*/}
                                            <td>{item.name}</td>
                                            <td>
                                                {item.dob
                                                    ? new Date(item.dob).toLocaleDateString()
                                                    : "N/A"}
                                            </td>

                                            <td>{item.age}</td>
                                            <td>{item.gender}</td>
                                            <td>{item.emailId}</td>
                                            <td>{item.city}</td>

                                            <td>{item.mobileNo}</td>
                                            <td>
                                                <div
                                                    style={{
                                                        textAlign: "center",
                                                        maxWidth: "50px",
                                                        maxHeight: "50px",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    {item.photo !== null ? (
                                                        <img
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                objectFit: "cover",
                                                            }}
                                                            src={`data:image/png;base64,${item.photo}`}
                                                            alt={`${item.name}`}
                                                            onClick={() => HandlePreview2(item.id)}
                                                        />
                                                    ) : (
                                                        ".."
                                                    )}
                                                </div>
                                            </td>
                                            <td>{item.degree}</td>
                                            <td>{item.courceName}</td>
                                            <td>{item.courceCode}</td>
                                            <td>{item.credits}</td>
                                            <td>{item.grade} </td>
                                            <td>   {item.enrollmentDate
                                                ? new Date(item.enrollmentDate).toLocaleDateString()
                                                : "N/A"}</td>
                                            <td className="text-center">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={item.isActive}
                                                    onChange={() => handleIsActiveChange(item.id)}
                                                    disabled={checkboxesDisabled}
                                                    id={`checkbox_${item.id}`}
                                                /></td>
                                            <td colSpan={2}>
                                                <EditIcon
                                                    style={{ cursor: "pointer", color: "blue" }} // Set color or other styles as needed
                                                    onClick={() => HandleEdit(item.id)}
                                                ></EditIcon>
                                                &nbsp;
                                                <VisibilityIcon
                                                    onClick={() => HandlePreview(item.id)}
                                                    style={{ cursor: "pointer" }}
                                                />
                                                &nbsp;
                                                <DeleteIcon
                                                    onClick={() => {
                                                        HandleDelete(item.id);
                                                    }}
                                                    style={{ cursor: "pointer", color: "red" }} // Customize the color
                                                />
                                            </td>
                                        </tr>
                                    </>
                                );
                            })
                            : "... No data here "}
                    </tbody>
                </Table>
            </TableContainer>

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
                            refreshPage();

                        }}
                        variant="danger"
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/*Image Preview Data */}
            <div>
                <Modal style={{ /*backgroundColor: 'gray',*/ marginTop: "70px" }}
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
                <Modal style={{ /*backgroundColor: 'gray',*/ marginTop: "60px" }}
                    show={showPreviewModal}
                    onHide={handleClosePreviewModal}
                    animation={true}
                >
                    <Modal.Header closeButton>
                        <Modal.Title><span style={{ textAlign: "center", marginLeft: "300px" }}>Student Preview</span></Modal.Title>
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
            <Modal style={{ /*backgroundColor: 'gray'*/ marginTop: "70px" }} show={showAddModal} onHide={handleAddCloseModal} size="lg" className="custom-modal">
                <Modal.Header closeButton >
                    <Modal.Title><span style={{ textAlign: "center", marginLeft: "300px" }}>Add New Student</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label></Form.Label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    value={Name}
                                    onChange={(e) => {
                                        SetName(e.target.value); // Set the value
                                        handleInputChange() // Handle input change and clear errors
                                    }}
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
                                    type="text"
                                    className="form-control"
                                    placeholder="Mobile No"
                                    value={MobileNo}
                                    onChange={(e) => {
                                        SetMobileNo(e.target.value)
                                        handleInputChange()
                                    }
                                    }
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
                                    type="text"
                                    className="form-control"
                                    placeholder="Age"
                                    value={Age}
                                    onChange={(e) => {
                                        SetAge(e.target.value)
                                        handleInputChange()
                                    }}
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
                                    type="text"
                                    className="form-control"
                                    placeholder="City"
                                    value={City}
                                    onChange={(e) => {
                                        SetCity(e.target.value)
                                        handleInputChange()
                                    }}
                                />
                                {errors.City && (
                                    <span className='text-danger'>{errors.City}</span>
                                )}
                            </Form.Group>
                        </Col>
                        <Row>
                            <Col xs={12} md={6} style={{ width: "405px" }}>
                                <Form.Group>
                                    <Form.Label></Form.Label>
                                    <Form.Select
                                        value={selectedDegree}
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
                            <Col xs={12} md={6} style={{ width: "380px" }}>
                                <Form.Group>
                                    <Form.Label></Form.Label>
                                    <Form.Select
                                        value={CourceName}
                                        onChange={handleCourseChange}
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
                                    value={CourceCode}
                                    onChange={(e) => setSelectedCourseCode(e.target.value)}
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
                                <Form.Select
                                    value={Grade}
                                    onChange={(e) => {
                                        SetGrade(e.target.value)
                                        handleInputChange()
                                    }}
                                >  <option value="">Select Grade</option>
                                    {GetGrade.map(grade => (
                                        <option key={grade.GradeId} value={grade.Grade}>
                                            {grade.Grade}
                                        </option>
                                    ))}
                                   
                                </Form.Select>
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

                                    type="text"
                                    className="form-control"
                                    placeholder="Credits"
                                    value={Credits}
                                    onChange={(e) => {
                                        SetCredits(e.target.value)
                                        handleInputChange()
                                    }}
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
                                    type="text"
                                    className="form-control"
                                    placeholder="Email Id"
                                    value={EmailId}
                                    onChange={(e) => {
                                        SetEmailId(e.target.value)
                                        handleInputChange()
                                    }}
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
                                            value={Gender}
                                            label="Male"
                                            type="radio"
                                            id="maleRadio"
                                            name="genderRadio"
                                            checked={Gender === "Male" || Gender === "male"}

                                            onChange={(e) => {
                                                SetGender("Male")
                                                handleInputChange()
                                            }}
                                        />
                                       
                                        <Form.Check
                                            inline
                                            value={Gender}
                                            label="Female"
                                            type="radio"
                                            id="femaleRadio"
                                            name="genderRadio"
                                            checked={Gender === "Female" || Gender === "female"}

                                            onChange={(e) => {
                                                SetGender("Female")
                                                handleInputChange()
                                            }}
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
                                        inline
                                        label="Yes"
                                        type="radio"
                                        id="yesRadio"
                                        name="isActiveRadio"
                                        checked={IsActive === true}
                                        style={{ color: IsActive ? 'green' : 'black', cursor: 'pointer' }}
                                        onChange={(e) => {
                                            SetIsActive(true)
                                            handleInputChange()
                                        }}
                                    />
                                  
                                    <Form.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        id="noRadio"
                                        name="isActiveRadio"
                                        checked={IsActive === false}
                                        style={{ color: IsActive ? 'red' : 'black', cursor: 'pointer' }}
                                        onChange={(e) => {

                                            SetIsActive(false)
                                            handleInputChange()
                                        }}
                                    />  <div>
                                        {errors.IsActive && (
                                            <span className='text-danger'>{errors.IsActive}</span>
                                        )}</div>
                                </label>
                            </Form.Group>
                           
                        </Col>

                    </Row>
                    <Row>
                        <Col xs={12} md={6} style={{ marginTop: "24px", width: "350px" }}>
                            <Form.Group>
                                <Form.Label> </Form.Label>
                                <DatePicker
                                    dateFormat="MMM-dd-yy"
                                    selected={DOB}
                                    onChange={(e) => {
                                        SetDOB(e);
                                        handleInputChange()
                                    }}
                                    className="form-control"
                                    placeholderText="Date of Birth"
                                    isValidDate={(date) => {
                                        // Return false if the date is in the future
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
                            style={{ marginLeft: "80px", marginTop: "24px", width: "350px" }}
                        >
                            <Form.Group>
                                <Form.Label> </Form.Label>
                                <DatePicker
                                    dateFormat="MMM-dd-yy"

                                    selected={EnrollmentDate ? new Date(EnrollmentDate) : null}
                                    onChange={(e) => {
                                        SetEnrollmentDate(e)
                                        handleInputChange()
                                    }}
                                    className="form-control"
                                    placeholderText="EnrollmentDate"
                                />
                            </Form.Group>
                            {errors.EnrollmentDate && (
                                <span className='text-danger'>{errors.EnrollmentDate}</span>
                            )}
                        </Col>

                    </Row>
                    <Row>

                        <Col xs={12} md={6} style={{ marginTop: "30px" }}>
                            <Form.Group>
                                <Form.Label></Form.Label>
                                <input type="file" onChange={(e) => { handleFileChange(e); handleInputChange() }} style={{ marginBottom: "30px" }} />
                                <div>  {selectedFile && (
                                    <img

                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Selected File"
                                        style={{ maxWidth: "100%", maxHeight: "100px" }}

                                    />

                                )}</div>
                                <div>
                                    {errors.photo && <span style={{ color: 'red' }}>{errors.photo}</span>}</div>

                            </Form.Group>

                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleAddCloseModal}>
                        Close
                    </Button>
                    <Button
                        variant="success"
                        onClick={(event) => { handleClickSave(event); refreshPage(); }} // Pass the event object here
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>


            {/*  Edit Model*/}
            <div>
                <Modal
                    style={{/* backgroundColor: 'gray',*/ marginTop: "70px", marginRight: "900px" }}
                    show={showEditModal}
                    onHide={handleCloseEditModal}
                    animation={true}
                >
                    <Modal.Header closeButton>
                        <Modal.Title><span style={{ textAlign: "center", marginLeft: "300px" }}>Update/Edit Student</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group>
                                    <Form.Label></Form.Label>
                                    <input
                                        type="text"
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
                                        type="text"
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
                                        type="text"
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
                                        type="text"
                                        className="form-control"
                                        placeholder="Edit City"
                                        value={EditCity}
                                        onChange={(e) => SetEditCity(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={6} style={{ width: "405px" }}>
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
                            <Col xs={12} md={6} style={{ width: "380px" }}>
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
                                    {errors.CourceName && <span className='text-danger'>{errors.CourceName}</span>}
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
                                <Form.Select
                                    value={EditGrade}
                                    onChange={(e) => 
                                        SetEditGrade(e.target.value)   }
                                >  <option value="">Select Grade</option>
                                    {GetGrade.map(grade => (
                                        <option key={grade.GradeId} value={grade.Grade}>
                                            {grade.Grade}
                                        </option>
                                    ))}

                                </Form.Select>
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
                                        type="text"
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
                                        type="text"
                                        className="form-control"
                                        placeholder="Edit Email Id"
                                        value={EditEmailId}
                                        onChange={(e) => SetEditEmailId(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={4} style={{ marginTop: "24px", width: "265px" }} >
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

                            </Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;

                            <Col xs={12} md={4} style={{ marginTop: "24px", width: "225px", marginLeft: "0px" }} >
                                <Form.Group>
                                    <label>IsActive &nbsp;:&nbsp;&nbsp;

                                        <Form.Check
                                            inline
                                            label="Yes"
                                            type="radio"
                                            id="yesRadio"
                                            name="isActiveRadio"
                                            checked={EditIsActive === true}
                                            style={{ color: EditIsActive ? 'green' : 'black', cursor: 'pointer' }}
                                            onChange={() => SetEditIsActive(true)}
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            type="radio"
                                            id="noRadio"
                                            name="isActiveRadio"
                                            checked={EditIsActive === false}
                                            style={{ color: EditIsActive ? 'red' : 'black', cursor: 'pointer' }}
                                            onChange={() => SetEditIsActive(false)}
                                        />


                                    </label>
                                </Form.Group>

                            </Col>
                        </Row>


                        <Row>
                            {" "}
                            <Col xs={12} md={6} style={{ marginTop: "24px", width: "300px" }}>
                                <Form.Group>
                                    <Form.Label> </Form.Label>
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
                            </Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Col xs={12} md={6} style={{ marginTop: "24px", width: "300px" }}>
                                <Form.Group>
                                    <Form.Label> </Form.Label>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCloseEditModal}>
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
            </div>
        </Fragment>
    );
};
export default StudentCurd;
