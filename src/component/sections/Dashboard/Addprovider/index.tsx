import Button from "@/component/form/button";
import InputField from "@/component/form/inputfield";
import styles from './index.module.css';
import Link from "next/link";
import * as yup from 'yup';
import { useFormik } from "formik";
import { useAddProviderMutation } from "@/services/deviceService";
import SToast from "@/component/displays/toast/toast";

export default function AddproviderSection() {

    const [addProvider, { isLoading }] = useAddProviderMutation();

    const validationSchema = yup.object({
        name: yup.string().required('Name is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            addProvider(values).then((res: any) => {
                //TODO: show success 
                console.log(res)
            }).catch((err: any) => {
                //TODO: show err toast
            })
        },
    });

    return (
        <>
            <section className={styles.container}>
                <Link href="/dashboard">Back</Link>
                <h2>Add Provider</h2>
                <InputField
                    type={"text"}
                    label="Provider Name"
                    name={'name'}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
              
                <Button isLoading={isLoading} label={"Add Provider"} onClick={formik.handleSubmit} />
            </section>

            <SToast text={""} severity={"success"} open={false} onClose={function (): void {
                throw new Error("Function not implemented.");
            }} />

            <SToast text={""} severity={"error"} open={false} onClose={function (): void {
                throw new Error("Function not implemented.");
            }} />
            
        </>
    )
}