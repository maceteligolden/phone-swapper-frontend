import { useRouter } from 'next/router';
import styles from './index.module.css';

export default function ProfileContent() {

    const router = useRouter();

    return (
        <>
            <section className={styles.container}>
                <div className={styles.lineborder} onClick={() =>{ router.push('/dashboard/update-profile')}}>
                    Update Profile
                </div>
                <div className={styles.lineborder} onClick={() =>{ router.push('/dashboard/changepassword')}}>
                    Change Password
                </div>
                <div className={styles.logout} onClick={() =>{ router.push('/dashboard')}}>
                    Logout
                </div>
            </section>
        </>
    )
}