import { useEffect } from "react";
import data from '../mocks/data.json';

const useLocalStorage = () => {

    useEffect(() => {
        const storedData = localStorage.getItem('mockData');
        if (!storedData) {
            localStorage.setItem('mockData', JSON.stringify(data));
        }
    }, [])
};

export default useLocalStorage;