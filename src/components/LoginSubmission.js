import React, { useState } from "react";
import { Login } from "./Login";
import { Spinner } from "./Spinner";
import { useFormSubmission } from "../hooks/useFormSubmission";
import { STATUS } from "../reducers/formSubmissionReducer";

const LoginSubmission = () => {
  const [formData, setFormData] = useState(null);
  const { status, responseData, errorMessage } = useFormSubmission({
    endpoint: "https://auth-provider.example.com/api/login",
    data: formData,
  });

  return (
    <>
      {status === STATUS.resolved ? (
        <div>
          Welcome <strong>{responseData.username}</strong>
        </div>
      ) : (
        <Login onSubmit={(data) => setFormData(data)} />
      )}
      <div style={{ height: 200 }}>
        {status === STATUS.pending ? <Spinner /> : null}
        {status === STATUS.rejected ? (
          <div role="alert" style={{ color: "red" }}>
            {errorMessage}
          </div>
        ) : null}
      </div>
    </>
  );
};

export { LoginSubmission };
