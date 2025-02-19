import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./features/auth/context/AuthProvider";
import AppRoutes from "./routes/index";

function App() {
  return (
    <AuthProvider> 
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
