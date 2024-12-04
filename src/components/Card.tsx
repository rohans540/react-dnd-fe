import React, { useState, useMemo } from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BeatLoader } from "react-spinners";

type CardTypes = {
    id: number | string;
    title: string;
    image: string;
    onClick: () => void;
}


const Card: React.FC<CardTypes> = ({ id, title, image, onClick }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [dragging, setDragging] = useState(false);

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = useMemo(() => {
        return {
            transform: CSS.Transform.toString(transform),
            transition,
        };
    }, [transform, transition]);

    const handleMouseDown = () => setDragging(false); // Reset dragging state
    const handleMouseMove = () => setDragging(true); // Mark as dragging if the mouse moves
    const handleMouseUp = () => {
        if (!dragging) {
            onClick(); // Trigger onClick only if it wasn't a drag
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="flex flex-col justify-around items-center border-[1px] border-[#252b7b] w-[300px] h-[300px] rounded-[10px] p-[1.25rem] cursor-pointer"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div className="relative w-full h-[130px]">
                {isLoading && <BeatLoader color="#252b7b" loading={isLoading} />}
                {<img
                    alt={title}
                    src={image}
                    className="w-full h-full object-cover rounded-2xl"
                    draggable={false}
                    onLoad={() => setIsLoading(false)}
                />}
            </div>
            <h5 className="text-[#252b7b] font-code leading-4 font-semibold">{title}</h5>
        </div>
    )
}

export default Card;