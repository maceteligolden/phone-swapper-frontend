import Appcontainer from "@/component/layout/appcontainer";
import ChangepasswordContent from "@/component/sections/profile/changepassword";


export default function ChangePassword() {
    return (
        <>
            <Appcontainer title={"Change Password"} isHome={true}>
              <ChangepasswordContent/>
            </Appcontainer>
        </>
    )
}