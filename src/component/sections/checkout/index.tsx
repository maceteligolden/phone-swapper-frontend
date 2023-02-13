import Sectiontitle from '@/component/displays/sectiontitle';
import Button from '@/component/form/button';
import InputField from '@/component/form/inputfield';
import styles from './index.module.css';

export default function CheckoutContent() {
    return (
        <>
            <section className={styles.container}>
                <section className={styles.subcontainer}>
                    <Sectiontitle title={'Ticket Detail Summary'} />
                    <div className={styles.itemcontainer}>
                        <p><b>ID:</b></p> <p className={styles.highlight}>PC-2023-12345</p>
                    </div>
                    <div className={styles.itemcontainer}>
                        <p><b>Subject:</b></p> <p className={styles.highlight}>Broken laptop screen</p>
                    </div>
                    <div className={styles.itemcontainer}>
                        <p><b>Service Type:</b></p> <p className={styles.highlight}>Hardware</p>
                    </div>
                    <Sectiontitle title={'Invoice total'} />
                    <div className={styles.itemcontainer}>
                        <p><b>Parts Total:</b></p> <p className={styles.highlight}>20200</p>
                    </div>
                    <div className={styles.itemcontainer}>
                        <p><b>Labour Total:</b></p> <p className={styles.highlight}>20200</p>
                    </div>
                    <div className={styles.itemcontainer}>
                        <p><b>Total Due:</b></p> <p className={styles.highlight}>20200</p>
                    </div>
                </section>
                <Button label={'Pay'} onClick={() => {}}/>
            </section>
        </>
    )
}