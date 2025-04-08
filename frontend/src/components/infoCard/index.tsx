import React from "react";
import { Card, Typography } from "antd";
import { InfoCardProps } from "../../types/commonTypes.types";

const { Title, Text } = Typography;

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  value,
  icon,
  footer,
  loading = false,
  extra,
}) => {
  return (
    <Card
      loading={loading}
      extra={extra}
      style={{
        borderRadius: 12,
        boxShadow: "10px 14px 20px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {icon && <div style={{ fontSize: 32 }}>{icon}</div>}
        <div>
          <Text type="secondary" style={{ fontSize: "14px", fontWeight: 600 }}>
            {title}
          </Text>
          <Title level={3} style={{ margin: 0 }}>
            {value}
          </Title>
        </div>
      </div>
      {footer && <div style={{ marginTop: 16 }}>{footer}</div>}
    </Card>
  );
};

export default InfoCard;
