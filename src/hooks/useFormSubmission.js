import { useReducer, useEffect } from "react";
import {
  formSubmissionReducer,
  SUBMIT_ACTIONS,
  STATUS,
} from "../reducers/formSubmissionReducer";

const useFormSubmission = ({ endpoint, data }) => {
  const [state, dispatch] = useReducer(formSubmissionReducer, {
    status: STATUS.idle,
    responseData: null,
    errorMessage: null,
  });

  const fetchBody = data ? JSON.stringify(data) : null;

  useEffect(() => {
    if (fetchBody) {
      dispatch({ type: SUBMIT_ACTIONS.START });
      window
        .fetch(endpoint, {
          method: "POST",
          body: fetchBody,
          headers: {
            "content-type": "application/json",
          },
        })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            dispatch({ type: SUBMIT_ACTIONS.RESOLVE, responseData: data });
          } else {
            dispatch({ type: SUBMIT_ACTIONS.REJECT, error: data });
          }
        });
    }
  }, [fetchBody, endpoint]);

  return state;
};

export { useFormSubmission };
