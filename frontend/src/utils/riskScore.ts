import { Customer } from "../types/commonTypes.types";

export function calculateRiskScore(customer: Customer): number {
  const { creditScore, loanRepaymentHistory, monthlyIncome, outstandingLoans } =
    customer;

  // Credit Score Component (out of 40)
  const creditComponent = ((creditScore - 300) / 550) * 40;

  // Repayment History Component (out of 30)
  const goodPayments = loanRepaymentHistory.filter((p) => p === 1).length;
  const historyComponent = (goodPayments / loanRepaymentHistory.length) * 30;

  // Debt Ratio Component (out of 30)
  const debtRatio = outstandingLoans / monthlyIncome;
  let debtComponent = 0;
  if (debtRatio < 1) debtComponent = 30;
  else if (debtRatio < 2) debtComponent = 20;
  else if (debtRatio < 3) debtComponent = 10;
  else debtComponent = 0;

  const score = Math.round(creditComponent + historyComponent + debtComponent);
  return Math.min(100, Math.max(0, score)); // clamp between 0 and 100
}
