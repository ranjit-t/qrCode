import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { Request } from "../types";

const StyledForm = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 15px;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  input,
  textarea {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
  }

  textarea {
    min-height: 100px;
  }

  button {
    padding: 12px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;

    &:hover {
      background: #0056b3;
    }
  }

  .error {
    color: red;
    font-size: 0.8rem;
  }
`;

interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  reason: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  reason: Yup.string().required("Required"),
});

function HomePage() {
  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      const requests = JSON.parse(
        localStorage.getItem("requests") || "[]"
      ) as Request[];

      const newRequest: Request = {
        id: Date.now().toString(),
        ...values,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "requests",
        JSON.stringify([...requests, newRequest])
      );
      alert("Request submitted successfully!");
      resetForm();
    } catch (error) {
      alert("Error submitting request");
    }
  };

  return (
    <StyledForm>
      <h1>Submit Request</h1>
      <Formik
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          reason: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="email" type="email" placeholder="Email" />
            {errors.email && touched.email && (
              <div className="error">{errors.email}</div>
            )}

            <Field name="firstName" placeholder="First Name" />
            {errors.firstName && touched.firstName && (
              <div className="error">{errors.firstName}</div>
            )}

            <Field name="lastName" placeholder="Last Name" />
            {errors.lastName && touched.lastName && (
              <div className="error">{errors.lastName}</div>
            )}

            <Field
              name="reason"
              as="textarea"
              placeholder="Reason for Request"
            />
            {errors.reason && touched.reason && (
              <div className="error">{errors.reason}</div>
            )}

            <button type="submit">Submit Request</button>
          </Form>
        )}
      </Formik>
    </StyledForm>
  );
}

export default HomePage;
