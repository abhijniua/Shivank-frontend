import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

//need to check the authorization is true or false   
export const PTRService = {
  create: (details, tenantId) =>
    Request({
      url: Urls.ptr.create,
      data: details,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    }),

    search: ({ tenantId, filters, auth }) =>
    Request({
      url: Urls.ptr.search,
      useCache: false,
      method: "POST",
      auth: auth === false ? auth : true,
      userService: auth === false ? auth : true,
      params: { tenantId, ...filters },
    }),


  // search: ({ tenantId, filters, auth }) =>
  //   Request({
  //     url: Urls.ptr.search,
  //     useCache: false,
  //     method: "POST",
  //     auth: true,
  //     userService: false,
  //     params: { tenantId, ...filters },
  //   }),
  

  
//   update: (details, tenantId) =>
//     Request({
//       url: Urls.pt.update,
//       data: details,
//       useCache: false,
//       setTimeParam: false,
//       userService: true,
//       method: "POST",
//       params: {},
//       auth: true,
//     }),
  
    
};




