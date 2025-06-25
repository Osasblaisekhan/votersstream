import React from 'react';

const LoadingSpinners = () => {
    return (
        <div className="flex space-x-4 items-center justify-center">
            <span className="loading loading-spinner text-white loading-xs"></span>
            <span className="loading loading-spinner text-white loading-sm"></span>
            <span className="loading loading-spinner text-white loading-md"></span>
            <span className="loading loading-spinner text-white loading-lg"></span>
            <span className="loading loading-spinner text-white loading-xl"></span>
        </div>
    );
};

export default LoadingSpinners;