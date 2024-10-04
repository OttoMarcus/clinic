import { object, string, date, number } from "yup";

const validationSchema = object({
    phone: string().required("Phone is required"),
    name: string().required("Name is required"),
    surname: string().required("Surname is required"),
    specialization: string().required("Specialization is required"),
    // urgency: string().required("Required"),
    date: date()
        .typeError("Date only")
        .min(new Date(), "Can't be in the past") // перевіряємо, чи майбутній візит не в минулому
        .required("Required"),
    time: string().required("Time is required"),
    dedicatedDoctor: string().required("Required"),
    visitReason: string().max(30, "Max length 30"),
    "Blood pressure, mmHg": string()
        .matches(/^\d{3}\/\d{2,3}$/, "Invalid format"),
    "Heart rate, bpm": number()
        .typeError("Numeric field")
        .positive("can't be negative")
        .integer("must be integer")
        .min(40, "Too low")
        .max(180, "Too high"),
    "Weight, kg": number()
        .typeError("Numeric field")
        .positive("can't be negative")
        .integer("must be integer")
        .min(10, "Too low")
        .max(300, "Too high"),
    "Height, cm": number()
        .typeError("Numeric field")
        .positive("can't be negative")
        .integer("must be integer")
        .min(100, "Too low")
        .max(250, "Too high"),
    "Alcohol/drug": string()
        .matches(/^(yes|no)$/, "Invalid format"),
    "Allergies": string()
        .matches(/^(yes|no)$/, "Invalid format"),
    // "Last visit": string()
    //     .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format yyyy-mm-dd"),
        // .test(
        //     "is-valid-date",
        //     "Invalid date",
        //     value => {
        //         if (!value) return false;
        //         const [year, month, day] = value.split('-').map(Number);
        //         const date = new Date(year, month - 1, day);
        //         return date.getFullYear() === year &&
        //             date.getMonth() === month - 1 &&
        //             date.getDate() === day;
        //     }
        // ),
    "Dialysis": string()
        .matches(/^(yes|no)$/, "Invalid format"),
    "Loss in weight": string()
        .matches(/^(yes|no)$/, "Invalid format"),
    "Age": number()
        .typeError("Numeric field")
        .positive("can't be negative")
        .integer("must be integer")
        .min(10, "Too low")
        .max(100, "Too high"),
    "Last treatment": date()
        .min('2000-01-01', "Not early than 2000")
        .max(new Date(), "Can't be in the future")
});

export default validationSchema;
