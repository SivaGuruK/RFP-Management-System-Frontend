import type { GeneratedRFP } from "../store/types/rfp.types";

export const isRFPValid = (rfp: GeneratedRFP): boolean => {
  if (!rfp.title.trim() || !rfp.description.trim() || !rfp.budget || rfp.budget <= 0) return false;
  if (!rfp.deliveryTimeline?.trim() || !rfp.paymentTerms?.trim() || !rfp.warrantyRequired?.trim()) return false;
  if (!rfp.items.length) return false;
  for (const item of rfp.items) {
    if (!item.name.trim() || !item.specifications.trim() || !item.quantity || item.quantity <= 0) return false;
  }
  return true;
};
