import "./lists.css"
import ChatList from "./chatList/ChatList"
import UserInfo from "./userInfo/UserInfo"

function Lists() {
    return (
        <div className="lists">
            <UserInfo/>
            <ChatList/>
        </div>
    )
}

export default Lists