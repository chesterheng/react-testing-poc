const SUBMIT_ACTIONS = {
  START: "START",
  RESOLVE: "RESOLVE",
  REJECT: "REJECT",
};

const STATUS = {
  idle: "idle",
  pending: "pending",
  resolved: "resolved",
  rejected: "rejected",
};

const formSubmissionReducer = (state, action) => {
  switch (action.type) {
    case SUBMIT_ACTIONS.START: {
      return { status: STATUS.pending, responseData: null, errorMessage: null };
    }
    case SUBMIT_ACTIONS.RESOLVE: {
      return {
        status: STATUS.resolved,
        responseData: action.responseData,
        errorMessage: null,
      };
    }
    case SUBMIT_ACTIONS.REJECT: {
      return {
        status: STATUS.rejected,
        responseData: null,
        errorMessage: action.error.message,
      };
    }
    default:
      throw new Error(`Unsupported type: ${action.type}`);
  }
};

export { SUBMIT_ACTIONS, STATUS, formSubmissionReducer };
