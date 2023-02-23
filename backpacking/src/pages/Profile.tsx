import { Card, CardHeader, Heading, CardBody, CardFooter, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Editable, EditablePreview, EditableTextarea } from "@chakra-ui/react";
import { getDocs, query, where, deleteDoc, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import CreateJourney from "../components/CreateJourney";
import { auth, database, getCollection } from "../firebase-config";
import { Ijourney, Iuser } from "../interfaces/Interfaces";
import { UserState } from "../recoil/atoms";


export default function Profile() {
    const { isOpen, onOpen, onClose } = useDisclosure(); //? Modal
    const [newPostToggle, setNewPostToggle] = useState(false); //? Velger om man skal lage en ny post eller ikke
    const [errorMessage, setErrorMessage] = useState<string>("");  //? Error message
    const [currentUser, setCurrentUser] = useRecoilState(UserState); //? Henter bruker fra recoil
    const [userPosts, setUserPosts] = useState<Ijourney[]>([]); //? Henter alle brukerens poster

    const [editJourney, setEditJourney] = useState<Ijourney>({
        title: "9ijku8ujhy67ygt5tfre4",
        distance: "9ijku8ujhy67ygt5tfre4",
        description: "9ijku8ujhy67ygt5tfre4",
        cost: -69,
        uid: "",
        journeyPath: [],
        journeyID: ""
        } as Ijourney); //? Editable journey
    const getJourneyRef = getCollection('journeys/');
    
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
                <CreateJourney />
            )
        }
    }
 
    const saveChanges = async (journey: Ijourney) => {
        onClose();
        const journeyToBeSaved:Ijourney = {
            title: journey.title,
            distance: journey.distance,
            description: journey.description,
            cost: journey.cost,
            uid: journey.uid,
            journeyPath: journey.journeyPath,
            journeyID: journey.journeyID
        }
        console.log("🚀 ~ file: Profile.tsx:82 ~ saveChanges ~ userToBeSaved:", journeyToBeSaved)
        //todo
        try {
            await setDoc(doc(database, "journeys/", journeyToBeSaved.journeyID), journeyToBeSaved);
        } catch (error) {
            console.log(error)
        }
    }

    const deletePost = (journey:Ijourney) =>{
        try {
            deleteDoc(doc(getJourneyRef, journey.journeyID));
        } catch (error) {
            console.log(error);
        }
    }


    const showJourneys = () => {
        return (
            <div className="mt-24">
                {/* Todo! Her må vi lage en egen component.  */}
                {/* {userPosts.map((journey) => */}
                {userPosts.length === 0 ? <p>No posts yet</p> : userPosts.map((journey) =>
                <Card key={journey.journeyID} paddingBottom={4} margin={10} boxShadow={"2xl"}>
                    <CardHeader >
                        <Heading size='md'> {journey.title}</Heading>
                    </CardHeader>
                    <CardBody>
                        <p>Description : {journey.description}</p>
                        <p>Distance : {journey.distance} km</p>
                        <p>Cost : {journey.cost} kr</p>
                        <Modal blockScrollOnMount={false} size={"md"} closeOnEsc={false} isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>
                                        Title:
                                        <Editable  onChange={(e:string) => setEditJourney({
                                            ...editJourney, title: e
                                        })}
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
                                    <Editable onChange={(e:string) => setEditJourney({
                                            ...editJourney, description: e
                                        })} defaultValue={journey.description} className='border-dotted border-2 border-sky-500 rounded-md'>
                                        <EditablePreview />
                                        <EditableTextarea />    
                                    </Editable>
                                    {/* </div> */}
                                    Cost:
                                    <Editable onChange={(e:string) => setEditJourney({
                                        ...editJourney, cost: parseInt(e)
                                        })} defaultValue={journey.cost.toString()} className='border-dotted border-2 border-sky-500 rounded-md'>
                                        <EditablePreview />
                                        <EditableTextarea />    
                                    </Editable>
                                    Distance:
                                    <Editable onChange={(e:string) => setEditJourney({
                                            ...editJourney, distance: e
                                        })} defaultValue={journey.distance} className='border-dotted border-2 border-sky-500 rounded-md'>
                                        <EditablePreview />
                                        <EditableTextarea />    
                                    </Editable>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button 
                                            colorScheme='blue' 
                                            mr={3} 
                                            onClick={() => saveChanges({...journey, 
                                                title : editJourney.title === "9ijku8ujhy67ygt5tfre4" ? journey.title:editJourney.title , 
                                                cost : editJourney.cost === -69 ? journey.cost:editJourney.cost,
                                                description : editJourney.description === "9ijku8ujhy67ygt5tfre4" ? journey.description:editJourney.description, 
                                                distance : editJourney.distance === "9ijku8ujhy67ygt5tfre4" ? journey.distance:editJourney.distance
                                            })}>
                                        Lagre og lukk
                                        </Button>
                                        <Button variant='ghost' onClick={onClose}>Avbryt</Button>
                                    </ModalFooter>
                                </ModalContent>
                        </Modal>
                    </CardBody>
                    <CardFooter alignContent={"center"}>
                        <Button onClick={onOpen}>Edit post</Button>
                        <Button onClick={() => deletePost(journey)}>Delete</Button>
                    </CardFooter>
                 </Card>
                )}
            </div>
            );} 


    return (
        <div className='w-full relative mt-36' >
            <div>
                <h1> {!newPostToggle? "Welcome back "+ currentUser?.firstname+ " " + currentUser?.lastname: ""}</h1>
            </div>
            <div className="relative">
                {CreateJourneyFunc()}
            </div>
            <div className="buttonProfilePage">
                <p> {currentUser ? 
                    <button
                    onClick={e => setNewPostToggle(!newPostToggle)}>
                        {!newPostToggle ? "Click here to create a new journey" : "Back"}
                    </button>
                    :
                    ''}</p>
            </div>
            {!newPostToggle && showJourneys()}
        </div>
    )
    }