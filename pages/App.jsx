import React, { useState, useEffect } from "react";
import axios from "axios";

import Meme from "../components/Meme";
import Favorites from "../components/Favorites";

const GIPHY_URL = process.env.REACT_APP_GIPHY_URL;
const GIPHY_API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
const SEARCH_QUERY = "cats";
const RESULTS_LIMIT = 5;

if (!GIPHY_API_KEY) {
    throw "Create .env file and put GIPHY_API_KEY!!!";
}

const App = () => {
    const [memes, setMemes] = useState([]);
    // const [backgroundColor, setBackgroundColor] = useState("white");
    // const [color, setColor] = useState("black");
    const [isDarkTheme, setDarkTheme] = useState(false);
    const [query, setQuery] = useState(SEARCH_QUERY);
    const [resultsLimit, setResultsLimit] = useState(RESULTS_LIMIT);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        getFavoritesFromLocalStorage();
        axios
            .get(
                `${GIPHY_URL}?q=${SEARCH_QUERY}&api_key=${GIPHY_API_KEY}&limit=${RESULTS_LIMIT}`
            )
            .then((res) => {
                console.log(res);
                const results = res.data.data;
                setMemes(results);
            });
    }, []);

    useEffect(() => {
        saveInLocalStorage(favorites)
    }, [favorites]);

    function handleThemeClick() {
        // setBackgroundColor("black");
        // setColor("white");
        setDarkTheme((prevDarkTheme) => !prevDarkTheme);
    }

    function handleQueryChange(event) {
        setQuery(event.target.value);
    }

    function handleResultLimitChange(event) {
        setResultsLimit(event.target.value);
    }

    function handleSearchClick(event) {
        axios
            .get(
                `${GIPHY_URL}?q=${query}&api_key=${GIPHY_API_KEY}&limit=${resultsLimit}`
            )
            .then((res) => {
                const result = res.data.data;
                setMemes(result);
            });

        // prevent page from reloading
        event.preventDefault();
    }

    //****** FAVORITES *****/

    function addToFavorites(meme) {
        setFavorites((prevFaves) => prevFaves.concat(meme));
    }

    function isMemeInFavorites(meme) {
        // locates first matching or returns undefined if not found
        return favorites.find((_current) => _current.id === meme.id);
    }

    function removeFromFavorites(meme) {
        // filter favorites to remove this one
        const filtered = favorites.filter((_current) => _current.id !== meme.id);

        setFavorites(filtered);
    }

    function saveInLocalStorage(favoritesArray) {
        localStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }

    function getFavoritesFromLocalStorage() {
        const favorites = localStorage.getItem('favorites');
        if (favorites && favorites.length) {
            setFavorites(JSON.parse(favorites));
        }
    }

    // **********************/

    if (memes.length === 0) {
        return "Loading...";
    }

    return (
        <div
            className="container"
            style={{
                // backgroundColor: backgroundColor,
                // color: color
                backgroundColor: isDarkTheme ? "black" : "white",
                color: isDarkTheme ? "white" : "black"
            }}
        >
            <button onClick={handleThemeClick}>
                {isDarkTheme ? (
                    <span role="img" aria-label="dark theme">
                        🌞
                    </span>
                ) : (
                        <span role="img" aria-label="light theme">
                            🌙
                        </span>
                    )}
            </button>
            <h1>MEMES</h1>
            <Favorites items={favorites} onUnlike={removeFromFavorites} />
            <h2>Search</h2>
            <form>
                <label>
                    <input
                        type="text"
                        value={query}
                        onChange={handleQueryChange}
                        placeholder="search"
                    />
                </label>
                <input
                    type="number"
                    value={resultsLimit}
                    placeholder="results limit"
                    onChange={handleResultLimitChange}
                />
                <button onClick={handleSearchClick}>SEARCH</button>
            </form>
            <br />
            <br />

            <div className="memes-container">
                {memes.map((meme) => (
                    <Meme
                        key={meme.id}
                        item={meme}
                        onLike={addToFavorites}
                        isFavorite={isMemeInFavorites(meme)}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;