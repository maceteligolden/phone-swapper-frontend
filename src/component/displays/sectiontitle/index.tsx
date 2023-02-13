import styles from './index.module.css';

interface ISectiontitle {
    title: string,
}

export default function Sectiontitle(props: ISectiontitle) {
    return (
        <>
            <section className={styles.container}>
                <p>{props.title}</p>
            </section>
        </>
    )
}