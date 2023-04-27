import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes, useNavigate } from "react-router-dom";
import { loadUser, setAuthToken } from "./apis";
import Header from "./components/Header";
import { useAuth } from "./contexts/AuthContext";
import PrivateRoutes from "./routes/PrivateRoutes";

import { Landing, Login, SignUp } from "./pages";
import { UsersPage } from "./pages/Users";
import { ArticleList } from "./pages/Articles";

const App = () => {
  const navigate = useNavigate();
  const { setCurrentUser, loggedIn, setLoggedIn } = useAuth();
  const [cookies] = useCookies(["authToken"]);

  useEffect(() => {
    const { authToken } = cookies;
    if (authToken) {
      setAuthToken(authToken);
      setLoggedIn(true);

      const getUser = async () => {
        try {
          const { user } = await loadUser();
          setCurrentUser(user);
        } catch (error) {
          console.log("error: ", error);
        }
      };
      getUser();
    }
  }, [cookies]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          element={<PrivateRoutes loggedIn={loggedIn || cookies.authToken} />}
        >
          <Route path="/articles" element={<ArticleList />} />

          {/* ================= USERS ===================== */}
          <Route path="/users" element={<UsersPage />} />
          {/* <Route path="/users/:id" element={<User />} /> */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
