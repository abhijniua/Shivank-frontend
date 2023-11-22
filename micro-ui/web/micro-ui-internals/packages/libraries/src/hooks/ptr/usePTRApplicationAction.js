import { useMutation } from "react-query";
// import ApplicationUpdateActionsPTR from "../../services/molecules/PTR/ApplicationUpdateActionsPTR";
import ApplicationUpdateActionsPTR from "../../services/molecules/PTR/ApplicationUpdateActionsPTR"

const usePTRApplicationAction = (tenantId) => {
  console.log("hok for action ")
  
  return useMutation((applicationData) => ApplicationUpdateActionsPTR(applicationData, tenantId));
};

// console.log("hjdfhj", applicationData)

export default usePTRApplicationAction;
