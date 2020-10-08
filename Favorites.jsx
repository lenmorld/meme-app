import React from "react";

const Favorites = props => {
    return (
        <div>
            <h2>Favorites</h2>
            <div className="favorites-container">
                {props.items.map(item => {
                    const image_url = item.images.downsized_large.url;
                    return (
                        <div className="favorite" key={item.id} onDoubleClick={() => props.onUnlike(item)}>
                            <img alt={item.title} src={image_url} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Favorites;
