import styles from './index.module.css';

interface IDropdown {
    label: string,
    disabled: boolean,
    items: Iitem[],
    onChange: (e: any) => void,
    required?: boolean
    value?: any
}

export interface Iitem {
    id: string,
    title: string,
    value: string
}

export default function Dropdown(props: IDropdown) {

    // map select items 
    const options = props.items.map((item: Iitem, index: number) => {
        return <option key={index} value={item.value}> {item.title} </option>
    })

    return (
        <>
            <select className={styles.container} value={props.value}  disabled={props.disabled} onChange={props.onChange} required>
                <option>{props.label}</option>
                {options}
            </select>
        </>
    )
}