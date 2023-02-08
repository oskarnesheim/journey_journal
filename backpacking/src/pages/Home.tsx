export default function Home() {
    return (
        <div>
        <h1>Home</h1>
        </div>
    )
    }

    // const getUsersRef = getCollection('users');

    // useEffect(() =>{
    //     const getUsers = async () =>{
    //         const data = await getDocs(getUsersRef)
    //         setUsers(data.docs.map((person) => ({...person.data()} as user)))// adds all users to the users state
    //         // data.docs.map((person) => console.log({...person.data()})) // logs all users
    // }
    // getUsers();
    // }, []);

    // const showUsers = () => {
    //     const output: JSX.Element[] = []
    //         users.forEach((user) =>
    //         output.push(
    //             <div key={user.fullname}>
    //                 <div>Name: {user.fullname}</div>
    //                 <div>Age: {user.age}</div>
    //                 <div>Description: {user.description}</div>
    //                 <div>isAdmin: {user.isAdmin ? "true":"false"}</div>
    //                 <br />
    //             </div>) 
    // )
    // return output;
    // } 