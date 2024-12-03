export type DataType = {
    type: string;
    title: string;
    position: number;
    image: string;
}

export type UseFetchDataProps = {
    items: Array<DataType>;
    setItems: (value: Array<DataType>) => void;
}

export type OverlayProps = {
    image: string;
    onClose: () => void;
}

export type LastUpdateProps = {
    time: string;
}