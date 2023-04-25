import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="container py-5 min-vw-50 w-auto border border- my-5 rounded">
      <h1 className="text-center mb-3">Login</h1>

      <form className="px-3">
        <div class="form-group row mb-2">
          {/* <%= f.label :email, 'Username or Email', class: "col-form-label fw-semibold text-muted ps-0" %> <br> */}
          {/* <%= f.text_field :email, rows: 10, class: "form-control", placeholder: "Enter username or email" %> */}
        </div>
        {/* <%# if @user.new_record? %> */}
        <div class="form-group row mb-2">
          {/* <%= f.label :password, class: "col-form-label fw-semibold text-muted ps-0" %> <br> */}
          {/* <%= f.password_field :password, rows: 10, class: "form-control", placeholder: "Enter your password" %> */}
        </div>
        <div class="form-group row">
          {/* <%= f.submit('Login', class: "btn btn-primary mt-4") %> */}
        </div>
        <div class="form-group row mt-3">
          <small class="text-muted ps-0">
            <span>Don't have an account? </span>
            <Link to="/signup">Sign Up</Link>
          </small>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
