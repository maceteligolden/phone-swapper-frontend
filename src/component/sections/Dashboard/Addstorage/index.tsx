import Button from "@/component/form/button";
import Dropdown, { Iitem } from "@/component/form/dropdown";
import InputField from "@/component/form/inputfield";
import styles from './index.module.css';
import { useRouter } from "next/router";
import Link from "next/link";
import { useAddStorageMutation, useGetModelsQuery, useGetProvidersQuery } from "@/services/deviceService";
import { useState } from "react";

export default function AddstorageSection() {

    const [provider, setProvider] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [size, setSize] = useState<string>("");

    const { data, isLoading: isDataLoading } = useGetModelsQuery({id: provider});

    let models: Iitem[] = [];

    !isDataLoading && data?.data.map((model: any, index: number) => {
        models.push({
            id: index,
            title: model.model,
            value: model._id
        })
    });

    const { data:priovider, isLoading: isProviderLoading } = useGetProvidersQuery();

    let providers: Iitem[] = [];

    !isProviderLoading && priovider?.data.map((provider: any, index: number) => {
        providers.push({
            id: index,
            title: provider.name,
            value: provider._id
        })
    });

    const [addStorage, { isLoading }] = useAddStorageMutation();

    const handleAddStorage = () => {
        addStorage({
            model,
            size
        }).then((res: any) => {
            //TODO: show success toast
            console.log(res)
        }).catch((err: any) => {
            //TODO: show error toast
        });
    }

    return (
        <>
            <section className={styles.container}>
                <Link href="/dashboard">Back</Link>
                
                <h2>Add Storage</h2>
                <Dropdown label={"Provider"} value={provider} disabled={false} items={providers} onChange={function (e: any): void {
                    setProvider(e.target.value)
                }} required={true} />
                <Dropdown label={"Model"} disabled={false} value={model} items={models} onChange={function (e: any): void {
                    setModel(e.target.value)
                }} required={true} />
                <InputField type={"text"} value={size} required={true} label="Size" onChange={(e: any) => {
                    setSize(e.target.value)
                }}/>
               
                <Button isLoading={isLoading} label={"Add Storage"} onClick={handleAddStorage} />
            </section>
        </>
    )
}