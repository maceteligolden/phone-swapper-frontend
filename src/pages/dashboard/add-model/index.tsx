import Button from "@/component/form/button";
import Dropdown from "@/component/form/dropdown";
import InputField from "@/component/form/inputfield";
import Appcontainer from "@/component/layout/appcontainer";
import AddmodelSection from "@/component/sections/Dashboard/Addmodel";

export default function AddModel() {
    return (
        <>
            <Appcontainer title={"Add Model"}>
                <AddmodelSection/>
            </Appcontainer>
        </>
    )
}