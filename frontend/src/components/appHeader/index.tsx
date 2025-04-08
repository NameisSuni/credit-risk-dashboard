import { Layout, Menu, theme, Button, Drawer } from "antd";
import { useState } from "react";
import {
  MenuOutlined,
  DashboardOutlined,
  SafetyOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import { AppLayoutProps } from "../../types/commonTypes.types";
import Search from "antd/es/input/Search";

const { Header, Sider, Content } = Layout;

const AppHeader: React.FC<AppLayoutProps> = ({ children }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const location = useLocation();
  const screens = useBreakpoint();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const isMobile = !screens.lg;

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: "/riskAssessment",
      icon: <SafetyOutlined />,
      label: <Link to="/riskAssessment">Risk Assessment</Link>,
    },
    {
      key: "/workflow",
      icon: <FileTextOutlined />,
      label: <Link to="/workflow">Workflow</Link>,
    },
  ];

  const SidebarMenu = (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      items={menuItems}
      onClick={() => {
        if (isMobile) setDrawerVisible(false);
      }}
    />
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isMobile && (
        <Sider
          width={200}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            background: "#001529",
          }}
        >
          <div
            style={{
              height: 32,
              margin: 16,
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            CRFI
          </div>
          {SidebarMenu}
        </Sider>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          title="CRFI"
          placement="left"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          style={{ padding: 0, background: "#001529", color: "#fff" }}
          closeIcon={<span style={{ color: "#fff", fontSize: 20 }}>✕</span>}
        >
          {SidebarMenu}
        </Drawer>
      )}

      <Layout
        style={{
          marginLeft: !isMobile ? 200 : 0,
          transition: "margin-left 0.2s ease",
          background: "#f0f2f5",
          minWidth: "85vw",
        }}
      >
        <Header
          style={{
            background: !isMobile ? "#fff" : "#1677ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            position: "sticky",
            top: 0,
            zIndex: 1000,
            padding: "0 14px",
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 600 }}>
            {isMobile ? "CRFI" : "Customer Risk Financial Insights"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Search
              placeholder="Search"
              loading={false}
              enterButton
              style={{ width: isMobile ? 150 : 250 }}
            />
            {isMobile && (
              <Button
                icon={<MenuOutlined />}
                onClick={() => setDrawerVisible(true)}
                type="text"
                style={{ fontSize: 20 }}
              />
            )}
          </div>
        </Header>

        <Content
          style={{
            padding: 16,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppHeader;
