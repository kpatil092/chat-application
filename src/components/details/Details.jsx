import { auth, db } from "../../lib/firebase"
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import "./details.css"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

function Details() {

    const { currentUser } = useUserStore();
    const { chatId, user, isCurrentUserBlocked, isRecieverBlocked, changeBlocks, resetChat } = useChatStore();

    const handleBlock = async () => {
        if (!user) return;

        const userDocRef = doc(db, "users", currentUser.id)

        try {
            await updateDoc(userDocRef, {
                blocked: isRecieverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
            })

            changeBlocks();
        } catch (err) {
            console.log(err)
        }
    }

    const handleLogOut = () => {
        auth.signOut();
        resetChat();
    }

    return (
        <div className="details">

            <div className="user">
                <img src={user?.avatar || "./avatar.png"} alt="avatar" />
                <h2>{user?.username}</h2>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>

            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt="arrowUp" />
                    </div>
                </div>

                <div className="option">
                    <div className="title">
                        <span>Privacy & Help</span>
                        <img src="./arrowUp.png" alt="arrowUp" />
                    </div>
                </div>

                <div className="option">
                    <div className="title">
                        <span>Shared photos</span>
                        <img src="./arrowDown.png" alt="arrowDown" />
                    </div>
                    <div className="photos">

                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://images.pexels.com/photos/3238529/pexels-photo-3238529.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="stockImage" />
                                <span>photo_2024_1.png</span>
                            </div>
                            <img src="./download.png" alt="download" className="icon" />
                        </div>

                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://images.pexels.com/photos/18129529/pexels-photo-18129529/free-photo-of-two-women-in-suits-posing-on-a-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="stockImage" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="download" className="icon" />
                        </div>

                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://images.pexels.com/photos/18127640/pexels-photo-18127640/free-photo-of-blonde-woman-wearing-yellow-dress-at-night.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="stockImage" />
                                <span>photo_2024_3.png</span>
                            </div>
                            <img src="./download.png" alt="download" className="icon" />
                        </div>

                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://images.pexels.com/photos/20192549/pexels-photo-20192549/free-photo-of-blue-mountains.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
                                <span>photo_2024_4.png</span>
                            </div>
                            <img src="./download.png" alt="download" className="icon" />
                        </div>

                    </div>
                </div>

                <div className="option">
                    <div className="title">
                        <span>Shared files</span>
                        <img src="./arrowUp.png" alt="arrowUp" />
                    </div>
                </div>
            </div>
            <div className="buttons">
                <button onClick={handleBlock}>
                    {
                        isCurrentUserBlocked
                            ? "You are blocked"
                            : isRecieverBlocked
                                ? "User blocked"
                                : "Block user"
                    }
                </button>
                <button
                    className="logout"
                    onClick={handleLogOut}
                >
                    Logout
                </button>
            </div>
                

        </div>
    )
}

export default Details