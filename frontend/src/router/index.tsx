import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppHeader from "../components/appHeader";
import Dashboard from "../pages/dashboard";
import RiskAssessment from "../pages/riskAssessment";
import Workflow from "../pages/workflow";
import NotFound from "../pages/notFound";

const App = () => {
  return (
    <Router>
      <AppHeader>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/riskAssessment" element={<RiskAssessment />} />
          <Route path="/workflow" element={<Workflow />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppHeader>
    </Router>
  );
};

export default App;
