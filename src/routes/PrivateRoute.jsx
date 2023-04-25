import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  auth: { isAuthenticated, loading },
  element: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
