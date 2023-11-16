import { PTRSearch } from "../../services/molecules/PTR/Search";
import { useQuery } from "react-query";

const usePtrApplicationDetail = (t, tenantId, applicationNumber, config = {}, userType, args) => {
  console.log("####",applicationNumber)
  const defaultSelect = (data) => {
    let applicationDetails = data.applicationDetails.map((obj) => {
      const { additionalDetails, title } = obj;
      if (title === "PT_OWNERSHIP_INFO_SUB_HEADER") {
        additionalDetails.applicantName = additionalDetails.applicantName.filter((e) => e.status === "ACTIVE");
        const values = additionalDetails.documents[0]?.values?.filter((e) => e.status === "ACTIVE");
        additionalDetails.documents[0] = { ...additionalDetails.documents[0], values };
        return { ...obj, additionalDetails };
      }
      return obj;
// just change the applicantNAme instead of owners just to check the curl 
    });
    data.applicationData.units=data?.applicationData?.units?.filter(unit=>unit?.active)||[];
    return { ...data, applicationDetails };
  };

  return useQuery(
    ["APPLICATION_SEARCH", "PT_SEARCH", applicationNumber, userType, args],
    () => PTRSearch.applicationDetails(t, tenantId, applicationNumber, userType, args),
    { select: defaultSelect, ...config }
    // config
  );
};

export default usePtrApplicationDetail;
