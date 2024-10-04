import { object, string } from "yup";

const validationSchema = object({
    username: string().required("Login"),
    password: string().required("Password")
})

export default validationSchema