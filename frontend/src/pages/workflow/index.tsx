"use client";
import React, { useState, useEffect } from "react";
import { Card, Row, Col, Form, Select, Button, Tag, notification } from "antd";
import { calculateRiskScore } from "../../utils/riskScore";
import { Customer } from "../../types/commonTypes.types";
import {
  getCustomers,
  sendAlert,
  updateCustomerStatus,
} from "../../services/customerService";

const { Option } = Select;

const Workflow: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [notificationApi, contextHolder] = notification.useNotification();

  const getAllCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  const handleStatusChange = async (customerId: string, newStatus: string) => {
    const updated = customers.map((c) =>
      c.customerId === customerId ? { ...c, status: newStatus } : c
    );
    setCustomers(updated);

    await updateCustomerStatus(customerId, newStatus);
    const updatedCustomer = updated.find((c) => c.customerId === customerId);
    const riskScore = calculateRiskScore(updatedCustomer!);

    if (riskScore > 70 && newStatus !== "Rejected") {
      console.log("High risk customer:", customerId);
      const msg = `High risk customer (${customerId}) marked as ${newStatus}`;
      await sendAlert({ customerId, message: msg });
      notificationApi.open({
        type: "warning",
        message: "Alert Sent",
        description: msg,
        placement: "topRight",
        duration: 3,
      });
    }
  };

  return (
    <div style={{ padding: 10 }}>
      <h2 style={{ marginBottom: "4px" }}>
        Workflow Automation & Orchestration
      </h2>
      {contextHolder}
      <Row gutter={[16, 16]}>
        {customers.length > 0 &&
          customers.map((customer) => {
            const riskScore = calculateRiskScore(customer);
            const color =
              riskScore > 70 ? "red" : riskScore > 50 ? "orange" : "green";

            return (
              <Col xs={24} sm={12} key={customer.customerId}>
                <Card
                  title={customer.name}
                  style={{
                    border: "1px solid",
                    borderColor:
                      customer.status === "Rejected"
                        ? "#EB5757"
                        : customer.status === "Review"
                        ? "#F2994A"
                        : "#68AF4E",
                    color: "#808080",
                    borderRadius: 8,
                    boxShadow: "4px 8px 12px rgba(0, 0, 0, 0.4)",
                    marginBottom: 8,
                  }}
                >
                  <p>
                    <strong>Risk Score:</strong>{" "}
                    <Tag color={color}>{riskScore}</Tag>
                  </p>
                  <p>
                    <strong>Status:</strong> <Tag>{customer.status}</Tag>
                  </p>

                  <Form
                    layout="inline"
                    onFinish={({ status }) =>
                      handleStatusChange(customer.customerId, status)
                    }
                    initialValues={{ status: customer.status }}
                  >
                    <Form.Item name="status" rules={[{ required: true }]}>
                      <Select style={{ width: 160 }}>
                        <Option value="Review">Review</Option>
                        <Option value="Approved">Approved</Option>
                        <Option value="Rejected">Rejected</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Update
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default Workflow;
