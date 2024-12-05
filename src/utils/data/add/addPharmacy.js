import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";
import addPharmacyFiles from "./addPharmacyFiles";
import { getFDA, getPic } from "../fetch/getPharmacyFiles";

const addPharmacy = async (pharmacydata, ownerid) => {
  try {
    const pharAddress = {
      address_line: pharmacydata.pharmacy_additional_address,
      region: pharmacydata.pharmacy_region,
      province: pharmacydata.pharmacy_province,
      city: pharmacydata.pharmacy_municipality,
      barangay: pharmacydata.pharmacy_barangay,
    };

    const { data: pharAddressData, error: pharAddressError } =
      await centralSupabase.from("addresses").insert([pharAddress]).select();

    if (pharAddressError) {
      return { error: pharAddressError.message };
    }

    await addPharmacyFiles(
      pharmacydata.pharmacy_name,
      pharmacydata.fda_license[0],
      pharmacydata.pharmacy_pic[0]
    );

    const fdaUrl = await getFDA(pharmacydata.pharmacy_name);
    const picUrl = await getPic(pharmacydata.pharmacy_name);

    const pharmacy_data = {
      owner_id: ownerid,
      address_id: pharAddressData[0].id,
      name: pharmacydata.pharmacy_name,
      fda_license_num: pharmacydata.fda_number,
      fda_license_url: fdaUrl.publicUrl,
      site_pic_url: picUrl.publicUrl,
    };
    const { data: pharmacyData, error: pharmacyError } = await centralSupabase
      .from("pharmacy")
      .insert([pharmacy_data])
      .select();

    if (pharmacyError) {
      const { error } = await centralSupabase
        .from("addresses")
        .delete()
        .eq("id", pharAddressData[0].id);
      return { error: pharmacyError.message };
    }

    return pharmacyData[0].id;
  } catch (err) {
    return { error: err };
  }
};

export default addPharmacy;
