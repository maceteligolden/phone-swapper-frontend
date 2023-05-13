import Appcontainer from "@/component/layout/appcontainer";
import DashboardSection from "@/component/sections/Dashboard";
import DashboardmenuSection from "@/component/sections/Dashboard/Dashboardmenu";

export default function Dashboard() {
    return (
        <>
            <Appcontainer title={"Dashboard"}>
                <DashboardmenuSection/>
            </Appcontainer>
        </>
    )
}