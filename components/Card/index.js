import React from 'react';

const Card = ({ children }) => {
    return (
        <div className="max-w-full h-full rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                {children}
            </div>
        </div>
    )
}

export default Card;