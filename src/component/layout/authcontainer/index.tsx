import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import { Icon } from '@iconify/react';

interface IAppcontainer {
    children?: ReactNode
}

export default function Authcontainer(props: IAppcontainer) {

    return (
        <>
            <main className={styles.container}>
                <section className={styles.card}>
                    <section>
                        {props.children}
                    </section>
                </section>
            </main>
        </>
    )
}