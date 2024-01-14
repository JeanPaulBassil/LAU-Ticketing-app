import { useState } from "react";

const useForm = (initialValues: any) => {
    const [values, setValues] = useState(initialValues);

    const handleChange: (name: string, value: string) => void = (name, value) => {
        setValues((prevValues: any) => ({ ...prevValues, [name]: value }));
    };

    const resetForm: () => void = () => {
        setValues(initialValues);
    }

    return { values, handleChange, resetForm };
}

export default useForm;