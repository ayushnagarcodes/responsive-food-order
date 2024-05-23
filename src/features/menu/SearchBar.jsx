import { searchBar } from "./SearchBar.module.css";

function SearchBar({ query, setQuery }) {
    function handleInput(e) {
        setQuery(e.target.value);
    }

    return (
        <div className={searchBar}>
            <img src="/assets/icons/search-outline.svg" />
            <input
                value={query}
                onChange={handleInput}
                placeholder="Search dish here..."
            ></input>
        </div>
    );
}

export default SearchBar;
