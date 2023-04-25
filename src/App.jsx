import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Articles, Landing, Login, SignUp } from "./pages";
import PrivateRoutes from "./routes/PrivateRoutes";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="dashboard" element={<div>Dashboard</div>} />
          <Route path="articles" element={<Articles />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
