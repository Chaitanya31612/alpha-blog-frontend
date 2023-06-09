import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes, useNavigate } from "react-router-dom";
import { loadUser, setAuthToken, setCSRFToken } from "./apis";
import Header from "./components/Header";
import { useAuth } from "./contexts/AuthContext";
import PrivateRoutes from "./routes/PrivateRoutes";

import { Landing, Login, Search, SignUp } from "./pages";
import { EditUserPage, UserPage, UsersPage } from "./pages/Users";
import {
  ArticlePage,
  ArticlesPage,
  EditArticlePage,
  NewArticlePage,
} from "./pages/Articles";
import { CategoriesPage, CategoryPage } from "./pages/Categories";
import Swal from "sweetalert2";

const App = () => {
  const navigate = useNavigate();
  const { setCurrentUser, loggedIn, setLoggedIn } = useAuth();
  // const [cookies] = useCookies(["authToken"]);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    // const { authToken } = cookies;
    console.log("authToken: ", authToken);
    if (authToken) {
      setAuthToken(authToken);
      // TODO set csrf token

      const getUser = async () => {
        try {
          const { user, csrf_token } = await loadUser();
          setCurrentUser(user);
          setLoggedIn(true);
          setCSRFToken(csrf_token);
        } catch (error) {
          console.log("error: ", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          localStorage.removeItem("authToken");
          setLoggedIn(false);
          navigate("/login");
        }
      };
      getUser();
    }
  }, [authToken]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <PrivateRoutes
              loggedIn={loggedIn || localStorage.getItem("authToken")}
            />
          }
        >
          {/* ================= USERS ===================== */}
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/users/:id/edit" element={<EditUserPage />} />

          {/* ================== ARTICLES ================== */}
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/articles/:id/edit" element={<EditArticlePage />} />
          <Route path="/articles/new" element={<NewArticlePage />} />

          {/* ================== CATEGORIES ================ */}
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:id" element={<CategoryPage />} />

          {/* ================== OTHERS ==================== */}
          <Route path="/search" element={<Search />} />

          {/* ================== Not Found ================== */}
          <Route
            path="*"
            element={<h1 className="text-center">404 Not Found</h1>}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
