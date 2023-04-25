import PropTypes from "prop-types";

const ErrorsList = ({ errors }) => {
  return (
    <div
      className="alert alert-danger alert-dismissible fade show my-3"
      role="alert"
    >
      <h4 className="alert-heading">The following errors were encountered:</h4>
      <ul>
        {errors.map((error) => {
          return <li key={error}>{error}</li>;
        })}
      </ul>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

ErrorsList.propTypes = {
  errors: PropTypes.array.isRequired,
};

export default ErrorsList;
