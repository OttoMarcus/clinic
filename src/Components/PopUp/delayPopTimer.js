import {removeTime} from "../../helper/constant.js";

const delayPopTimer = (setIsPopUpActive) => {
    setTimeout(() => setIsPopUpActive(true), 150);
    setTimeout(() => setIsPopUpActive(false), removeTime);
    setTimeout(() => clearTimeout(delayPopTimer),3000);
}

export default delayPopTimer



// Функція таймера, котра із затримкую змінює булевий стейт попапа.
// Ця функція застосовується після підтвердження остаточності дії