
//const extractDate = (dateString) => {
//    const date = new Date(dateString);
//    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns zero-based index
//    const day = String(date.getDate()).padStart(2, '0');
//    const year = date.getFullYear();
//    return `${month}/${day}/${year}`;
//};
//const validateDateFormat = (dateString) => {
//    // Regular expression to match "MM/DD/YYYY" format
//    const dateFormatRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
//    // Check if the dateString matches the format
//    return dateFormatRegex.test(dateString);
//};
const AddStudentValidations = (values) => {
    let error = {};

    //const Email_Pattern = /^[a-zA-Z0-9]+@gmail\.com$/;
    //const MobileNumber_Pattern = /^\d{10}$/; // with 10 digits
    //const Age_Pattern = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/; // Valid age range
    //const Grade_Pattern = /^[A-F]$/; // Assuming grade is A-F
    //const CreditsPattern = /^[1-5]$/;

    if (typeof values.Name !== 'string' || values.Name.trim() === "") {
        error.Name = "Enter Name ";
    } else {
        error.Name = "";
    }

    //if (typeof values.MobileNo !== 'string' || !MobileNumber_Pattern.test(values.MobileNo)) {
    //    error.MobileNo = "Enter valid Mobile Number";
    //} else if (!MobileNumber_Pattern.test(values.MobileNo)) {
    //    error.MobileNo = "Invalid Mobile Number";
    //} else {
    //    error.MobileNo = "";
    //}

    //if (values.MobileNo === "") {
    //    error.MobileNo = "Enter valid Mobile Number";
    //} else if (!MobileNumber_Pattern.test(values.MobileNo)) {
    //    error.MobileNo = "Invalid Mobile Number";
    //} else {
    //    error.MobileNo = "";
    //}

    //if (typeof values.Age !== 'string' || !Age_Pattern.test(values.Age)) {
    //    error.Age = " Enter Valid Age ";
    //} else if (!Age_Pattern.test(values.Age)) {
    //    error.Age = "Invalid Age";
    //} else {
    //    error.Age = "";
    //}

    //if (typeof values.IsActive !== 'boolean') {
    //    error.IsActive = "Please Select Student Active or Not";
    //} else if (values.IsActive !== true && values.IsActive !== false) {
    //    error.IsActive = "Invalid value for IsActive";
    //} else {
    //    error.IsActive = "";
    //}

    //if (typeof values.Credits !== 'string' || !CreditsPattern.test(values.Credits)) {
    //    error.Credits = " Enter Credits ";
    //} else if (values.Credits < 1 || values.Credits > 5) {
    //    error.Credits = "Credits should be between 1 and 5 are allowed";
    //} else {
    //    error.Credits = "";
    //}

    //if (typeof values.Degree !== 'string' || values.Degree.trim() === "") {
    //    error.Degree = "Please Select Degree";
    //} else {
    //    error.Degree = "";
    //}

    if (typeof values.City !== 'string' || values.City.trim() === "") {
        error.City = "Enter City ";
    } else {
        error.City = "";
    }

    //if (values.EmailId === "") {
    //    error.EmailId = "Enter Email Address";
    //} else if (!Email_Pattern.test(values.EmailId)) {
    //    error.EmailId = "Invalid Email";
    //} else {
    //    error.EmailId = "";
    //}

    //if (typeof values.CourceName !== 'string') {
    //    error.CourceName = "Please Select Course";
    //} else {
    //    error.CourceName = "";
    //}

    //if (typeof values.CourceCode !== 'string') {
    //    error.CourceCode = "Please Select Course Code";
    //} else {
    //    error.CourceCode = "";
    //}

    //if (typeof values.Grade !== 'string' || !Grade_Pattern.test(values.Grade)) {
    //    error.Grade = "Please Select Grade";
    //} else {
    //    error.Grade = "";
    //}

    //if (typeof values.Gender !== 'string' || (values.Gender !== 'Male' && values.Gender !== 'Female')) {
    //    error.Gender = "Please Select Gender";
    //} else {
    //    error.Gender = "";
    //}

    //if (typeof values.DOB !== 'string' || !validateDateFormat(values.DOB)) {
    //    error.DOB = "Enter Date of Birth in MM/DD/YYYY format";
    //} else {
    //    error.DOB = "";
    //}
    //if (!error.DOB) {
    //    values.DOB = extractDate(values.DOB);
    //}
    //if (typeof values.EnrollmentDate !== 'string' || !validateDateFormat(values.EnrollmentDate)) {
    //    error.EnrollmentDate = "Enter Enrollment Date in MM/DD/YYYY format";
    //} else {
    //    error.EnrollmentDate = "";
    //}

    //if (!error.EnrollmentDate) {
    //    values.EnrollmentDate = extractDate(values.EnrollmentDate);
    //}
   

    return error;
};

export default AddStudentValidations;
