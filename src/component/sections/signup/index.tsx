import Button from '@/component/form/button';
import InputField from '@/component/form/inputfield';
import { useAppDispatch } from '@/lib/hooks';
import { useRegisterMutation } from '@/services/authservice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import * as yup from 'yup';
import { setCredentials } from '@/lib/slice/authslice';
import { useFormik } from 'formik';
import { createModuleResolutionCache } from 'typescript';
import { locations } from '@/constants/location';
import Dropdown, { Iitem } from '@/component/form/dropdown';
import { useState } from 'react';

export default function SignupContent() {

    const [state, setState] = useState<string>("");
    const [cities, setCity] = useState<Iitem[]>([]);

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [register, { isLoading }] = useRegisterMutation();

    let states: Iitem[] = [];
    let city: Iitem[] = [];

    locations.map((location: any, index: number) => {
        states.push({
            id: index.toString(),
            title: location.state,
            value: location.state
        })
    });

    const handleStateChange = (e: any) => {
        setState(e.target.value);

        const selectedState = locations.filter((location: any) => { 
            return location.state === e.target.value;
        })
        
        selectedState[0].lgas.map((lga: any, index: number) => {
            city.push({
                id: index.toString(),
                title: lga,
                value: lga
            })
        });

        setCity(city)
    }

    const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = yup.object({
        firstname: yup.string().required('Firstname is required'),
        lastname: yup.string().required('Lastname is required'),
        address: yup.string().required('Address is required'),
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
            console.log(values)
            const payload = {
                firstname: values.firstname,
                lastname: values.lastname,
                password: values.password,
                address: values.address,
                state: values.state,
                city: values.city,
                zipcode: values.zipcode,
                email: values.email,
                phone: values.phone,
            };

            register(payload).then((res: any) => {
                if (res.data?.status === 200) {
                    const payload = {
                        user: res.data?.data.user,
                        token: res.data?.data.token
                    }
                    dispatch(setCredentials(payload));
                    localStorage.setItem('user', JSON.stringify(res.data.data.user));
                    localStorage.setItem('token', res.data?.data.token);

                    void router.push('/dashboard');
                }
                else if (res.data?.status === 401) {
                    console.log(res.data)
                }
                else if (res.data?.status === 402) {
                    console.log(res.data)
                }
                else {
                    console.log(res.data)
                }   
            }).catch((e: any) => {
                console.log(e);
            });
        },
    });

    return (
        <>
            <section className={styles.container}>
                <h3>Sign Up</h3>
                <InputField
                    placeholder='First Name'
                    label="First Name"
                    type={'text'}
                    name={'firstname'}
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                    helperText={formik.touched.firstname && formik.errors.firstname}
                />
                <InputField
                    placeholder='Last Name'
                    label="Last Name"
                    type={'text'}
                    name={'lastname'}
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                    helperText={formik.touched.lastname && formik.errors.lastname}
                />
                <InputField
                    placeholder='Email'
                    label="Email Address"
                    type={'email'}
                    name={'email'}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <InputField
                    label="Phone Number"
                    placeholder='Phone Number'
                    type={'text'}
                    name={'phone'}
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                />
                <InputField
                    placeholder='Address'
                    label="Address"
                    type={'text'}
                    name={'address'}
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                />
                <Dropdown
                    label={'Select State'}
                    items={states}
                    disabled={false}
                    name={'state'}
                    value={state}
                    onChange={handleStateChange}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                    required={true}
                />
                  <Dropdown
                    label={'Select City'}
                    items={cities}
                    disabled={false}
                    name={'city'}
                    value={state}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                    required={true}
                />
                 <InputField
                    placeholder='Zipcode'
                    label="Zipcode"
                    type={'text'}
                    name={'zipcode'}
                    value={formik.values.zipcode}
                    onChange={formik.handleChange}
                    error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                    helperText={formik.touched.zipcode && formik.errors.zipcode}
                />
                <InputField
                    label="Password"
                    placeholder='Password'
                    type={'password'}
                    name={'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <InputField
                    label="Confirm Password"
                    placeholder='Confirm Password'
                    type={'password'}
                    name={'confirmpassword'}
                    value={formik.values.confirmpassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
                    helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
                />
                <br/>
                <Button type="submit" isLoading={isLoading}  label={'Sign Up'} onClick={formik.handleSubmit} />
                
                <p>Already have an account? <Link href="/signin">Sign In</Link></p>

            </section>
        </>
    )
}