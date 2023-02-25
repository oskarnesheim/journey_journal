import { Card, CardHeader, Heading, CardBody, Modal, ModalOverlay, ModalContent, ModalHeader, Editable, EditablePreview, EditableTextarea, ModalCloseButton, ModalBody, ModalFooter, Button, CardFooter, useDisclosure } from "@chakra-ui/react";
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database, getCollection } from "../firebase-config";
import { Ijourney } from "../interfaces/Interfaces";

type JourneyProps = {
    journey: Ijourney | undefined;
}

const JourneyPage = (props: JourneyProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure(); //? Modal
    const getJourneyRef = getCollection('journeys/');
    const [journey, setJourney] = useState<Ijourney | undefined>(props.journey);
    const navigate = useNavigate();


    useEffect(() => {
        if (!auth.currentUser) {
            navigate('/home');
            return;
        }
    }, []);


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
        try {
            await setDoc(doc(database, "journeys/", journeyToBeSaved.journeyID), journeyToBeSaved);
            navigate('/profile');
        } catch (error) {
            console.log(error)
        }
    }

    const deletePost = (journey:Ijourney) => {
        try {
            deleteDoc(doc(getJourneyRef, journey.journeyID));
            navigate('/profile');
        } catch (error) {
            console.log(error);
        }
    }

    const goToProfile = () => {
        navigate('/profile');
    }

    const [editJourney, setEditJourney] = useState<Ijourney>({
        title: "9ijku8ujhy67ygt5tfre4",
        distance: "9ijku8ujhy67ygt5tfre4",
        description: "9ijku8ujhy67ygt5tfre4",
        cost: -69,
        uid: "",
        journeyPath: [],
        journeyID: ""
        } as Ijourney); //? Editable journey

    
    return(
        <div>
            <h1>Title : {journey?.title}</h1>
            <p>Description : {journey?.description}</p>
            <p>Distance : {journey?.distance} km</p>
            <p>Cost : {journey?.cost} kr</p>

            <Modal blockScrollOnMount={false} size={"full"} closeOnEsc={true} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent>
                    <ModalHeader boxSize={"3xl"}>
                        Title:
                        <Editable boxSize={'-webkit-max-content'}  onChange={(e:string) => setEditJourney({
                            ...editJourney, title: e
                        })}
                            defaultValue={journey?.title} 
                            className='border-dotted border-2 border-sky-500 rounded-md'>
                            <EditablePreview />
                            <EditableTextarea minBlockSize={'24'} />    
                        </Editable>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody boxSize={"3xl"}>
                    Description:
                    {/* <div className="border-dotted border-2 border-sky-500 rounded-md w-full"> */}
                    <Editable onChange={(e:string) => setEditJourney({
                            ...editJourney, description: e
                        })} defaultValue={journey?.description} className='border-dotted border-2 border-sky-500 rounded-md'>
                        <EditablePreview />
                        <EditableTextarea />    
                    </Editable>
                    {/* </div> */}
                    Cost:
                    <Editable onChange={(e:string) => setEditJourney({
                        ...editJourney, cost: parseInt(e)
                        })} defaultValue={journey?.cost.toString()} className='border-dotted border-2 border-sky-500 rounded-md'>
                        <EditablePreview />
                        <EditableTextarea />    
                    </Editable>
                    Distance:
                    <Editable onChange={(e:string) => setEditJourney({
                            ...editJourney, distance: e
                        })} defaultValue={journey?.distance} className='border-dotted border-2 border-sky-500 rounded-md'>
                        <EditablePreview />
                        <EditableTextarea />    
                    </Editable>
                    </ModalBody>

                    <ModalFooter>
                        <Button 
                            colorScheme='blue' 
                            mr={3} 
                            onClick={() => saveChanges({...journey!, 
                                title : editJourney.title === "9ijku8ujhy67ygt5tfre4" ? journey?.title!:editJourney.title , 
                                cost : editJourney.cost === -69 ? journey?.cost!:editJourney.cost,
                                description : editJourney.description === "9ijku8ujhy67ygt5tfre4" ? journey?.description!:editJourney.description, 
                                distance : editJourney.distance === "9ijku8ujhy67ygt5tfre4" ? journey?.distance!:editJourney.distance
                            })}>
                        Lagre og gå oversikt
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Avbryt</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Button onClick={onOpen}>Edit post</Button>
            <Button onClick={() => deletePost(journey!)}>Delete</Button>
            <Button onClick={goToProfile}>To Profile</Button>
        </div>
    )
}

export default JourneyPage;