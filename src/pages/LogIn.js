import React, {useState} from 'react';

let warning = 0;

function LogIn() {
    const [formInput, setFormInput] = useState({
        username: "",
        password: ""
    })

    const [formState, setFormState] = useState({
        formValidStyle: "none"
    })

    function handleFormSubmit(event) {
        event.preventDefault();
        let confirmInput = Object.values(formInput).filter(value => { return value !== "" })
        if (confirmInput.length === 2) {
            console.log("All areas filled!")
        } else {
            clearTimeout(warning);
            setFormState({ ...formState, formValidStyle: "block" })
            warning = setTimeout(() => {
                setFormState({ ...formState, formValidStyle: "none" })
            }, 3000)
        }
    }

    function handleInputChange(event) {
        switch (event.target.id) {
            case ("user"):
                setFormInput({ ...formInput, username: event.target.value })
                break;
            case ("password"):
                setFormInput({ ...formInput, password: event.target.value })
                break;
            default:
                break;
        }
    }

    return (
        <div className="content row">
            <div className="container col-xl-5 col-lg-6 col-md-8 col-sm-10">
                <h1 className="text-center">Log In</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label><i><strong> Username</strong></i></label>
                        <input className="form-control form-control-lg" id="user" onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1"><i><strong> Password</strong></i></label>
                        <input type="password" className="form-control form-control-lg" id="password" onChange={handleInputChange} />
                    </div>
                    <div className="button">
                        <button className="btn btn-primary" style={{ marginBottom: "10px" }} id="logIntoAccount">Submit</button>
                    </div>
                </form>
                <div className="alert alert-danger" id="alertFailed" style={{ display: formState.formValidStyle }}>
                    Please fill in missing information!
                </div>
            </div>
        </div>
    )

}

export default LogIn;