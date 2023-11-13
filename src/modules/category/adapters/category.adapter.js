import { Category } from "../models";

export const useCategoryAdapter = ({
  maxAmountPerMonth,
  name,
  userID,
  imagePath,
}) => {
  const category = new Category({
    maxAmount: maxAmountPerMonth,
    name,
    userID,
    image: imagePath,
  });

  const getPayloadAddCategory = () => category.getAddPayload();

  return {
    getPayloadAddCategory,
  };
};
