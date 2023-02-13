import styles from './index.module.css';
import Link from 'next/link';
import Card, { ICard } from '@/component/displays/cards';

interface IVendorsContent {
    data: any[]
}

export default function VendorsContent(props: IVendorsContent) {

    const list = props.data.map((data: any, index: number) => {
        return (
            <Card
                key={index}
                id={data.id}
                vendor_name={data.vendor_name}
                provider={data.provider}
                model={data.model}
                size={data.size}
                cost={data.cost}
                phone={data.phone}
                address={data.address}
                state={data.state}
                city={data.city} />
        )
    })

    return (
        <>
            <section className={styles.container}>
                <nav className={styles.nav}>
                    <Link className={styles.link} href="/dashboard"> Back</Link>
                </nav>
                <main className={styles.content}>
                    {datas.length === 0 ? (
                        <p>Oops no deal for you</p>
                    ) :
                        (list)
                    }
                </main>
            </section>
        </>
    )
}