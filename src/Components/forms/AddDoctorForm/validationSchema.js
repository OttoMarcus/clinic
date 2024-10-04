import { object, string } from "yup";

const validationSchema = object({
    name: string().required("Name is required").matches(/^[a-zA-Z]+$/, "Name can only contain letters"),
    surname: string().required("Surname is required").matches(/^[a-zA-Z]+$/, "Name can only contain letters"),
    email: string().required("Email is required").email("Email is invalid"),
    specialization: string().required("Specialization is required"),
});

export default validationSchema;
