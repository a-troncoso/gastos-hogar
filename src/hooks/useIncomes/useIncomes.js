import { useState, useCallback } from "react";
import { fetchTotalIncomesByDateCriteria } from "../../dbOperations/income/incomeBDTransactions";
import alerts from "../../components/atoms/Alerts";

export default () => {
  const [totalIncome, setTotalIncome] = useState(0);

  const fetchTotalIncomes = useCallback(
    async dateOptions => {
      try {
        const totalAmountInfo = await fetchTotalIncomesByDateCriteria({
          ...dateOptions,
        });
        setTotalIncome(totalAmountInfo.rows?._array[0]?.totalAmount);
      } catch (err) {
        alerts.throwErrorAlert(
          "calcular el total de ingresos",
          JSON.stringify(err)
        );
      }
    },
    [fetchTotalIncomesByDateCriteria, alerts]
  );

  return {
    totalIncome,
    fetchTotalIncomes,
  };
};
