import { Card, CardHeader, Heading, CardBody, CardFooter, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Editable, EditablePreview, EditableTextarea } from "@chakra-ui/react";
import { getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import CreateJourney from "../components/CreateJourney";
import UseAuth from "../custom-hooks/UseAuth";
import { auth, getCollection } from "../firebase-config";
import { Ijourney, Iuser } from "../interfaces/Interfaces";
import { UserState } from "../recoil/atoms";


export default function Profile() {
    const { isOpen, onOpen, onClose } = useDisclosure(); //? Modal
    const [newPostToggle, setNewPostToggle] = useState(false); //? Velger om man skal lage en ny post eller ikke
    const [errorMessage, setErrorMessage] = useState<string>("");  //? Error message
    const [currentUser, setCurrentUser] = useRecoilState(UserState); //? Henter bruker fra recoil
    const [userPosts, setUserPosts] = useState<Ijourney[]>([]); //? Henter alle brukerens poster

    const [editTitle, setEditTitle] = useState<Iedit>({} as Iedit); //? Editable title
    const [editDescription, setEditDescription] = useState<string>(""); //? Editable description
    const [editCost, setEditCost] = useState<string>(""); //? Editable cost
    const [editDistance, setEditDistance] = useState<string>(""); //? Editable distance

    interface Iedit {
        content: string;
        prevState: null
      }
    
    useEffect(() => {
        try{
            if (!auth) {
                setErrorMessage("You are not logged in, and can therefore not post a message");
                return;
            }
            getUserPosts();
        }catch(error){
            console.log(error)
        }
    },[userPosts]);
    
    const getJourneyRef = getCollection('journeys/');

    const getUserPosts = async () => {
        try {
            const q = query(getJourneyRef,where('uid', '==', auth.currentUser?.uid));
            const data = await getDocs(q)
            setUserPosts(
                data.docs.map((journey) => ({...journey.data()} as Ijourney))
            )
        } catch (error) {
            console.log(error);
        }
    }
    

    
    const CreateJourneyFunc = () => {
    if(newPostToggle){
        return (
            <div>
                <CreateJourney />
            </div>
            )
        }
    }

    

    const openModal = () => {
        onOpen();

    }

    const deletePost = (journey:Ijourney) =>{
        try {
            deleteDoc(doc(getJourneyRef, journey.title));
        } catch (error) {
            console.log(error);
        }
    }

    const showJourneys = () => {
        return (
            userPosts.map((journey) =>
                <Card key={journey.title + " " + journey.uid} paddingBottom={4} >
                    <CardHeader >
                        <Heading size='md'> {journey.title}</Heading>
                    </CardHeader>
                    <CardBody>
                        <p>Description : {journey.description}</p>
                        <p>Distance : {journey.distance}</p>
                        <p>Cost : {journey.cost}</p>
                        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>
                                        <Editable  
                                            defaultValue={journey.title} 
                                            className='border-dotted border-2 border-sky-500 rounded-md'>
                                            <EditablePreview />
                                            <EditableTextarea />    
                                        </Editable>
                                    </ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                    Description:
                                    {/* <div className="border-dotted border-2 border-sky-500 rounded-md w-full"> */}
                                    <Editable defaultValue={journey.description} className='border-dotted border-2 border-sky-500 rounded-md'>
                                        <EditablePreview />
                                        <EditableTextarea />    
                                    </Editable>
                                    {/* </div> */}
                                    Cost:
                                    <Editable defaultValue={journey.cost.toString()} className='border-dotted border-2 border-sky-500 rounded-md'>
                                        <EditablePreview />
                                        <EditableTextarea />    
                                    </Editable>
                                    Distance:
                                    <Editable defaultValue={journey.distance} className='border-dotted border-2 border-sky-500 rounded-md'>
                                        <EditablePreview />
                                        <EditableTextarea />    
                                    </Editable>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                                        Lagre og lukk
                                        </Button>
                                        <Button variant='ghost'>Avbryt</Button>
                                    </ModalFooter>
                                </ModalContent>
                        </Modal>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={openModal}>Edit post</Button>
                        <Button onClick={() => deletePost(journey)}>Delete</Button>

                    </CardFooter>
                 </Card>
            ));} 


    return (
        <div className='w-full relative' >
                <h1> {currentUser? "Welcome back "+ currentUser.firstname+ " " + currentUser.lastname: "Not Logged In"}</h1>
                <h3>{errorMessage}</h3>
            <div>
                {currentUser?.email}
            </div>
            <div className="relative">
                {CreateJourneyFunc()}
            </div>
            <div className="h-56 grid grid-cols-2 gap-10 content-evenly p-16 relative">
                {showJourneys()}
            </div>
            <div className="relative">
                <button onClick={e => setNewPostToggle(!newPostToggle)}>{!newPostToggle ? "Click here to create a new journey" : "Back"}</button>
            </div>
        </div>
    )
    }