import Button from '@/component/form/button';
import InputField from '@/component/form/inputfield';
import { useAppDispatch } from '@/lib/hooks';
import { setCredentials } from '@/lib/slice/authslice';
import { useLoginMutation } from '@/services/authservice';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import * as yup from 'yup';

export default function SigninContent() {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [login, { isLoading }] = useLoginMutation();

    const validationSchema = yup.object({
        email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => { 
            const payload = {
                email: values.email,
                password: values.password,
            };
            login(payload).then((res: any) => {
                    console.log(res.data.data)
                if (res.data?.status === 200) {
                    const payload = { 
                        user: res.data?.data.user,
                        token: res.data?.data.token
                    }
                    dispatch(setCredentials(payload));
                    localStorage.setItem('token', res.data.data.token);
                    localStorage.setItem('user', JSON.stringify(res.data.data.user));
                    router.push('/dashboard').then(()=>{}).catch(() => {});
                } else if (res.data.status === 401) {
                  
                } else {
                   
                }
                
            }).catch(() => {
                
            });
        },
    });

    return (
        <>
            <section className={styles.container}>
                <h4 className={styles.h4}>Login Account</h4>
                <InputField
                    type="email"
                    name={'email'}
                    label="Email Address"
                    placeholder='Email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <InputField
                    label="password"
                    name={'password'}
                    placeholder='Password'
                    type={'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <br/>
                <Button isLoading={isLoading}  label={'Sign In'} onClick={ formik.handleSubmit} />
                
                <p>Don't have an account? <Link href="/signup">Create Account</Link></p>

            </section>
        </>
    )
}