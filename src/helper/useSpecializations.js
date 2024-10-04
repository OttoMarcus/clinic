import { useSelector } from "react-redux";

const useSpecializations = () => {
    return useSelector(state => state.specialization.specialization);
};

export default useSpecializations;
