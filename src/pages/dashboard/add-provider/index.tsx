import Button from "@/component/form/button";
import InputField from "@/component/form/inputfield";
import Appcontainer from "@/component/layout/appcontainer";
import AddproviderSection from "@/component/sections/Dashboard/Addprovider";

export default function AddProvider() {
    return (
        <>
            <Appcontainer title={"Add Provider"}>
               <AddproviderSection/>
            </Appcontainer>
        </>
    )
}