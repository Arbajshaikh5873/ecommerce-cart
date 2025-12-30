import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

function SignIn() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users")) || []);
  }, []);

  const checkUserExist = (user) => {
    const tempUser = users.filter((currUser) => currUser.email == user.email);

    if (tempUser.length > 0) {
      setError(
        "User with this Email Already Present...please login Or refresh"
      );
      return false;
    }
    return true;
  };
  const validationSchema = Yup.object({
    FullName: Yup.string()
      .required("Required")
      .min(3, "FullName should be at least 3 characters"),
    email: Yup.string().email("Invalid Email").required("Required"),
    address: Yup.string().required("Required"),
    Password: Yup.string()
      .required("Required")
      .min(8, "Length should be min 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("Password"), null], "Passwords must match")
      .required("Required"),
  });

  const handleSubmit = (values) => {
    setLoading(true);
    // if current user is not present then
    if (checkUserExist(values)) {
      setUsers((prev) => [...prev, values]);
      localStorage.setItem("currUser", JSON.stringify(values));
      localStorage.setItem("users", JSON.stringify(users));
      console.log("sign in successful", values);
    }
    setLoading(false);
  };

  const getPasswordStrength = (password) => {
    if (!password) return "";

    if (password.length < 6) return "Weak";
    if (
      password.match(/[A-Z]/) &&
      password.match(/[0-9]/) &&
      password.length >= 8
    )
      return "Strong";
    return "Medium";
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error...{error}</div>}
      {!loading && !error && (
        <div>
          <Formik
            initialValues={{
              FullName: "",
              email: "",
              address: "",
              Password: "",
              confirmPassword: "",
              contact: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values }) => (
              <Form onSubmit={Formik.handleSubmit}>
                {/* Full name */}
                <div>
                  <label>enter name</label>
                  <Field name={"FullName"} placeholder="enter name" />
                  {touched.FullName && errors.FullName && (
                    <ErrorMessage name={"FullName"} component={"div"} />
                  )}
                </div>

                {/* Email */}

                <div>
                  <label>enter email</label>
                  <Field
                    type={"email"}
                    name={"email"}
                    placeholder="enter email"
                  />
                  {touched.email && errors.email && (
                    <ErrorMessage name={"email"} component={"div"} />
                  )}
                </div>

                {/* Address */}
                <div>
                  <label>enter address here:</label>
                  <Field name={"address"} placeholder="enter address" />
                  {touched.address && errors.address && (
                    <ErrorMessage name={"address"} />
                  )}
                </div>

                {/* Password */}
                <div>
                  <label>enter password</label>
                  <div>
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="Password"
                      autoComplete="new-password"
                      placeholder="Enter password"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  <div>
                    Strength: <b>{getPasswordStrength(values.Password)}</b>
                  </div>

                  {touched.Password && errors.Password && (
                    <ErrorMessage name={"Password"} />
                  )}
                </div>

                {/* confirmPassword */}
                <div>
                  <label>confirmPassword</label>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name={"confirmPassword"}
                    autoComplete="new-password"
                    placeholder="Enter confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <ErrorMessage name={"confirmPassword"} />
                  )}
                </div>

                {/* contact details */}

                <div>
                  <label>enter contact number</label>
                  <Field name={"contact"} placeholder="enter contact number" />
                  {touched.contact && errors.contact && (
                    <ErrorMessage name={"contact"} />
                  )}
                </div>

                <button type="submit">Sign In</button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default SignIn;
