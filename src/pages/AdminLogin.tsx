import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const StyledLogin = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 15px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    padding: 12px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

interface LoginValues {
  email: string;
  password: string;
}

function AdminLogin() {
  const navigate = useNavigate();

  const handleSubmit = (values: LoginValues) => {
    if (
      values.email === "amailtoranjith@gmail.com" &&
      values.password === "amailtoranjith@gmail.com"
    ) {
      sessionStorage.setItem("isAdmin", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <StyledLogin>
      <h1>Admin Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field name="email" type="email" placeholder="Email" />
          <Field name="password" type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </StyledLogin>
  );
}

export default AdminLogin;
