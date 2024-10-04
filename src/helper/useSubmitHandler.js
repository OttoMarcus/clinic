import {useDispatch} from "react-redux";


const useSubmitHandler = () => {
    const dispatch = useDispatch();

    return async (values, actionCreator, handleModalClose, setIsErrorByAdding) => {

        try {
            const resultAction = await dispatch(actionCreator(values));
            if (actionCreator.fulfilled.match(resultAction)) {
                setIsErrorByAdding(false);
            } else {
                setIsErrorByAdding(true);
            }
        } catch (error) {
            console.error('Unexpected error by submitting:', error);
            setIsErrorByAdding(true);
        } finally {
            handleModalClose() ;
        }
    };
};

export default useSubmitHandler;

//Кастомний хук, що отримує значення із форми, додає до них id, та записує значення в редакс-стейт.
//Звідки данні делегуються далі до сервера. У випадку помилок повідомляємо користувачу про помилку.
//Використовую при додавані лікаря, пацієнта, та візита.