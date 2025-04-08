import { ReactNode } from "react";

export type AppLayoutProps = {
  children: ReactNode;
};

export type InfoCardProps = {
  title: string;
  value: string | number;
  icon?: ReactNode;
  footer?: ReactNode;
  loading?: boolean;
  extra?: ReactNode;
};

export type Customer = {
  customerId: string;
  name: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  creditScore: number;
  outstandingLoans: number;
  loanRepaymentHistory: number[];
  accountBalance: number;
  status: string;
};

export type DataType = {
  customerId: string;
  name: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  creditScore: number;
  outstandingLoans: number;
  loanRepaymentHistory: number[];
  accountBalance: number;
  status: string;
};
