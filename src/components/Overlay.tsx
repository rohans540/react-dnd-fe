import React, { useEffect } from 'react';

import { OverlayProps } from '../types/types';

const Overlay: React.FC<OverlayProps> = ({ image, onClose }) => {

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keyup', handleKeyDown);
        return () => {
            window.removeEventListener('keyup', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50"
            onClick={onClose}
        >
            <img
                src={image}
                alt="Selected"
                className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
            />
        </div>
    )
}

export default Overlay;