import { BeatLoader } from "react-spinners";

type SpinnerProps = {
    loading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ loading }) => {
    if (!loading) return;
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50"
        >
            <BeatLoader color="#252b7b" loading={loading} />
        </div>
    )
}

export default Spinner;