import Button from '@/component/form/button';
import InputField from '@/component/form/inputfield';
import { useAppDispatch } from '@/lib/hooks';
import { useForgotPasswordMutation } from '@/services/authservice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import * as yup from 'yup';
import { useFormik } from 'formik';

export default function ForgotpasswordContent() {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [forgotpassword, { isLoading }] = useForgotPasswordMutation();

    const validationSchema = yup.object({
        email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => { 
           
        },
    });

    return (
        <>
            <section className={styles.container}>
                <h3>Recover Password</h3>
                <InputField
                    placeholder='Email'
                    type={'email'}
                    name={'email'}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <Button
                    isLoading={isLoading}
                    label={'Submit'}
                    onClick={formik.handleSubmit} />
                
                <Link href={'signup'}>Create Account</Link>

                <Link href={'/'}>Sign In</Link>
            </section>
        </>
    )
}