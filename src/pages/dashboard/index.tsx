import Appcontainer from "@/component/layout/appcontainer";
import DashboardSection from "@/component/sections/Dashboard";

export default function Dashboard() {
    return (
        <>
            <Appcontainer title={"Dashboard"}>
                <DashboardSection/>
            </Appcontainer>
        </>
    )
}