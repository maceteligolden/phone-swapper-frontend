import Popup from '@/component/displays/popup';
import Button from '@/component/form/button';
import Dropdown, { Iitem } from '@/component/form/dropdown';
import FileUploader from '@/component/form/fileuploader';
import InputField from '@/component/form/inputfield';
import TextArea from '@/component/form/textarea';
import { useState } from 'react';
import styles from './index.module.css';

export default function CreateTicketContent() {

    const [status, setStatus] = useState<boolean>(false);

    const service_types: Iitem[] = [
        {
            id: '1',
            title: 'Network',
            value: 'Network'
        },
        {
            id: '2',
            title: 'Software',
            value: 'Software'
        },
        {
            id: '3',
            title: 'Hardware',
            value: 'Hardware'
        },
        {
            id: '4',
            title: 'Cloud',
            value: 'Cloud'
        },
        {
            id: '5',
            title: 'Other',
            value: 'Other'
        }
    ]

    const priority: Iitem[] = [
        {
            id: '1',
            title: 'HIGH',
            value: 'HIGH'
        },
        {
            id: '2',
            title: 'MID',
            value: 'MID'
        },
        {
            id: '3',
            title: 'LOW',
            value: 'LOW'
        }
    ]

    // state for when ticket was successfully created
    const statusHandler = () => {
        setStatus((state) => !state);
    }

    return (
        <>
            <section className={styles.container}>
                <InputField placeholder='Ticket Subject'/>
                <Dropdown label={'Select Service type'} items={service_types} />
                <Dropdown label={'Select Priority'} items={priority} />
                <TextArea />
                <FileUploader/>
                <Button label={'Create a ticket'} onClick={statusHandler} />
            </section>

            <Popup
                displayStatus={status}
                close={statusHandler}
            >
                <SuccessMessage />
            </Popup>
        </>
    )
}

function SuccessMessage() {
    return (
        <>
            <div className={styles.popcontainer}>
                <p>Ticket Successfully created</p>
                <Button label='View Ticket' onClick={() => {}}/>
            </div>
        </>
    )
}