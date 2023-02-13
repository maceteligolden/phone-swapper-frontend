import Link from 'next/link';
import Sectiontitle from '@/component/displays/sectiontitle';
import Button from '@/component/form/button';
import Dropdown, { Iitem } from '@/component/form/dropdown';
import styles from './index.module.css';
import InputField from '@/component/form/inputfield';
import { useRouter } from 'next/router';

export default function ViewTicketContent() {

    const router = useRouter();

    // map all ticket data here
    const tickets: Iitem[] = [
        {
            id: '1',
            title: '',
            value: ''
        }
    ];

    const checkoutHandler = () => {
        router.push('/dashboard/checkout')
    }

    return (
        <>
            <section className={styles.container}>
                <div className={styles.header}>
                    <Dropdown label={'Select ticket'} items={tickets} />
                    <Button label={'View Ticket'} onClick={() => {}} />
                </div>
              
                <section className={styles.subcontainer}>
                    <Sectiontitle title={'Ticket Detail'} />
                    <div className={styles.itemcontainer}>
                        <p><b>ID:</b></p> <p className={styles.highlight}>PC-2023-12345</p>
                    </div>
                    <div className={styles.itemcontainer}>
                        <p><b>Subject:</b></p> <p className={styles.highlight}>Broken laptop screen</p>
                    </div>
                    <div className={styles.itemcontainer}>
                        <p><b>Service Type:</b></p> <p className={styles.highlight}>Hardware</p>
                    </div>
                    <div className={styles.itemcontainer}>
                        <p><b>Status:</b></p> <p className={styles.highlight}>In Progress</p>
                    </div>
                    <div className={styles.itemcontainer}>
                        <p><b>Description:</b></p> <p className={styles.highlight}>Alot of words will be here for the description, now i'm just chatting </p>
                    </div>
                    <div className={styles.itemcontainer}>
                        <p><b>Attachment:</b></p>
                        <div className={styles.highlight}>
                            <Link href={'#'}>Photo1.jpg</Link>
                            <Link href={'#'}>Photo2.jpg</Link>
                        </div>
                    </div>
                    <Sectiontitle title={'Message box'} />
                    <div className={styles.messagebox}>
                        <div className={styles.messageinput}>
                            <InputField placeholder='Send Message...'/> 
                        </div>
                        

                        <div className={styles.messagecontainer}>
                            <div className={styles.receiver}>
                                <p>Agent</p>
                                <small>12th deember</small>
                                <p>
                                    message goes here
                                </p>
                            </div>
                            <div className={styles.sender}>
                                <p>You</p>
                                <small>12th deember</small>
                                <p>
                                    message goes here
                                </p>
                            </div>
                            <div className={styles.sender}>
                                <p>You</p>
                                <small>12th deember</small>
                                <p>
                                    message goes here
                                </p>
                            </div>
                            <div className={styles.sender}>
                                <p>You</p>
                                <small>12th deember</small>
                                <p>
                                    message goes here
                                </p>
                            </div>  
                        </div>
                        
                    </div>
                    <Button label={'Checkout'} onClick={checkoutHandler} />
                </section>
            </section>
        </>
    )
}