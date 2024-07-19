import Loading from "./components/Loading";
import { Route, Routes } from "react-router-dom";
import Paths from "./lib/Paths";
import SessionPage from "./pages/SessionPage";
import Layout from "./components/Layout";
import SharedSessionPage from "./pages/SharedSessionPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route element={<SessionPage />} path={Paths.Views.Session()} />
        <Route
          element={<SharedSessionPage />}
          path={Paths.Views.SharedSession()}
        />
        <Route element={<Loading />} path="*"></Route>
      </Routes>
    </Layout>
  );
}

export default App;
