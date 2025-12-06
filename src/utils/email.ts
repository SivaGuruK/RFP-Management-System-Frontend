import { type Email } from "../store/types/email.types";

interface EmailInfo {
  vendorName: string;
  vendorEmail: string;
  rfpTitle: string;
}

export const extractEmailInfo = (email: Email): EmailInfo => {
  const vendorName =
    email.vendorId && typeof email.vendorId === "object" && email.vendorId.name
      ? email.vendorId.name
      : "Unknown Vendor";

  const vendorEmail =
    email.vendorId && typeof email.vendorId === "object" && email.vendorId.email
      ? email.vendorId.email
      : email.from;

  const rfpTitle =
    email.rfpId && typeof email.rfpId === "object" && email.rfpId.title
      ? email.rfpId.title
      : "Unknown RFP";

  return { vendorName, vendorEmail, rfpTitle };
};
