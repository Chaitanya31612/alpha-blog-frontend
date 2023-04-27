import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes, useNavigate } from "react-router-dom";
import { loadUser, setAuthToken } from "./apis";
import Header from "./components/Header";
import { useAuth } from "./contexts/AuthContext";
import { Articles, Landing, Login, SignUp } from "./pages";
import PrivateRoutes from "./routes/PrivateRoutes";

const App = () => {
  const navigate = useNavigate();
  const { setCurrentUser, loggedIn, setLoggedIn } = useAuth();
  const [cookies] = useCookies(["authToken"]);
  console.log("loggedIn: ", loggedIn);

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
        {loggedIn ? (
          navigate("/articles", { replace: true })
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
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
