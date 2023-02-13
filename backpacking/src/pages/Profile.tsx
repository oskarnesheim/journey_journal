import UseAuth from "../custom-hooks/UseAuth";

export default function Profile() {

    const currentUser = UseAuth();

    
    return (
        <div>
        <h1>Profile</h1>
        <div>
            {currentUser?.email}
        </div>
        </div>
    )
    }