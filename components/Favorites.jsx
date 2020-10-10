import React from "react";
import { IoMdHeartDislike } from 'react-icons/io';

const Favorites = props => {
    return (
        <div>
            <h2>Favorites</h2>
            <div className="favorites-container">
                {props.items.map(item => {
                    const image_url = item.images.downsized_large.url;
                    return (
                        <div className="favorite" key={item.id}>
                            <button onClick={() => props.onUnlike(item)} className="unlike-button">
                                <span role="img" aria-label="favorite">
                                    <IoMdHeartDislike />
                                </span>
                            </button>
                            <img alt={item.title} src={image_url} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Favorites;
