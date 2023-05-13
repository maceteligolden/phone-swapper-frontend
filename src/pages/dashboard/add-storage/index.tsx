import Button from "@/component/form/button";
import Dropdown from "@/component/form/dropdown";
import InputField from "@/component/form/inputfield";
import Appcontainer from "@/component/layout/appcontainer";
import AddstorageSection from "@/component/sections/Dashboard/Addstorage";

export default function AddStorage() {
    return (
        <>
            <Appcontainer title={"Add Storage"}>
                <AddstorageSection/>
            </Appcontainer>
        </>
    )
}