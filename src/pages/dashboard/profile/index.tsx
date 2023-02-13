import Appcontainer from "@/component/layout/appcontainer";
import ProfileContent from "@/component/sections/profile";


export default function Profile() {
    return (
        <>
            <Appcontainer title={"Profile"} isHome={true}>
                <ProfileContent/>
            </Appcontainer>
        </>
    )
}