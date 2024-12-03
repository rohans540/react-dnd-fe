import { useState, useEffect } from "react";

import { DataType } from "../types/types";
import { ITEMS_API } from "../constants/constant";


const useFetchData = () => {
    const [items, setItems] = useState<DataType[]>([]);

    const fetchData = async () => {
        const data = await fetch(ITEMS_API);
        const resp = await data.json();
        setItems(resp);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return {
        items,
        setItems
    }
}

export default useFetchData;