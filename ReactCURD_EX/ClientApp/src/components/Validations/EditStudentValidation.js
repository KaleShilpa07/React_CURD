const EditStudentValidation = (formData) => {
    const errors = {};

    if (!formData.Editname || !formData.Editname.trim()) {
        errors.Editname = "Please enter the Name.";
    }

    if (!formData.EditCity || !formData.EditCity.trim()) {
        errors.EditCity = "Please enter the City.";
    }

    if (!formData.EditAge.toString().trim()) {
        errors.EditAge = "Please enter the age.";
    } else {
        const EditAge = parseInt(formData.EditAge);
        if (isNaN(EditAge)) {
            errors.EditAge = "Age must be a valid integer.";
        } else if (EditAge < 15 || EditAge > 100) {
            errors.EditAge = "Age must be between 15 and 100.";
        }
    }


    if (!formData.EditEmailId.trim()) {
        errors.EditEmailId = "Please enter your Email Address";
    } else if (!/^[a-zA-Z0-9]+@gmail\.com$/.test
        (formData.EditEmailId)) {
        errors.EditEmailId = "Email not valid please Enter Valid Email Id "
    }

    if (!formData.EditMobileNo.trim()) {
        errors.EditMobileNo = "Enter Mobile Number";
    } else if (!/^\d{10}$/.test
        (formData.EditMobileNo)) {
        errors.EditMobileNo = "Mobile Number valid only 10 digits please Enter Valid Mobile number "
    }
    if (!formData.EditCredits.toString().trim()) {
        errors.EditCredits = "Please Enter Credits";
    } else if (!/^[1-5]$/.test(formData.EditCredits)) {
        errors.EditCredits = "Credits must be 1 to 5 please Enter Valid Credits ";
    }
    if (!formData.EditGrade.trim()) {
        errors.EditGrade = "Please Enter Grade.";
    } else if (!/^[A-F-]+$/.test(formData.EditGrade)) {
        errors.EditGrade = "Grade must be A to F or hyphen (-). Please enter a valid Grade.";
    }

    if (!formData.EditEnrollmentDate || (typeof formData.EditEnrollmentDate !== 'string') || !formData.EditEnrollmentDate.trim()) {
        errors.EditEnrollmentDate = "Please enter Enrollment Date.";
    }
    if (!formData.EditDOB || (typeof formData.EditDOB !== 'string') || !formData.EditDOB.trim()) {
        errors.EditDOB = "Please enter Enrollment Date.";
    }

    if (!formData.PhotoBase64) {
        errors.PhotoBase64 = "Please upload a photo.";
    }
    // Add validations for other fields as needed
    if (!formData.EditCourceName.trim()) {
        errors.EditCourceName = "Please Select Course Name";
    } if (!formData.EditDegree.trim()) {
        errors.EditDegree = "Please Select Degree";
    }

    if (!formData.EditCourceCode.trim()) {
        errors.EditCourceCode = "Please Select Course Code";
    }
    return errors;
};

export default EditStudentValidation;