import { PTRSearch } from "../../services/molecules/PTR/Search";
import { useQuery } from "react-query";

const usePtrApplicationDetail = (t, tenantId, propertyIds, config = {}, userType, args) => {
  const defaultSelect = (data) => {
    let applicationDetails = data.applicationDetails.map((obj) => {
      const { additionalDetails, title } = obj;
      if (title === "PT_OWNERSHIP_INFO_SUB_HEADER") {
        additionalDetails.owners = additionalDetails.owners.filter((e) => e.status === "ACTIVE");
        const values = additionalDetails.documents[0]?.values?.filter((e) => e.status === "ACTIVE");
        additionalDetails.documents[0] = { ...additionalDetails.documents[0], values };
        return { ...obj, additionalDetails };
      }
      return obj;
    });
    data.applicationData.units=data?.applicationData?.units?.filter(unit=>unit?.active)||[];
    return { ...data, applicationDetails };
  };

  return useQuery(
    ["APPLICATION_SEARCH", "PT_SEARCH", propertyIds, userType, args],
    () => PTRSearch.applicationDetails(t, tenantId, propertyIds, userType, args),
    { select: defaultSelect, ...config }
    // config
  );
};

export default usePtrApplicationDetail;
