import React from "react";

import { LastUpdateProps } from "../types/types";

const LastUpdate: React.FC<LastUpdateProps> = ({ time }) => {

    return (
        <span className='w-full font-code text-[#252b7b] ml-[40%]'>Last saved: {time}</span>
    )
}

export default LastUpdate;