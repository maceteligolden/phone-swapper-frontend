import Button from '@/component/form/button';
import Dropdown, { Iitem } from '@/component/form/dropdown';
import InputField from '@/component/form/inputfield';
import styles from './index.module.css';
import Link from 'next/link';
import SToast from '@/component/displays/toast/toast';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useAddDeviceMutation, useGetModelsQuery, useGetProvidersQuery, useGetStoragesQuery } from '@/services/deviceService';
import { useState } from 'react';

export default function AdddeviceSection() {
    const [provider, setProvider] = useState<string>("");
    const [model, setModel] = useState<string>("");

    const [addDevice, { isLoading }] = useAddDeviceMutation();

    const { data: modelData, isLoading: isModelLoading } = useGetModelsQuery({id: provider});

    let models: Iitem[] = [];

    !isModelLoading && modelData?.data.map((model: any, index: number) => {
        models.push({
            id: index,
            title: model.model,
            value: model._id
        })
    });

    const { data: storageData, isLoading: isStorageLoading } = useGetStoragesQuery({id: model});
    console.log(storageData)
    let storages: Iitem[] = [];

    !isStorageLoading && storageData?.data.map((model: any, index: number) => {
      
        storages.push({
            id: index,
            title: model.size,
            value: model._id
        })
    });

    const { data, isLoading: isDataLoading } = useGetProvidersQuery();
    console.log(data)
    let providers: Iitem[] = [];

    !isDataLoading && data?.data.map((provider: any, index: number) => {
        providers.push({
            id: index,
            title: provider.name,
            value: provider._id
        })
    });

    const validationSchema = yup.object({
        model: yup.string().required('Model is required'),
        provider: yup.string().required('Provider is required'),
        storage: yup.string().required('Storage is required'),
        price: yup.number().required('Price is required'),
        swap_cost: yup.number().required('Swap cost is required'),
    });

    const formik = useFormik({
        initialValues: {
            model: '',
            provider: '',
            storage: '',
            price: 0,
            swap_cost: 0
        },
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            console.log(values)
            addDevice({
                model: values.model,
                provider: values.provider,
                storage_size: values.storage,
                price: values.price,
                swap_cost: values.swap_cost
            }).then((res: any) => {
                //TODO: show success toast
                console.log(res)
            }).catch((err: any) => {
                //TODO: show error toast
            })
        },
    });


    return (
        <>
            <section className={styles.container}>
                <Link href="/dashboard">Back</Link>
                <h2>Add Device</h2>
                <Dropdown label={"Provider"} disabled={false} items={providers}
                      name={'provider'}
                      value={provider}
                      onChange={(e: any) => { setProvider(e.target.value);  formik.handleChange(e)}}
                      error={formik.touched.provider && Boolean(formik.errors.provider)}
                      helperText={formik.touched.provider && formik.errors.provider}
                />
                <Dropdown
                    label={"Model"}
                    disabled={false}
                    items={models}
                    value={model}
                    name={'model'}
                    onChange={(e: any) => { setModel(e.target.value);  formik.handleChange(e)}}
                    error={formik.touched.model && Boolean(formik.errors.model)}
                    helperText={formik.touched.model && formik.errors.model}
                />
               
                <Dropdown label={"Storage"} disabled={false} items={storages}
                    name={'storage'}
                      value={formik.values.storage}
                      onChange={formik.handleChange}
                      error={formik.touched.storage && Boolean(formik.errors.storage)}
                      helperText={formik.touched.storage && formik.errors.storage}
                />
                <InputField
                    type={"number"}
                    label="Price"
                    name={'price'}
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                />
                <InputField type={"number"} label="Swap cost"
                     name={'swap_cost'}
                     value={formik.values.swap_cost}
                     onChange={formik.handleChange}
                     error={formik.touched.swap_cost && Boolean(formik.errors.swap_cost)}
                     helperText={formik.touched.swap_cost && formik.errors.swap_cost}
                />
                <Button label={"Add Device"} isLoading={isLoading} onClick={formik.handleSubmit} />
            </section>

            {/* <SToast text={''} severity={'success'} open={false} onClose={function (): void {
                throw new Error('Function not implemented.');
            } } />
            <SToast text={''} severity={'error'} open={false} onClose={function (): void {
                throw new Error('Function not implemented.');
            } } /> */}
        </>
    )
}