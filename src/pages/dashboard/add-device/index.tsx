import Button from "@/component/form/button";
import Dropdown from "@/component/form/dropdown";
import InputField from "@/component/form/inputfield";
import Appcontainer from "@/component/layout/appcontainer";
import AdddeviceSection from "@/component/sections/Dashboard/Adddevice";

export default function AddDevice() {
    return (
        <>
            <Appcontainer title={"Add Device"}>
             <AdddeviceSection/>
            </Appcontainer>
        </>
    )
}