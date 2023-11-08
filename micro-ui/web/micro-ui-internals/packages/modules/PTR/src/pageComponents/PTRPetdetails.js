import {
  CardLabel,
  CardLabelError,
  Dropdown,
  LabelFieldPair,
  LinkButton,
  //MobileNumber,
  TextInput,
  Toast,
} from "@egovernments/digit-ui-react-components";
import _ from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { stringReplaceAll, CompareTwoObjects } from "../utils";

const createPtrDetails = () => ({

  doctorName: "",
  vaccinationNumber:"",
  lastVaccineDate: "",
  petAge: "",
  petType: "",
  breedType:"",
  clinicName:"",
  petName: "",
  petGender: "",
  
  key: Date.now(),
});

const PTRPetdetails = ({ config, onSelect, userType, formData, setError, formState, clearErrors }) => {
  const { t } = useTranslation();

  const { pathname } = useLocation();
  const [pets, setPets] = useState(formData?.pets || [createPtrDetails()]);
  const [focusIndex, setFocusIndex] = useState({ index: -1, type: "" });

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  
  
  

  const { data: Menu } = Digit.Hooks.ptr.usePTRPetMDMS(stateId, "PetService", "PetType");  
  
  const { data: Jupiter } = Digit.Hooks.ptr.useBreedTypeMDMS(stateId, "PetService", "BreedType" );  // hooks for breed type
 
  let menu = [];   //variable name for pettype
  let jupiter = [];    // variable name for breedtype

  Menu &&
    Menu.map((petone) => {
      menu.push({ i18nKey: `PTR_PET_${petone.code}`, code: `${petone.code}`, value: `${petone.name}` });
  });

  //Need to integrate accordingly 

  // TO DO: Need to apply the filter to get the data according to the selection of pet type ,
  Jupiter &&
  Jupiter.map((breedss) => {
    jupiter.push({ i18nKey: `PTR_BREED_TYPE_${breedss.code}`, code: `${breedss.code}`, value: `${breedss.name}` });
  });


  const { data: Mars } = Digit.Hooks.ptr.usePTRGenderMDMS(stateId, "common-masters", "GenderType");       // this hook is for Pet gender type { male, female}

  let mars = [];    //for pet gender 

  Mars &&
  Mars.map((ptrgenders) => {                                      
    if(ptrgenders.code !=="TRANSGENDER")
    mars.push({ i18nKey: `PTR_GENDER_${ptrgenders.code}`, code: `${ptrgenders.code}`, name: `${ptrgenders.code}` });
    });

  
  useEffect(() => {
    onSelect(config?.key, pets);
    // we need to call the breed type hook here and apply the conditional expression to get the data according to selection 

  }, [pets]);

  


  const commonProps = {
    focusIndex,
    allOwners: pets,
    setFocusIndex,
    //removeOwner,
    formData,
    formState,
    setPets,
    //mdmsData,
    t,
    setError,
    clearErrors,
    config,
    menu,
    jupiter,
    mars
    //isEditScreen,
  };

  return  (
    <React.Fragment>
      {pets.map((pets, index) => (
        <OwnerForm key={pets.key} index={index} pets={pets} {...commonProps} />
      ))}
      
    </React.Fragment>
  ) 
};

const OwnerForm = (_props) => {
  const {
    pets,
    index,
    focusIndex,
    allOwners,
    setFocusIndex,
    //removeOwner,
    setPets,
    t,
    //mdmsData,
    formData,
    config,
    setError,
    clearErrors,
    formState,
    menu,
    jupiter,
    mars
    //isEditScreen,
  } = _props;
  
  const [showToast, setShowToast] = useState(null);
  const {
    control,formState: localFormState,watch,setError: setLocalError,clearErrors: clearLocalErrors,setValue,trigger,} = useForm();
  const formValue = watch();
  const { errors } = localFormState;
  const tenantId = Digit.ULBService.getCurrentTenantId();

  const isIndividualTypeOwner = useMemo(
    () => formData?.ownershipCategory?.code.includes("INDIVIDUAL"),
    [formData?.ownershipCategory?.code],
  );

  const [part, setPart] = React.useState({});

  useEffect(() => {
    let _ownerType = isIndividualTypeOwner 

    if (!_.isEqual(part, formValue)) {
      setPart({ ...formValue });
      setPets((prev) => prev.map((o) => (o.key && o.key === pets.key ? { ...o, ...formValue, ..._ownerType } : { ...o })));
      trigger();
    }
  }, [formValue]);

  useEffect(() => {
    if (Object.keys(errors).length && !_.isEqual(formState.errors[config.key]?.type || {}, errors))
      setError(config.key, { type: errors });
    else if (!Object.keys(errors).length && formState.errors[config.key]) clearErrors(config.key);
  }, [errors]);

  const errorStyle = { width: "70%", marginLeft: "30%", fontSize: "12px", marginTop: "-21px" };

  return (
    <React.Fragment>
      <div style={{ marginBottom: "16px" }}>
        <div style={{ border: "1px solid #E3E3E3", padding: "16px", marginTop: "8px" }}>
          {allOwners?.length > 2 ? (
            <div style={{ marginBottom: "16px", padding: "5px", cursor: "pointer", textAlign: "right" }}>
              X
            </div>
          ) : null}

          <LabelFieldPair>
            <CardLabel className="card-label-smaller">{t("PTR_PET_TYPE ") + " *"}</CardLabel>
            <Controller
              control={control}
              name={"petType"}
              defaultValue={pets?.petType}
              rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
              render={(props) => (
                <Dropdown
                  
                  className="form-field"
                  selected={props.value}
                  select={props.onChange}
                  onBlur={props.onBlur}
                  option={menu}
                  optionKey="i18nKey"
                  t={t}
                />
                 
              )}
              
            />
            
          </LabelFieldPair>
          <CardLabelError style={errorStyle}>{localFormState.touched.petType ? errors?.petType?.message : ""}</CardLabelError>
          <LabelFieldPair>
            <CardLabel className="card-label-smaller">{t("PTR_BREED_TYPE ") + " *"}</CardLabel>
            <Controller
              control={control}
              name={"breedType"}
              defaultValue={pets?.breedType}
              rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
              render={(props) => (
                <Dropdown
                  className="form-field"
                  selected={props.value}
                  select={props.onChange}
                  onBlur={props.onBlur}
                  option={jupiter}
                  optionKey="i18nKey"
                  t={t}
                />
              )}
            />
          </LabelFieldPair>
          <CardLabelError style={errorStyle}>{localFormState.touched.breedType ? errors?.breedType?.message : ""}</CardLabelError>

          <LabelFieldPair>
            <CardLabel className="card-label-smaller">{t("PTR_PET_NAME") + " *"}</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name={"petName"}
                defaultValue={pets?.petName}
                rules={{
                  required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  validate: { pattern: (val) => (/^[a-zA-Z\s]*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                }}
                render={(props) => (
                  <TextInput
                    value={props.value}
                   // disable={isEditScreen}
                    autoFocus={focusIndex.index === pets?.key && focusIndex.type === "petName"}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                      setFocusIndex({ index: pets.key, type: "petName" });
                    }}
                    onBlur={(e) => {
                      setFocusIndex({ index: -1 });
                      props.onBlur(e);
                    }}
                  />
                )}
              />
            </div>
          </LabelFieldPair>
          <CardLabelError style={errorStyle}>{localFormState.touched.petName ? errors?.petName?.message : ""}</CardLabelError>

          <LabelFieldPair>
            <CardLabel className="card-label-smaller">{t("PTR_PET_AGE") + " *"}</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name={"petAge"}
                defaultValue={pets?.petAge}
                rules={{
                  required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  validate: (v) => (/^[0-1-2-3]\d{1,2}$/.test(v) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")),
                }}
                render={(props) => (
                  <TextInput
                    value={props.value}
                   // disable={isEditScreen}
                    autoFocus={focusIndex.index === pets?.key && focusIndex.type === "petAge"}
                    onChange={(e) => {
                      props.onChange(e);
                      setFocusIndex({ index: pets.key, type: "petAge" });
                    }}
                    labelStyle={{ marginTop: "unset" }}
                    onBlur={props.onBlur}
                    placeholder="in years"
                  />
                )}
              />
            </div>
          </LabelFieldPair>
          <CardLabelError style={errorStyle}>{localFormState.touched.petAge ? errors?.petAge?.message : ""}</CardLabelError>

          <LabelFieldPair>
            <CardLabel className="card-label-smaller">{t("PTR_SEX ") + " *"}</CardLabel>
            <Controller
              control={control}
              name={"petGender"}
              defaultValue={pets?.petGender}
              rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
              render={(props) => (
                <Dropdown
                  className="form-field"
                  selected={props.value}
                  select={props.onChange}
                  onBlur={props.onBlur}
                 // disable={isEditScreen}
                  option={mars}
                  optionKey="i18nKey"
                  t={t}
                />
              )}
            />
          </LabelFieldPair>
          <CardLabelError style={errorStyle}>{localFormState.touched.petGender ? errors?.petGender?.message : ""}</CardLabelError>

          <LabelFieldPair>
            <CardLabel className="card-label-smaller">{t("PTR_DOCTOR_NAME") + " *"}</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name={"doctorName"}
                defaultValue={pets?.doctorName}
                rules={{
                  required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  validate: { pattern: (val) => (/^\w+( +\w+)*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                }}
                render={(props) => (
                  <TextInput
                    value={props.value}
                   // disable={isEditScreen}
                    autoFocus={focusIndex.index === pets?.key && focusIndex.type === "doctorName"}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                      setFocusIndex({ index: pets.key, type: "doctorName" });
                    }}
                    onBlur={props.onBlur}
                  />
                )}
              />
            </div>
          </LabelFieldPair>
          <CardLabelError style={errorStyle}>
            {localFormState.touched.doctorName ? errors?.doctorName?.message : ""}
          </CardLabelError>
          <LabelFieldPair>
            <CardLabel className="card-label-smaller">{t("PTR_CLINIC_NAME") + " *"}</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name={"clinicName"}
                defaultValue={pets?.clinicName}
                rules={{
                  required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  validate: { pattern: (val) => (/^\w+( +\w+)*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                }}
                render={(props) => (
                  <TextInput
                    value={props.value}
                   // disable={isEditScreen}
                    autoFocus={focusIndex.index === pets?.key && focusIndex.type === "clinicName"}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                      setFocusIndex({ index: pets.key, type: "clinicName" });
                    }}
                    onBlur={props.onBlur}
                  />
                )}
              />
            </div>
          </LabelFieldPair>
          <CardLabelError style={errorStyle}>
            {localFormState.touched.clinicName ? errors?.clinicName?.message : ""}
          </CardLabelError>

          <LabelFieldPair>
            <CardLabel className="card-label-smaller">{t("PTR_VACCINATED_DATE") + " *"}</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name={"lastVaccineDate"}
                defaultValue={pets?.lastVaccineDate}
                rules={{
                  required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  validDate: (val) => (/^\d{4}-\d{2}-\d{2}$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")),
                }}
                render={(props) => (
                  <TextInput
                      type="date"
                      value={props.value}
                      onChange={(e) => {
                          props.onChange(e.target.value);
                      }}
                      max={new Date().toISOString().split('T')[0]}
                  />
                )}
              />
            </div>
          </LabelFieldPair>
          <CardLabelError style={errorStyle}>{localFormState.touched.lastVaccineDate ? errors?.lastVaccineDate?.message : ""}</CardLabelError>

          <LabelFieldPair>
            <CardLabel className="card-label-smaller">{t("PTR_VACCINATION_NUMBER") + " *"}</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name={"vaccinationNumber"}
                defaultValue={pets?.vaccinationNumber}
                // rules={{
                //  // required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                //   //validate: { pattern: (val) => (/^\w+( +\w+)*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                // }}
                render={(props) => (
                  <TextInput
                    value={props.value}
                   // disable={isEditScreen}
                    autoFocus={focusIndex.index === pets?.key && focusIndex.type === "vaccinationNumber"}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                      setFocusIndex({ index: pets.key, type: "vaccinationNumber" });
                    }}
                    onBlur={props.onBlur}
                  />
                )}
              />
            </div>
          </LabelFieldPair>
          <CardLabelError style={errorStyle}>
            {localFormState.touched.vaccinationNumber ? errors?.vaccinationNumber?.message : ""}
          </CardLabelError>



        </div>
      </div>
      {showToast?.label && (
        <Toast
          label={showToast?.label}
          onClose={(w) => {
            setShowToast((x) => null);
          }}
        />
      )}
    </React.Fragment>
  );
};

export default PTRPetdetails;