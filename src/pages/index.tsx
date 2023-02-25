import styles from '../styles/Home.module.css';
import imageLoader from '../../loader';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <section className={styles.container}>
                <nav className={styles.header}>
                    <p className={styles.title}><span className={styles.highlight}>Gadget</span>Swap</p>
                </nav>
                <div className={styles.pinkblur}>
                </div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <h3>
                            Get an estimate for 
                            your gadgets and 
                            <span className={styles.highlight}>
                                 connect with the 
                                closest certified 
                                provider.
                            </span>
                        </h3>
                        <div>
                            <Link href="signin" className={'heroBtn'}>Get Started</Link>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.imgcontainer}>
                            <Image
                                loader={imageLoader}
                                src="hero.png"
                                alt="header image"
                                layout="fill"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}