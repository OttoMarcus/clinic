

const onSubmitRef = (formikRef) => {
    if(formikRef.current) {
        formikRef.current.submitForm();
    }
}

export default onSubmitRef


// допоміжна функція, котра передає у форми відповідний reference щоб контролювати відправку форми