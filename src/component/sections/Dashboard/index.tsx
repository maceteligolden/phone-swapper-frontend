import Button from '@/component/form/button';
import Dropdown, { Iitem } from '@/component/form/dropdown';
import InputField from '@/component/form/inputfield';
import { useGetModelsQuery, useGetProvidersQuery, useGetStoragesQuery, useSearchMutation } from '@/services/deviceService';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import VendorsContent from '../vendors';
import styles from './index.module.css';

export default function DashboardSection() {

    const [submit, setSubmit] = useState<boolean>(true);
    const [vendors, setVendors] = useState<any[]>([])
    const [model, setModel] = useState<boolean>(true);
    const [providerValue, setProviderValue] = useState<string>('');
    const [modelValue, setModelValue] = useState<string>('');
    const [size, setSize] = useState<boolean>(true);
    const [sizeValue, setSizeValue] = useState<string>('');
    const [city, setCity] = useState<boolean>(true);
    const [cityValue, setCityValue] = useState<string>('');
    const [stateValue, setStateValue] = useState<string>('');
    const [desiredPhoneValue, setDesiredPhoneValue] = useState<string>('');
    const [typeValue, setTypeValue] = useState<string>('');
    const [budgetValue, setBudgetValue] = useState<string>('');

    // fetch all providers
    const { data, isLoading } = useGetProvidersQuery();
    
    // fetch all models
    const { data: models, isLoading: modelLoading } = useGetModelsQuery({ id: providerValue });

    // fetch all storage
    const { data: sizes, isLoading: sizeLoading } = useGetStoragesQuery({ id: modelValue });
    console.log(modelValue);

    // search mutation
//     const [search, { isLoading: any }] = useSearchMutation();


//     // handler to search for vendors
//     const submitHandler = () => {
//         search({
//             provider: providerValue,
//             model: modelValue,
//             desired_provider: desiredPhoneValue,
//             budget: budgetValue,
//             type: typeValue,
//             city: cityValue,
//             state: stateValue,
//             size: sizeValue,
//         }).then((res: any) => {
//             if(res.data.status === 200){
//                setVendors(res.data.data)
//             }
//         })
//     }
        
    let providers: Iitem[] = [];

    // get providers and add them to array for display
    !isLoading && data.data.map((provider: any) => {
        providers.push({
            id: provider._id,
            title: provider.name,
            value: provider._id
        })
    });

    // get all models related to providers
    let filteredModels: Iitem[] = [];
    if (providerValue) {
        console.log("Sizes: " + !modelLoading && models?.data);
        !modelLoading && models?.data.map((filteredModel: any) => {
            filteredModels.push({
                id: filteredModel._id,
                title: filteredModel.model,
                value: filteredModel._id
            })
        });
    }

    // get all size related to selected model
    let filteredSizes: Iitem[] = [];
   

    if (modelValue) {
        !sizeLoading && sizes?.data.map((filteredSize: any) => {
            filteredSizes.push({
                id: filteredSize._id,
                title: filteredSize.name,
                value: filteredSize._id
            })
        });
    }

//     let States: Iitem[] = [];

//     !isLoading && sizes.data.map((filteredSize: any) => {
//         filteredSizes.push({
//             id: filteredSize._id,
//             title: filteredSize.name,
//             value: filteredSize._id
//         })
//     });
    
    // handles selecting a provider
    const providerHandler = (e: any) => {
        if (modelValue !== '' || sizeValue !== '') {
            setProviderValue(e.target.value);
            setModel(true);
            setSize(true);
        } else {
            console.log(e.target.value);
            setProviderValue(e.target.value);
            setModel(false);
        }

        // checkFields();
    }

    const modelHandler = (e: any) => {
        if (sizeValue !== '') {
            setModelValue(e.target.value);
            setSize(true);
        } else {
            setModelValue(e.target.value);
            setSize(false);
        }

        // checkFields();
    }

    const sizeHandler = (e: any) => {
        setSizeValue(e.target.value);

        // checkFields();
    }

//     const desiredProviderHandler = (e: any) => {
//         setDesiredPhoneValue(e.target.value);
//         checkFields();
//     }

//     const stateHandler = (e: any) => {
//         if (cityValue !== '') {
//             setCity(true);
//             setStateValue(e.target.value)
//         } else {
//             setStateValue(e.target.value)
//         }
        
//         checkFields();
//     }

//     const cityHandler = (e: any) => {
//         setCityValue(e.target.value);
//         checkFields();
//     }


//     const checkFields = () => {
//         if (providerValue !== '' && modelValue !== '' && sizeValue !== '' && stateValue !== '' && cityValue !== '' && desiredPhoneValue !== '' && typeValue !== '') {
//             if (typeValue === 'Upgrade' && budgetValue !== '') {
//                setSubmit(false)
//             } else {
//                 setSubmit(false)
//            }
//         } else {
//             setSubmit(true)
//        }
//    }

   
    

    return (
        <>
            { vendors.length === 0 && (
                <section className={styles.container}>
                    <h3>Find Deals</h3>
                    <form className={styles.container} onSubmit={(e: any) => { e.preventDefault(); }}>
                        <Dropdown value={providerValue} label={'Select Phone Provider'} items={providers} disabled={false} onChange={providerHandler} required={true} />
                        <Dropdown value={modelValue}  label={'Select Phone Model'} items={filteredModels} disabled={model} onChange={modelHandler} required={true}/>
                        <Dropdown value={sizeValue}  label={'Select Storage size'} items={filteredSizes} disabled={size} onChange={sizeHandler} required={true}/>
                        {/* <Dropdown value={stateValue}  label={'state'} items={States} disabled={false} onChange={stateHandler} required={true}/>
                        <Dropdown value={cityValue}  label={'city'} items={providers} disabled={city} onChange={cityHandler} required/>
                        <Dropdown value={desiredPhoneValue}  label={'Desired Phone Provider'} items={providers} disabled={false} onChange={desiredProviderHandler} required={true}/>
                    <div>
                        <div>
                                <input type="radio" id="css" name="deal_type" value="Downgrade" onChange={(e: any) => { setTypeValue(e.target.value); 
            }} required checked={typeValue==="Downgrade"} />
                            <label>Downgrade</label>
                        </div>
                        <div>
                                <input type="radio" id="javascript" name="deal_type" value="Upgrade" onChange={(e: any) => { setTypeValue(e.target.value);  
            }} required checked={typeValue==="Upgrade"}/>
                            <label>Upgrade</label>
                        </div>
                    </div>
                    {typeValue === 'Upgrade' && (
                            <InputField type={'number'} label="Budget" value={budgetValue} required={true} onChange={(e: any) => {setBudgetValue(e.target.value)}} />
                    )}
                        <Button type="submit" label={'Find Deal'} disabled={submit} /> */}
                    </form>
                </section>
            )}
            { vendors.length > 0 && (
                <VendorsContent data={vendors} />
            )}
        </>
    )
}