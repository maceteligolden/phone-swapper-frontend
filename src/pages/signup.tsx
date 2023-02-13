import Authcontainer from "@/component/layout/authcontainer";
import DashboardSection from "@/component/sections/Dashboard";
import SignupContent from "@/component/sections/signup";

export default function Signup() {
    return (
        <>
            <Authcontainer>
                <SignupContent/>
            </Authcontainer>
        </>
    )
}