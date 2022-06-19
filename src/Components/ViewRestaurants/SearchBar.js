export default function Search(props) {
    // SEARCH TEXT CHANGE
    const handleChange = (event) => {
        props.setSearchTerm(event.target.value);
    };

    // JSX
    return (
        <div className="search-div">
            <form className="search-bar">
                <label htmlFor="search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </label>
                <input
                    onChange={handleChange}
                    type="text"
                    placeholder="Search restaurants, location or cuisine"
                    name="search"
                    id="searchTerm"
                    value={props.searchTerm}
                />
            </form>
        </div>
    );
}
