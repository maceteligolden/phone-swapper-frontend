import Button from '@/component/form/button';
import InputField from '@/component/form/inputfield';
import { useAppDispatch } from '@/lib/hooks';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import { useFormik } from 'formik';
import { useChangePasswordMutation } from '@/services/authservice';

export default function ChangepasswordContent() {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [changePassword, { isLoading}] = useChangePasswordMutation()

    const validationSchema = yup.object({
        password: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        confirmpassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
    });

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmpassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
           
        },
    });

    return (
        <>
            <section className={styles.container}>
                <h3>Change Password</h3>
                <InputField
                    placeholder='New Password'
                    type={'password'}
                    name={'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <InputField
                    placeholder='Confirm New Passowrd'
                    type={'password'}
                    name={'confirmpassword'}
                    value={formik.values.confirmpassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
                    helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
                />
                <Button
                    label={'Changepassword'}
                    onClick={formik.handleSubmit}
                    isLoading={isLoading}
                />
            </section>
        </>
    )
}