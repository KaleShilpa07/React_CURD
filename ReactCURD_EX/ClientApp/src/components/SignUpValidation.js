const Validation = (values) => {
    let error = {};

    const Email_Pattern = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    const Password_pattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    if (values.name === "") {
        error.name = "Name should be not empty";
    }
    else {
        error.name = "";
    }

    if (values.email === "") {
        error.email = "Email should be not empty";
    } else if (!Email_Pattern.test(values.email)) {
        error.email = "Email Didn't match";
    } else {
        error.email = "";
    }

    if (values.password === "") {
        error.password = "password should be not empty";
    } else if (!Password_pattern.test(values.password)) {
        error.password = "password Didn't match";
    } else {
        error.password = "";
    }
    return error;
};

export default Validation;
