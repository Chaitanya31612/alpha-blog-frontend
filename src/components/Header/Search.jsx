const Search = () => {
  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <form className="d-flex ms-md-1">
        <input
          className="form-control me-2"
          type="search"
          placeholder="&#128269; Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-light" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
