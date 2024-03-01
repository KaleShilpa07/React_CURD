

const AddStudentValidations = (formData) => {
    const Allerrors = {};
    //const ValidationErrors = {};
    if (!formData.Name.trim()) {
        Allerrors.Name = "Please enter your Name.";
    }

    if (!formData.City.trim()) {
        Allerrors.City = "Please enter your City...";
    }
    if (!formData.Age.trim()) {
        Allerrors.Age = "Please enter your Age.";
    } else {
        const age = parseInt(formData.Age);
        if (isNaN(age)) {
            Allerrors.Age = "Age must be a valid integer.";
        } else if (age <= 0 || age > 100) {
            Allerrors.Age = "Age must be between 1 and 100.";
        }
    }

   
    if (!formData.EmailId.trim()) {
        Allerrors.EmailId = "Please enter your Email Address";
    } else if (!/^[a-zA-Z0-9]+@gmail\.com$/.test
        (formData.EmailId)) {
        Allerrors.EmailId = "Email not valid please Enter Valid Email id "
    }

    if (!formData.CourceName.trim()) {
        Allerrors.CourceName = "Please Select Course Name";
    } if (!formData.Degree.trim()) {
        Allerrors.Degree = "Please Select Degree";
    }

    if (!formData.CourceCode.trim()) {
        Allerrors.CourceCode = "Please Select Course Code";
    }

    if (!formData.Credits.trim()) {
        Allerrors.Credits = " Please Enter Credits";
    } else if (!/^[1-5]$/.test
        (formData.Credits)) {
        Allerrors.Credits = "Credits must be 1 to 5 please Enter Valid Credits "
    }

    if (!formData.Grade.trim()) {
        Allerrors.Grade = "Please select Grade.";
    } else if (!/^[A-F-]+$/.test(formData.Grade)) {
        Allerrors.Grade = "Grade must be A to F or hyphen (-). Please enter a valid Grade.";
    }

    if (!formData.EnrollmentDate || (typeof formData.EnrollmentDate !== 'string') || !formData.EnrollmentDate.trim()) {
        Allerrors.EnrollmentDate = "Please enter Enrollment Date.";
    }
    if (!formData.DOB || (typeof formData.DOB !== 'string') || !formData.DOB.trim()) {
        Allerrors.DOB = "Please enter Enrollment Date.";
    }
    if (!formData.MobileNo.trim()) {
        Allerrors.MobileNo = "Enter Mobile Number";
    } else if (!/^\d{10}$/.test
        (formData.MobileNo)) {
        Allerrors.MobileNo = "Mobile Number valid only 10 digits please Enter Valid Mobile number "
    }
    //if (!formData.Gender || typeof formData.Gender !== 'string' || !formData.Gender.trim()) {
    //    Allerrors.Gender = "Please select your Gender";
    //}

    if (formData.hasOwnProperty('IsActive')) {
        if (typeof formData.IsActive !== 'boolean') {
            Allerrors.IsActive = "Select Active Status";
        }
    }
    return Allerrors;
};

export default AddStudentValidations;
