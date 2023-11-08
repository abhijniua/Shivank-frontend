import { useMutation } from "react-query";
// import ApplicationUpdateActions from "../../services/molecules/PT/ApplicationUpdateActions";
import ApplicationUpdateActionsPTR from "../../services/molecules/PTR/ApplicationUpdateActionsPTR";

const usePTRApplicationAction = (tenantId) => {
  return useMutation((applicationData) => ApplicationUpdateActionsPTR(applicationData, tenantId));
};

export default usePTRApplicationAction;
