import * as yup from 'yup';

const setPasswordSchema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .max(16, 'Password must be no longer than 16 characters')
    .matches(/(?=.*[a-zA-Z])(?=.*[0-9])/, 'Password must contain at least one letter and one number')
    .matches(/(?=.*[!@#$%^&*])/,'Password must contain at least one special character (!@#$%^&*)'),


  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});


export default setPasswordSchema;
