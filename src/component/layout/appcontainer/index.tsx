import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import { Icon } from '@iconify/react';

interface IAppcontainer {
    title: string,
    isHome?: boolean,
    children?: ReactNode
}

export default function Appcontainer(props: IAppcontainer) {

    // initialize router 
    const router = useRouter();

    // back button handler 
    const backHandler = () => {
        router.back()
    }

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