import {date, object, string} from "yup";
import {today, lifeterm} from '../../../helper/DataManipulation/dateRestrictions.js'


const validationSchema = object({
    name: string().required("Name is required").matches(/^[a-zA-Z]+$/, "Name can only contain letters"),
    surname: string().required("Surname is required").matches(/^[a-zA-Z]+$/, "Name can only contain letters"),
    dayOfBirth: date()
        .required("Day of birth is required")
        .max(today, "Date cannot be earlier than today")
        .min(lifeterm, "Expired")
        .required("birthday is required"),
    phone: string().required("Phone is required")
});

export default validationSchema
