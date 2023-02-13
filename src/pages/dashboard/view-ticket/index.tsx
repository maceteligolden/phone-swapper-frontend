import Appcontainer from "@/component/layout/appcontainer";
import ViewTicketContent from "@/component/sections/view-ticket";

export default function Viewticket() {
    return (
        <>
            <Appcontainer title={"View Ticket"} isHome={true}>
                <ViewTicketContent/>
            </Appcontainer>
        </>
    )
}