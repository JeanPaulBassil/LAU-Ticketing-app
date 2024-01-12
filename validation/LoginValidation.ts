import * as yup from 'yup';

const loginSchema = yup.object({
  name: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

type LoginSchemaType = yup.InferType<typeof loginSchema>;

export default loginSchema;
