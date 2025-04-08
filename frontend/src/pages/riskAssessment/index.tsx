import React, { useEffect, useState } from "react";
import { Card, Col, Row, Progress, Tag } from "antd";
import { calculateRiskScore } from "../../utils/riskScore";
import { getCustomers } from "../../services/customerService";
import { Customer } from "../../types/commonTypes.types";

const getRiskLevel = (score: number) => {
  if (score > 70) return { label: "High", color: "red" };
  if (score > 50) return { label: "Medium", color: "orange" };
  return { label: "Low", color: "green" };
};

const RiskAssessment: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    getAllCustomers();
  }, []);

  const getAllCustomers = async () => {
    const response = await getCustomers();
    setCustomers(response);
  };

  return (
    <div style={{ padding: 10 }}>
      <h2 style={{ marginBottom: "4px" }}>Risk Assessment & Scoring</h2>
      <Row gutter={[16, 16]}>
        {customers.length > 0 &&
          customers.map((customer) => {
            const score = calculateRiskScore(customer);
            const risk = getRiskLevel(score);

            return (
              <Col xs={24} sm={12} key={customer.customerId}>
                <Card
                  title={customer.name}
                  style={{
                    border: "1px solid",
                    borderColor:
                      risk.color === "red"
                        ? "#EB5757"
                        : risk.color === "orange"
                        ? "#F2994A"
                        : "#68AF4E",
                    color: "#808080",
                    borderRadius: 8,
                    boxShadow: "4px 8px 12px rgba(0, 0, 0, 0.4)",
                    marginBottom: 16,
                  }}
                >
                  <div>
                    <strong>Credit Score:</strong> {customer.creditScore}
                  </div>
                  <div>
                    <strong>Debt Ratio:</strong>{" "}
                    {(
                      customer.outstandingLoans / customer.monthlyIncome
                    ).toFixed(2)}
                  </div>
                  <div>
                    <strong>Risk Score:</strong>{" "}
                    <Progress
                      percent={score}
                      status="active"
                      strokeColor={risk.color}
                    />
                  </div>
                  <Tag color={risk.color}>{risk.label} Risk</Tag>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default RiskAssessment;
