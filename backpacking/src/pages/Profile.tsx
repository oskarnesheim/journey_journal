import { useState } from "react";
import CreateJourney from "../components/CreateJourney";
import UseAuth from "../custom-hooks/UseAuth";


export default function Profile() {

    const currentUser = UseAuth();
    const [newPostToggle, setNewPostToggle] = useState(false);
    
    const CreateJourneyFunc = () => {
    if(newPostToggle){
        return (
            <div>
                <CreateJourney />
            </div>
        )
    }
}

    return (
        <div>
            <h1>Profile</h1>
            <div>
                {currentUser?.email}
            </div>
            <div>
                {CreateJourneyFunc()}
            </div>
            <div>
                <button onClick={e => setNewPostToggle(!newPostToggle)}>{!newPostToggle ? "Click here to create a new journey" : "Back"}</button>
            </div>
        </div>
    )
    }