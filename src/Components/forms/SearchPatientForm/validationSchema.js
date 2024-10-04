import { object, string } from "yup";

const validationSchema = object({
    phone: string().required("Required"),

})

export default validationSchema