import React from "react";
import PageHeader from "../../main/PageHeader";
import NameComponent from "../../main/Pages/Forms/components/Name";
import useClinicRegForm from "../hooks/useClinicRegForm";
import Birthday from "../../main/Pages/Forms/components/Birthday";
import SelectGender from "../../main/Pages/Forms/components/Gender";
import NumberEmail from "../../main/Pages/Forms/components/NumberEmail";
import Address from "../../main/Pages/Forms/components/Address";
import ContentTitle from "../../main/PageContent/ContentTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import NewBirthday from "@/main/Pages/Forms/components/NewBirthday";

const ClinicOwnerForm = ({
  register,
  errors,
  control,
  watch,
  setError,
  clearErrors,
}) => {
  return (
    <>
      <div className="no-scrollbar">
        <div>
          <div className="p-5 lg:px-20">
            <div className="pb-3">
              <p className="font-bold text-md lg:text-xl">
                CLINIC OWNER DETAILS
              </p>
            </div>
            <div className="space-y-3 lg:space-y-5">
              <NameComponent register={register} errors={errors} />
              <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                <SelectGender errors={errors} control={control} />
                <NumberEmail
                  register={register}
                  errors={errors}
                  setError={setError}
                  clearErrors={clearErrors}
                  watch={watch}
                />
              </div>
              <NewBirthday control={control} watch={watch} errors={errors} />
              <Address register={register} errors={errors} control={control} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClinicOwnerForm;
