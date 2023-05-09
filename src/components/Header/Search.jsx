import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [swalProps, setSwalProps] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("search: ", search);
    setSearch("");
    navigate(`/search/?q=${search}`);
  };

  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <form className="d-flex ms-md-1" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="&#128269; Search"
          aria-label="Search"
          required
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-outline-light" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
