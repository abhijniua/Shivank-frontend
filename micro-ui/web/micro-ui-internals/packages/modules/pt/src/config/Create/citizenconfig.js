                export const citizenConfig =
                [
                    {
                    "head": "ES_TITILE_OWNER_DETAILS",
                    "body": [
                        {
                            "route":"info",
                            "component":"PropertyTax",
                            "nextStep": "owners",
                            // "hideInEmployee": true,
                            "key": "Documents"
                        },

                        
                        {
                        "route": "owners",
                        "component": "PTRCitizenDetails",
                        "withoutLabel": true,
                        "key": "owners",
                        "type": "component",
                        "nextStep": "pet-details",
                        "hideInEmployee": true,
                        "isMandatory": true,
                        "texts": {
                            "submitBarLabel": "PTR_COMMON_NEXT",
                        }
                        },
                    ],
                    },

                    {
                    "head": "ES_TITILE_PET_DETAILS",
                    "body": [
                        {
                        "route": "pet-details",
                        "component": "PTRCitizenPet",
                        "withoutLabel": true,
                        "key": "pets",
                        "type": "component",
                        "isMandatory": true,
                        "hideInEmployee": true,
                        "nextStep": "pincode",
                        "texts": {
                            "submitBarLabel": "PTR_COMMON_NEXT",
                        }
                        },
                    ],
                    },
                    
                    {
                    "head": "PTR_LOCATION_DETAILS",
                    "body": 
                    [
                        {
                        "route": "pincode",
                        "component": "PTSelectPincode",
                        "texts": {
                            
                            "submitBarLabel": "PTR_COMMON_NEXT",
                            "skipText": "CORE_COMMON_SKIP_CONTINUE",
                        },
                        "withoutLabel": true,
                        "key": "address",
                        "nextStep": "address",
                        "type": "component",
                        },

                        {
                        "route": "address",
                        "component": "PTSelectAddress",
                        "withoutLabel": true,
                        "texts": {
                            
                            "submitBarLabel": "PTR_COMMON_NEXT",
                        },
                        "key": "address",
                        "nextStep": "street",
                        "isMandatory": true,
                        "type": "component",
                        },

                        {
                        "type": "component",
                        "route": "street",
                        "component": "PTRCitizenAddress",
                        "key": "address",
                        "withoutLabel": true,
                        "texts": {
                            "submitBarLabel": "PTR_COMMON_NEXT",
                        },
                        "nextStep": "documents",
                        },

                        
                    ],
                    },
                        
                
                    {
                    "head": "ES_TITILE_DOCUMENT_DETAILS",
                    "body": [
                        {
                            "route": "documents",
                            "component": "SelectProofIdentity",
                            "withoutLabel": true,
                            "key": "Documents",
                            "type": "component",
                            "nextStep":null,
                            "texts": {
                                "submitBarLabel": "PTR_COMMON_NEXT",
                            },
                            
                        }
                    ],
                    },
                ];