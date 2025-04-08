import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Tag, TableProps } from "antd";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { calculateRiskScore } from "../../utils/riskScore";
import { Customer, DataType } from "../../types/commonTypes.types";
import InfoCard from "../../components/infoCard";
import { getCustomers } from "../../services/customerService";
import type { Key } from "antd/es/table/interface";

const COLORS = ["#1890ff", "#ff4d4f", "#faad14"];

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const Dashboard: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  useEffect(() => {
    getAllCustomers();
  }, []);

  const getAllCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response);
    } catch (err) {
      throw new Error("Error fetching customers data" + err);
    }
  };

  const lineChartData = customers.map((customer, i) => ({
    id: i,
    name: customer.name,
    income: customer.monthlyIncome,
    expenses: customer.monthlyExpenses,
  }));

  const riskDistribution = [
    {
      name: "Low (0-50)",
      value: customers.filter((c) => calculateRiskScore(c) <= 50).length,
    },
    {
      name: "Medium (51-70)",
      value: customers.filter(
        (c) => calculateRiskScore(c) > 50 && calculateRiskScore(c) <= 70
      ).length,
    },
    {
      name: "High (71+)",
      value: customers.filter((c) => calculateRiskScore(c) > 70).length,
    },
  ];

  const columns = [
    {
      title: "Customer",
      dataIndex: "name",
      key: "name",
      filters: customers.map((customer) => ({
        text: customer.name,
        value: customer.name,
      })),
      filteredValue: (filteredInfo.name as Key[]) || null,
      onFilter: (value: boolean | Key, record: Customer) => {
        console.debug("value", value, record);
        return record.name.includes(value as string);
      },
      sorter: (a: Customer, b: Customer) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Income",
      dataIndex: "monthlyIncome",
      key: "income",
      render: (val: number) => `$${val}`,
      sorter: (a: Customer, b: Customer) => a.monthlyIncome - b.monthlyIncome,
      sortOrder: sortedInfo.columnKey === "income" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Expenses",
      dataIndex: "monthlyExpenses",
      key: "expenses",
      render: (val: string) => `$${val}`,
      sorter: (a: Customer, b: Customer) =>
        a.monthlyExpenses - b.monthlyExpenses,
      sortOrder: sortedInfo.columnKey === "expenses" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Credit Score",
      dataIndex: "creditScore",
      key: "creditScore",
      sorter: (a: Customer, b: Customer) => a.creditScore - b.creditScore,
      sortOrder:
        sortedInfo.columnKey === "creditScore" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Risk Score",
      key: "riskScore",
      render: (_: string, record: Customer) => {
        const score = calculateRiskScore(record);
        const color = score > 70 ? "red" : score > 50 ? "orange" : "green";
        return <Tag color={color}>{score}</Tag>;
      },
      sorter: (a: DataType, b: DataType) =>
        calculateRiskScore(a) - calculateRiskScore(b),
      sortOrder: sortedInfo.columnKey === "riskScore" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "Approved"
              ? "green"
              : status === "Rejected"
              ? "red"
              : "blue"
          }
        >
          {status}
        </Tag>
      ),
      filters: [
        { text: "Approved", value: "Approved" },
        { text: "Pending", value: "Pending" },
        { text: "Rejected", value: "Rejected" },
      ],
      filteredValue: (filteredInfo.status as Key[]) || null,
      onFilter: (value: boolean | Key, record: Customer) => {
        return record.status.includes(value as string);
      },
      ellipsis: true,
    },
  ];

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  return (
    <div>
      <h3 style={{ marginBottom: "4px" }}>Dashboard</h3>
      <>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={8}>
            <InfoCard
              title="Total Customers"
              value={customers.length}
              loading={false}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <InfoCard
              title="Average Income"
              value={`$${Math.round(
                customers.reduce((acc, c) => acc + c.monthlyIncome, 0) /
                  customers.length
              )}`}
              loading={false}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <InfoCard
              title="Average Risk Score"
              value={Math.round(
                customers.reduce((acc, c) => acc + calculateRiskScore(c), 0) /
                  customers.length
              )}
              loading={false}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} sm={24} md={12}>
            <Card
              title="Income vs Expenses"
              style={{
                borderRadius: 12,
                boxShadow: "6px 8px 10px rgba(0, 0, 0, 0.4)",
                border: "1px solid #838383",
                fontSize: 14,
                fontWeight: 600,
                backgroundColor: "#f0f2f5",
              }}
            >
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={lineChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="income" stroke="#52c41a" />
                  <Line type="monotone" dataKey="expenses" stroke="#ff4d4f" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Card
              title="Risk Score Distribution"
              style={{
                borderRadius: 12,
                boxShadow: "6px 8px 10px rgba(0, 0, 0, 0.4)",
                border: "1px solid #838383",
                backgroundColor: "#f0f2f5",
              }}
            >
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={riskDistribution}
                    outerRadius={80}
                    label
                    cx={"50%"}
                    cy={"50%"}
                  >
                    {riskDistribution.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        <Row style={{ marginTop: 24 }}>
          <Col span={24}>
            <Card
              title="Customer Data"
              style={{
                borderRadius: 12,
                boxShadow: "6px 8px 10px rgba(0, 0, 0, 0.4)",
                backgroundColor: "#f0f2f5",
              }}
            >
              <div style={{ width: "100%", overflowX: "auto" }}>
                <Table
                  dataSource={customers}
                  columns={columns}
                  rowKey="customerId"
                  onChange={handleChange}
                  scroll={{ x: "max-content" }}
                  pagination={{ pageSize: 5 }}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </>
    </div>
  );
};

export default Dashboard;
