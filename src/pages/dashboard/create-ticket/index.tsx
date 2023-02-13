import Appcontainer from "@/component/layout/appcontainer";
import CreateTicketContent from "@/component/sections/create-ticket";

export default function CreateTicket() {
    return (
        <>
            <Appcontainer title={"Create a ticket"} isHome={true}>
                <CreateTicketContent/>
            </Appcontainer>
        </>
    )
}