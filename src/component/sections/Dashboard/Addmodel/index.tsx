import Button from "@/component/form/button";
import Dropdown, { Iitem } from "@/component/form/dropdown";
import InputField from "@/component/form/inputfield";
import styles from './index.module.css';
import Link from "next/link";
import * as yup from 'yup';
import { useFormik } from "formik";
import { useAddModelMutation, useGetProvidersQuery } from "@/services/deviceService";

export default function AddmodelSection() {
    const { data, isLoading: isDataLoading } = useGetProvidersQuery();

    let providers: Iitem[] = [];

    !isDataLoading && data?.data.map((provider: any, index: number) => {
        providers.push({
            id: index,
            title: provider.name,
            value: provider._id
        })
    });

    const [addModel, { isLoading }] = useAddModelMutation();

    const validationSchema = yup.object({
        provider: yup.string().required('Provider is required'),
        name: yup.string().required('Name is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            provider: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            addModel({
                model: values.name,
                provider: values.provider
            }).then((res: any) => {
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
                <h2>Add Model</h2>
                <Dropdown
                    label={"Provider"}
                    disabled={false}
                    items={providers}
                    name={'provider'}
                    value={formik.values.provider}
                    onChange={formik.handleChange}
                    error={formik.touched.provider && Boolean(formik.errors.provider)}
                    helperText={formik.touched.provider && formik.errors.provider}
                />
            
                <InputField
                    type={"text"}
                    label="Model Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
              
                <Button label={"Add Model"} isLoading={isLoading}  onClick={formik.handleSubmit} />
            </section>
        </>
    )
}