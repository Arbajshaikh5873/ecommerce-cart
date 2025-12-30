import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

function LogIn() {
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
      return true;
    }

    setError(
      "User with this Email not Present...please SignIn Or refresh to enter details "
    );
    return false;
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Required").email("Invalid Email"),
    Password: Yup.string()
      .required("required")
      .min(8, "Length should be min 8 characters "),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("Password"), null], "Passwords must match")
      .required("Required"),
  });

  const handleSubmit = (values) => {
    setLoading(true);
    // if current user is not present then
    if (checkUserExist(values)) {
      localStorage.setItem("currUser", JSON.stringify(values));
      console.log("Log in successful", values);
    }
    setLoading(false);
  };
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error...{error}</div>}
      {!loading && !error && (
        <div>
          <Formik
            initialValues={{
              email: "",
              Password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors, values }) => (
              <Form onSubmit={Formik.handleSubmit}>
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
                  {touched.Password && errors.Password && (
                    <ErrorMessage name={"Password"} />
                  )}
                </div>

                {/* confirmPassword */}
                <div>
                  <label>confirmPassword</label>
                  <div>
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
                  </div>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <ErrorMessage name={"confirmPassword"} />
                  )}
                </div>

                {/* Live Password match indicator */}
                {values.confirmPassword && (
                  <div
                    style={{
                      color:
                        values.Password === values.confirmPassword
                          ? "green"
                          : "red",
                    }}
                  >
                    {values.Password === values.confirmPassword
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </div>
                )}

                <button type="submit">Log In</button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default LogIn;
