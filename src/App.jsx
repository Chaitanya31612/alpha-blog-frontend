import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes } from "react-router-dom";
import { setAuthToken } from "./apis";
import Header from "./components/Header";
import { useAuth } from "./contexts/AuthContext";
import { Articles, Landing, Login, SignUp } from "./pages";
import PrivateRoutes from "./routes/PrivateRoutes";

const App = () => {
  const {
    currentUser,
    setCurrentUser,
    loggedIn,
    setLoggedIn,
    token,
    setToken,
  } = useAuth();
  const [cookies] = useCookies(["authToken"]);
  console.log("loggedIn: ", loggedIn);

  useEffect(() => {
    console.log("Cookies: ", cookies, localStorage.getItem("authToken"));
    if (!loggedIn && !currentUser && !token) {
      const { authToken, user } = cookies;
      if (authToken) {
        setAuthToken(authToken);
        setLoggedIn(true);
        setCurrentUser(user);
        setToken(authToken);
      }
    }
  }, [loggedIn, currentUser, token, cookies]);

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
          <Route path="/articles" element={<Articles />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
