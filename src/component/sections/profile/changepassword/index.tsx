import Button from '@/component/form/button';
import InputField from '@/component/form/inputfield';
import { useAppDispatch } from '@/lib/hooks';
import { useLoginMutation } from '@/services/authservice';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import * as yup from 'yup';
import { useFormik } from 'formik';

export default function ChangepasswordContent() {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [login, { isLoading }] = useLoginMutation();

    const validationSchema = yup.object({
        currentpassword: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        newpassword: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        confirmpassword: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            password: '',
            newpassword: '',
            confirmpassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => { 
           
        },
    });

    return (
        <>
            <section className={styles.container}>
                <InputField
                    placeholder='Current Password'
                    type={'password'}
                    name={'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <InputField
                    placeholder='New Password'
                    type={'password'}
                    name={'newpassword'}
                    value={formik.values.newpassword}
                    onChange={formik.handleChange}
                    error={formik.touched.newpassword && Boolean(formik.errors.newpassword)}
                    helperText={formik.touched.newpassword && formik.errors.newpassword}
                />
                <InputField
                    placeholder='Confirm New Password'
                    type={'password'}
                    name={'confirmpassword'}
                    value={formik.values.confirmpassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
                    helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
                />
                <Button isLoading={isLoading} label={'Change Password'} onClick={formik.handleSubmit}/>
            </section>
        </>
    )
}