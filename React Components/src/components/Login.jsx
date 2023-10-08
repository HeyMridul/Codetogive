import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setShowError(false);
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.email || !values.password) return setShowError(true);

    const rsp = await axios
      .post("http://localhost:3001/auth/login", values)
      .then((res) => res.data)
      .catch((err) => console.log(err));

    if (rsp && rsp.status == "success") {
      props.setUser(rsp.user);
      navigate("/profile");
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="d-flex justify-content-center pt-5">
      <form
        className="mt-5 text-center border rounded p-5 w-md-25 bg-body-tertiary"
        onSubmit={handleSubmit}
      >
        <h1 className="h3 mb-2 fw-normal">Sign in to continue</h1>
        <p className="m-0 my-2 text-danger">
          {showError ? "Invalid Email/Password" : <Fragment>&nbsp;</Fragment>}
        </p>
        <div className="form-floating">
          <input
            type="email"
            className="form-control shadow-none"
            id="email"
            placeholder="email"
            name="email"
            onChange={handleChange}
          />
          <label htmlFor="email">Email address</label>
        </div>
        <br />
        <div className="input-group">
          <div className="form-floating">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control shadow-none"
              id="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>
          <button
            type="button"
            className="btn border"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
          </button>
        </div>
        <br />
        <button className="btn btn-primary px-5 py-2 mt-1" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
