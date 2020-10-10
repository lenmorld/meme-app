import React from "react";
import { IoMdHeart } from 'react-icons/io';

const Meme = (props) => {
    const { item } = props;
    // const memeUrl = `https://giphy.com/embed/${item.id}`;
    const memeUrl = `https://media.giphy.com/media/${item.id}/giphy.gif`;

    return (
        <div className="meme">
            {!props.isFavorite && (
                <button onClick={() => props.onLike(item)} className="meme-button">
                    <span role="img" aria-label="meme">
                        <IoMdHeart />
                    </span>
                </button>
            )}
            <div className="img-container">
                <img src={memeUrl} alt={item.title} />
            </div>

        </div>
    );
};

export default Meme;
