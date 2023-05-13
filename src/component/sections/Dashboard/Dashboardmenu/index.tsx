import Link from "next/link";
import styles from './index.module.css';

export default function DashboardmenuSection() {
    return (
        <>
            <section>
                <ul className={styles.container}>
                    <li><Link href="/dashboard/add-device">Add Device</Link></li>
                    <li><Link href="/dashboard/add-model">Add Model</Link></li>
                    <li><Link href="/dashboard/add-storage">Add Storage</Link></li>
                    <li><Link href="/dashboard/add-provider">Add Provider</Link></li>
                </ul>
            </section>
        </>
    )
}