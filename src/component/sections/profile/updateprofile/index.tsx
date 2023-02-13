import Button from '@/component/form/button';
import InputField from '@/component/form/inputfield';
import { useAppDispatch } from '@/lib/hooks';
import { useLoginMutation } from '@/services/authservice';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import * as yup from 'yup';
import { useFormik } from 'formik';

export default function UpdateprofileContent() {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [login, { isLoading }] = useLoginMutation();

    const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;  

    const validationSchema = yup.object({
        firstname: yup.string().required('Firstname is required'),
        lastname: yup.string().required('Lastname is required'),
        address: yup.string().required('Address is required'),
        company: yup.string().required('Company is required'),
        city: yup.string().required('City is required'),
        state: yup.string().required('State is required'),
        zipcode: yup.string().required('Zipcode is required'),
        email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
        phone: yup
            .string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('Phone Number is required'),
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
            firstname: '',
            lastname: '',
            address: '',
            company: '',
            city: '',
            state: '',
            zipcode: '',
            email: '',
            phone: '',
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
            <InputField
                    placeholder='First Name'
                    type={'text'}
                    name={'firstname'}
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                    helperText={formik.touched.firstname && formik.errors.firstname}
                />
                <InputField
                    placeholder='Last Name'
                    type={'text'}
                    name={'lastname'}
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                    helperText={formik.touched.lastname && formik.errors.lastname}
                />
                <InputField
                    placeholder='Company'
                    type={'text'}
                    name={'company'}
                    value={formik.values.company}
                    onChange={formik.handleChange}
                    error={formik.touched.company && Boolean(formik.errors.company)}
                    helperText={formik.touched.company && formik.errors.company}
                />
                <InputField
                    placeholder='Email'
                    type={'email'}
                    name={'email'}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <InputField
                    placeholder='Phone Number'
                    type={'tel'}
                    name={'phone'}
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                />
                <InputField
                    placeholder='Address'
                    type={'text'}
                    name={'address'}
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                />
                <InputField
                    placeholder='City'
                    type={'text'}
                    name={'city'}
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                />
                <InputField
                    placeholder='State'
                    type={'text'}
                    name={'state'}
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                />
                <InputField
                    placeholder='Zip code'
                    type={'text'}
                    name={'zipcode'}
                    value={formik.values.zipcode}
                    onChange={formik.handleChange}
                    error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                    helperText={formik.touched.zipcode && formik.errors.zipcode}
                />
                <Button
                    isLoading={isLoading}
                    label={'Update Profile'}
                    onClick={formik.handleSubmit} />
            </section>
        </>
    )
}