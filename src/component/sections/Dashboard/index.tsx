import Button from '@/component/form/button';
import Dropdown, { Iitem } from '@/component/form/dropdown';
import InputField from '@/component/form/inputfield';
import { useGetModelsQuery, useGetProvidersQuery, useGetStoragesQuery, useSearchMutation } from '@/services/deviceService';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import VendorsContent from '../vendors';
import styles from './index.module.css';
import { locations } from '@/constants/location';

export default function DashboardSection() {

    const [submit, setSubmit] = useState<boolean>(true);
    const [vendors, setVendors] = useState<any[]>([])
    const [model, setModel] = useState<boolean>(true);
    const [providerValue, setProviderValue] = useState<string>('');
    const [modelValue, setModelValue] = useState<string>('');
    const [size, setSize] = useState<boolean>(true);
    const [sizeValue, setSizeValue] = useState<string>('');
    const [cities, setCity] = useState<Iitem[]>([]);
    const [cityValue, setCityValue] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [desiredPhoneValue, setDesiredPhoneValue] = useState<string>('');
    const [typeValue, setTypeValue] = useState<string>('');
    const [budgetValue, setBudgetValue] = useState<string>('');

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

    // fetch all providers
    const { data, isLoading } = useGetProvidersQuery();
    
    // fetch all models
    const { data: models, isLoading: modelLoading } = useGetModelsQuery({ id: providerValue });

    // fetch all storage
    const { data: sizes, isLoading: sizeLoading } = useGetStoragesQuery({ id: modelValue });

    // search mutation
    const [search, { isLoading: any }] = useSearchMutation();

    const router = useRouter();


//     // handler to search for vendors
    const submitHandler = () => {
        search({
            provider: providerValue,
            model: modelValue,
            desired_provider: desiredPhoneValue,
            budget: budgetValue,
            type: typeValue,
            city: cityValue,
            state: stateValue,
            size: sizeValue,
        }).then((res: any) => {
            console.log(res)
            if(res.data.status === 200){
                setVendors(res.data.data);
                console.log(vendors.length)
            }
        })
    }
        
    let providers: Iitem[] = [];

    // get providers and add them to array for display
    // !isLoading && data.data.map((provider: any) => {
    //     providers.push({
    //         id: provider._id,
    //         title: provider.name,
    //         value: provider._id
    //     })
    // });

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
            console.log(filteredSize)
            filteredSizes.push({
                id: filteredSize._id,
                title: filteredSize.size,
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

        checkFields();
    }

    const modelHandler = (e: any) => {
        if (sizeValue !== '') {
            setModelValue(e.target.value);
            setSize(true);
        } else {
            setModelValue(e.target.value);
            setSize(false);
        }

        checkFields();
    }

    const sizeHandler = (e: any) => {
        setSizeValue(e.target.value);

        checkFields();
    }

    const desiredProviderHandler = (e: any) => {
        setDesiredPhoneValue(e.target.value);
        checkFields();
    }

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


    const checkFields = () => {
        if (providerValue !== '' && modelValue !== '' && sizeValue !== '' && stateValue !== '' && cityValue !== '' && desiredPhoneValue !== '' && typeValue !== '') {
            if (typeValue === 'Upgrade' && budgetValue !== '') {
               setSubmit(false)
            } else {
                setSubmit(false)
           }
        } else {
            setSubmit(true)
       }
   }

   
    

    return (
        <>
            { vendors.length === 0 && (
                <section className={styles.containr}>
                   
                    <form className={styles.container} >
                        <h3>Find Deals</h3>
                        <Dropdown value={providerValue} label={'Select Phone Provider'} items={providers} disabled={false} onChange={providerHandler} required={true} />
                        <Dropdown value={modelValue}  label={'Select Phone Model'} items={filteredModels} disabled={model} onChange={modelHandler} required={true}/>
                        <Dropdown value={sizeValue} label={'Select Storage size'} items={filteredSizes} disabled={size} onChange={sizeHandler} required={true} />
                        <Dropdown
                            label={'Select State'}
                            items={states}
                            disabled={false}
                            value={state}
                            onChange={handleStateChange}
                            // error={formik.touched.state && Boolean(formik.errors.state)}
                            // helperText={formik.touched.state && formik.errors.state}
                            required={true}
                        />
                        <Dropdown
                            label={'Select City'}
                            items={cities}
                            disabled={false}
                            value={state}
                            onChange={(e: any)=>{setCityValue(e.target.value)}}
                            // error={formik.touched.city && Boolean(formik.errors.city)}
                            // helperText={formik.touched.city && formik.errors.city}
                            required={true}
                        />
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
                        <Button type="submit" label={'Find Deal'} disabled={false} onClick={(e: any) => { e.preventDefault(); submitHandler()}} />
                    </form>
                </section>
            )}
            { vendors.length > 0 && (
                <VendorsContent data={vendors} />
            )}
        </>
    )
}