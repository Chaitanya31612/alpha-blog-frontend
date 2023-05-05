import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes, useNavigate } from "react-router-dom";
import { loadUser, setAuthToken, setCSRFToken } from "./apis";
import Header from "./components/Header";
import { useAuth } from "./contexts/AuthContext";
import PrivateRoutes from "./routes/PrivateRoutes";

import { Landing, Login, SignUp } from "./pages";
import { EditUserPage, UserPage, UsersPage } from "./pages/Users";
import {
  ArticlePage,
  ArticlesPage,
  EditArticlePage,
  NewArticlePage,
} from "./pages/Articles";
import { CategoriesPage, CategoryPage } from "./pages/Categories";

const App = () => {
  const navigate = useNavigate();
  const { setCurrentUser, loggedIn, setLoggedIn } = useAuth();
  const [cookies] = useCookies(["authToken"]);

  useEffect(() => {
    const { authToken } = cookies;
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
