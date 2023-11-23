    export const citizenConfig = [
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
            },
        ],
        },

        {
        "head": "ES_TITILE_PET_DETAILS",
        "body": [
            {
            "route": "pet-details",
            "component": "PTRPetdetails",
            "withoutLabel": true,
            "key": "pets",
            "type": "component",
            "isMandatory": true,
            "hideInEmployee": true,
            "nextStep": "pincode",
            },
        ],
        },
        
        {
            "head": "PTR_LOCATION_DETAILS",
        "body": [
            {
            "route": "pincode",
            "component": "PTSelectPincode",
            "texts": {
                "headerCaption": "PT_PROPERTY_LOCATION_CAPTION",
                "header": "PT_PINCODE_LABEL",
                "cardText": "PT_PINCODE_TEXT",
                "submitBarLabel": "PT_COMMON_NEXT",
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
                "headerCaption": "PT_PROPERTY_LOCATION_CAPTION",
                "header": "CS_FILE_APPLICATION_PROPERTY_LOCATION_ADDRESS_TEXT",
                "cardText": "CS_FILE_APPLICATION_PROPERTY_LOCATION_CITY_MOHALLA_TEXT",
                "submitBarLabel": "PT_COMMON_NEXT",
            },
            "key": "address",
            "nextStep": "street",
            "isMandatory": true,
            "type": "component",
            },
            {
            "type": "component",
            "route": "street",
            "component": "PTRSelectStreet",
            "key": "address",
            "withoutLabel": true,
            "texts": {
                "headerCaption": "PT_PROPERTY_LOCATION_CAPTION",
                "header": "CS_FILE_APPLICATION_PROPERTY_LOCATION_ADDRESS_TEXT",
                "cardText": "PT_STREET_TEXT",
                "submitBarLabel": "PT_COMMON_NEXT",
            },
            "nextStep": "landmark",
            },
            {
            "type": "component",
            "route": "landmark",
            "component": "PTSelectLandmark",
            "withoutLabel": true,
            "texts": {
                "headerCaption": "PT_PROPERTY_LOCATION_CAPTION",
                "header": "CS_FILE_APPLICATION_PROPERTY_LOCATION_PROVIDE_LANDMARK_TITLE",
                "cardText": "CS_FILE_APPLICATION_PROPERTY_LOCATION_PROVIDE_LANDMARK_TEXT",
                "submitBarLabel": "PT_COMMON_NEXT",
                "skipText": "CORE_COMMON_SKIP_CONTINUE",
            },
            "key": "address",
            "nextStep": "address-proof",
            "hideInEmployee": true,
            },
        ],
        },
    
        {
        "head": "ES_TITILE_DOCUMENT_DETAILS",
        "body": [
            {
            "route": "address-proof",
            'component': "PTRDocumentUpload",
            "withoutLabel": true,
            "key": "documents",
            "type": "component",
            "nextStep": null,
            "isMandatory": true,
            "hideInEmployee": true,
            },
        ],
        },
    ];