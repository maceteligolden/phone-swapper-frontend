import Appcontainer from "@/component/layout/appcontainer";
import UpdateprofileContent from "@/component/sections/profile/updateprofile";



export default function UpdateProfile() {
    return (
        <>
            <Appcontainer title={"Update Profile"} isHome={true}>
                <UpdateprofileContent/>
            </Appcontainer>
        </>
    )
}