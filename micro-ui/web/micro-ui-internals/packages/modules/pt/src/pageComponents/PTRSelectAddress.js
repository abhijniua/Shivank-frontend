import {
  CardLabel,
  CardLabelError,
  Dropdown,
  LabelFieldPair,
  LinkButton,
  TextInput,
  Toast,
} from "@egovernments/digit-ui-react-components";
import _ from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { stringReplaceAll, CompareTwoObjects } from "../utils";

const createAddressDetails = () => ({

  doorNo:"",
  houseName:"",
  addressLine1:"",
  addressLine2:"",
  street:"",
  landmark:"",
  locality:"",
  city:"",
  pincode:"",
  key: Date.now(),
});

const PTRSelectAddress = ({ config, onSelect, userType, formData, setError, formState, clearErrors }) => {
  const { t } = useTranslation();

  const { pathname } = useLocation();
  const [address, setAddress] = useState(formData?.address || [createAddressDetails()]);
  const [focusIndex, setFocusIndex] = useState({ index: -1, type: "" });

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();

//   const { data: Menu } = Digit.Hooks.pt.usePTGenderMDMS(stateId, "common-masters", "GenderType");
// console.log("address",address)
//   let menu = [];

  // Menu &&
  //   Menu.map((formGender) => {
  //     menu.push({ i18nKey: `PT_FORM3_${formGender.code}`, code: `${formGender.code}`, value: `${formGender.code}` });
  //   });

  const { data: Jupiter } = Digit.Hooks.ptr.useBreedTypeMDMS(stateId, "PetService", "BreedType" );  // this hook is just a jugad for locality 
  let jupiter = [];

  Jupiter &&
  Jupiter.map((breedss) => {
    jupiter.push({ code: `${breedss.code}`, name: `${breedss.name}` });
  });


   


  useEffect(() => {
    onSelect(config?.key, address);
  }, [address]);

  const commonProps = {
    focusIndex,
    allOwners: address,
    setFocusIndex,
    formData,
    formState,
    setAddress,
    t,
    setError,
    clearErrors,
    config,
    //menu,
    jupiter
  };

  return  (
    <React.Fragment>
      {address.map((address, index) => (
        <OwnerForm key={address.key} index={index} address={address} {...commonProps} />
      ))}
      
    </React.Fragment>
  ) 
};

const OwnerForm = (_props) => {
  const {
    address,
    index,
    focusIndex,
    allOwners,
    setFocusIndex,
    setAddress,
    t,
    formData,
    config,
    setError,
    clearErrors,
    formState,
    //menu,
    jupiter
  } = _props;
  const [showToast, setShowToast] = useState(null);
  const {
    control,
    formState: localFormState,
    watch,
    setError: setLocalError,
    clearErrors: clearLocalErrors,
    setValue,
    trigger,
  } = useForm();
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
      setAddress((prev) => prev.map((o) => (o.key && o.key === address.key ? { ...o, ...formValue, ..._ownerType } : { ...o })));
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
            <div
             style={{ marginBottom: "16px", padding: "5px", cursor: "pointer", textAlign: "right" }}
            >
              X
            </div>
          ) : null}


          <LabelFieldPair>
            <CardLabel className="card-label-smaller">{t("PTR_HOUSE_NO.") + " *"}</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name={"doorNo"}
                defaultValue={address?.doorNo}
                rules={{
                  //required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  validate: { pattern: (val) => (/^[A-Z]-?\d+$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) }
              }}
                render={(props) => (
                  <TextInput
                    value={props.value}
                   //// disable={isEditScreen}
                    autoFocus={focusIndex.index === address?.key && focusIndex.type === "doorNo"}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                      setFocusIndex({ index: address.key, type: "doorNo" });
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
          <CardLabelError style={errorStyle}>{localFormState.touched.doorNo ? errors?.doorNo?.message : ""}</CardLabelError>

          <LabelFieldPair>
            <CardLabel className="card-label-smaller">{t("PTR_HOUSE_NAME") + " *"}</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name={"houseName"}
                defaultValue={address?.houseName}
                rules={{
                  required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  validate: { pattern: (val) => (/^[a-zA-Z\s]*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                }}
                render={(props) => (
                  <TextInput
                    value={props.value}
                   //// disable={isEditScreen}
                    autoFocus={focusIndex.index === address?.key && focusIndex.type === "houseName"}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                      setFocusIndex({ index: address.key, type: "houseName" });
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
          <CardLabelError style={errorStyle}>{localFormState.touched.houseName ? errors?.houseName?.message : ""}</CardLabelError>

          <LabelFieldPair>
            <CardLabel className="card-label-smaller">{t("PTR_ADDRESS_LINE_1") + " *"}</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name={"addressLine1"}
                defaultValue={address?.addressLine1}
                rules={{
                  required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  validate: { pattern: (val) => (/^[a-zA-Z\s]*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                }}
                render={(props) => (
                  <TextInput
                    value={props.value}
                   //// disable={isEditScreen}
                    autoFocus={focusIndex.index === address?.key && focusIndex.type === "addressLine1"}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                      setFocusIndex({ index: address.key, type: "addressLine1" });
                    }}
                    onBlur={props.onBlur}
                  />
                )}
              />
            </div>
          </LabelFieldPair>
          <CardLabelError style={errorStyle}>
            {localFormState.touched.addressLine1 ? errors?.addressLine1?.message : ""}
          </CardLabelError>
          <LabelFieldPair>
            <CardLabel className="card-label-smaller">{t("PTR_ADDRESS_LINE_2") + " *"}</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name={"addressLine2"}
                defaultValue={address?.addressLine2}
                rules={{
                  required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  validate: { pattern: (val) => (/^[a-zA-Z\s]*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                }}
                render={(props) => (
                  <TextInput
                    value={props.value}
                   // disable={isEditScreen}
                    autoFocus={focusIndex.index === address?.key && focusIndex.type === "addressLine2"}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                      setFocusIndex({ index: address.key, type: "addressLine2" });
                    }}
                    onBlur={props.onBlur}
                  />
                )}
              />
            </div>
          </LabelFieldPair>
          <CardLabelError style={errorStyle}>
            {localFormState.touched.addressLine2 ? errors?.addressLine2?.message : ""}
          </CardLabelError>

          <LabelFieldPair>
            <CardLabel className="card-label-smaller">{t("PTR_STREET_NAME") + " *"}</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name={"street"}
                defaultValue={address?.street}
                rules={{
                  required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  validate: { pattern: (val) => (/^[a-zA-Z\s]*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                }}
                render={(props) => (
                  <TextInput
                    value={props.value}
                   // disable={isEditScreen}
                    autoFocus={focusIndex.index === address?.key && focusIndex.type === "street"}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                      setFocusIndex({ index: address.key, type: "street" });
                    }}
                    onBlur={props.onBlur}
                  />
                )}
              />
            </div>
          </LabelFieldPair>
          <CardLabelError style={errorStyle}>
            {localFormState.touched.street ? errors?.street?.message : ""}
          </CardLabelError>

          <LabelFieldPair>
            <CardLabel className="card-label-smaller">{t("PTR_LANDMARK") + " *"}</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name={"landmark"}
                defaultValue={address?.landmark}
                rules={{
                  required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  validate: { pattern: (val) => (/^[a-zA-Z\s]*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                }}
                render={(props) => (
                  <TextInput
                    value={props.value}
                   // disable={isEditScreen}
                    autoFocus={focusIndex.index === address?.key && focusIndex.type === "landmark"}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                      setFocusIndex({ index: address.key, type: "landmark" });
                    }}
                    onBlur={props.onBlur}
                  />
                )}
              />
            </div>
          </LabelFieldPair>
          <CardLabelError style={errorStyle}>
            {localFormState.touched.landmark ? errors?.landmark?.message : ""}
          </CardLabelError>

          <LabelFieldPair>
            <CardLabel className="card-label-smaller">{t("PTR_LOCALITY ") + " *"}</CardLabel>
            <Controller
              control={control}
              name={"locality"}
              defaultValue={address?.locality}
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
          <CardLabelError style={errorStyle}>{localFormState.touched.locality ? errors?.locality?.message : ""}</CardLabelError>

          <LabelFieldPair>
            <CardLabel className="card-label-smaller">{t("PTR_CITY") + " *"}</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name={"city"}
                defaultValue={address?.city}
                rules={{
                  required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  validate: { pattern: (val) => (/^[a-zA-Z\s]*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                }}
                render={(props) => (
                  <TextInput
                    value={props.value}
                   // disable={isEditScreen}
                    autoFocus={focusIndex.index === address?.key && focusIndex.type === "city"}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                      setFocusIndex({ index: address.key, type: "city" });
                    }}
                    onBlur={props.onBlur}
                  />
                )}
              />
            </div>
          </LabelFieldPair>
          <CardLabelError style={errorStyle}>
            {localFormState.touched.city ? errors?.city?.message : ""}
          </CardLabelError>

          <LabelFieldPair>
            <CardLabel className="card-label-smaller">{t("PTR_PINCODE") + " *"}</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name={"pincode"}
                defaultValue={address?.pincode}
                rules={{
                  required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  validate: { pattern: (val) => (/^\d{6}$/.test(val) ? true : t("ERR_INVALID_PINCODE_MSG")) },

                }}
                render={(props) => (
                  <TextInput
                    value={props.value}
                   // disable={isEditScreen}
                    autoFocus={focusIndex.index === address?.key && focusIndex.type === "pincode"}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                      setFocusIndex({ index: address.key, type: "pincode" });
                    }}
                    onBlur={props.onBlur}
                  />
                )}
              />
            </div>
          </LabelFieldPair>
          <CardLabelError style={errorStyle}>
            {localFormState.touched.pincode ? errors?.pincode?.message : ""}
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

export default PTRSelectAddress;
