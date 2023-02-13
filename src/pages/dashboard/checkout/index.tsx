import Appcontainer from "@/component/layout/appcontainer";
import CheckoutContent from "@/component/sections/checkout";

export default function Checkout() {
    return (
        <>
            <Appcontainer title={"Checkout"} isHome={true}>
                <CheckoutContent/>
            </Appcontainer>
        </>
    )
}