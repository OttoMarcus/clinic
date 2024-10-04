import {useDispatch} from "react-redux";

import delayPopTimer from "../Components/PopUp/delayPopTimer.js";

const useDeleteHandler = () => {
    const dispatch = useDispatch();

    return async (id, actionCreator, setPopUpVisible, setErrorPopUpVisible, cardList, setCardList) => {

        try {
            const response = await dispatch(actionCreator(id));
            if (response.meta?.requestStatus === "fulfilled") {
                setCardList(cardList.filter(card => card._id !== id));
                delayPopTimer(setPopUpVisible);

            } else if (response.meta?.requestStatus === "rejected") {
                console.error("Server error:", response.payload);
                setErrorPopUpVisible(true);
            }
        } catch (error) {
            console.error("Error during server request:", error);
            setErrorPopUpVisible(true);
        }
    };
};

export default useDeleteHandler;


// Кастомний хук, що приймає id елемента, екшн зі слайса(для видалення), pop-up та тригер повідомлення для попапа
// В результаті повертає інформацію про видалення елемента з серверу

//потрібно переробляти повідомлення з попапу