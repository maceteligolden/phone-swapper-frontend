import { Snackbar, Alert } from "@mui/material";

interface ISToast {
    text: string,
    severity: string,
    open: boolean,
    onClose: () => void
}

export default function SToast(props: ISToast) {
    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={props.open}
                autoHideDuration={2000}
                onClose={props.onClose}
            >
                <Alert onClose={props.onClose} severity="error" sx={{ width: '100%' }}>
                   {props.text}
                </Alert>
            </Snackbar>
        </>
    )
}