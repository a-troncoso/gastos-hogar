import { useState, useCallback } from "react";
import { fetchTotalAmountByDateCriteria } from "../../dbOperations/purchase/purchaseBDTransactions";
import alerts from "../../components/atoms/Alerts";

export default () => {
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchTotalExpenses = useCallback(
    async dateOptions => {
      try {
        const totalAmountInfo = await fetchTotalAmountByDateCriteria({
          ...dateOptions,
        });
        setTotalAmount(totalAmountInfo.totalAmount);
      } catch (err) {
        alerts.throwErrorAlert("calcular el monto total", JSON.stringify(err));
      }
    },
    [fetchTotalAmountByDateCriteria, alerts]
  );

  return {
    fetchTotalExpenses,
    totalAmount,
  };
};
