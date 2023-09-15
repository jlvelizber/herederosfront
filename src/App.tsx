import { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import {
  ListKidPage,
  LoginPage,
  RegisterAsistencePage,
  ReporterPage,
} from "./pages";
import { AuthContext } from "./contexts";
import { AuthStateContextInterface } from "./interfaces";
import { useAuth } from "./hooks";

function App() {
  const { status } = useContext(AuthContext) as AuthStateContextInterface;
  const { checkAuthToken } = useAuth();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return "Cargando...";
  }

  return (
    <Routes>
      {status === "no-authenticated" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<RegisterAsistencePage />} />
          <Route path="/listado" element={<ListKidPage />} />
          <Route path="/reportes" element={<ReporterPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
