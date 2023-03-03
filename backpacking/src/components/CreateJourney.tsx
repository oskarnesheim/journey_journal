import { FormControl, FormLabel, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormHelperText, Button } from "@chakra-ui/react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { setDoc, doc, GeoPoint, Firestore } from "firebase/firestore";
import { useState } from "react";
import SelectedCountries from "../custom-hooks/SelectedCountries";
import Countries from "../custom-hooks/SelectedCountries";
import { database, auth, firestoreAutoId } from "../firebase-config";
import { Ijourney } from "../interfaces/Interfaces";
import "./css/components.css";


type CreateJourneyProps = {
    setRefreshPosts: React.Dispatch<React.SetStateAction<boolean>>;
    refreshPosts: boolean;
}

const CreateJourney = (props: CreateJourneyProps) =>{
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [journeyForm, setJourneyForm] = useState<Ijourney>({
        title: "",
        distance: "",
        cost: 0,
        uid: "",
        journeyPath: [],
        description: "",
        journeyID: "",
    })

    //todo add journey path. 
    const showPath = (journey:Ijourney) => {
        return(
            <div>
                {journey.journeyPath.map((path) => 
                    {
                        return <li>{path.longitude},{path.latitude}</li>;
                    } 
                )}
            </div>
        )
    }
        
        
    const addJourney = ():void => {
        try {    
        const newJourneyPost: Ijourney = {
            title: journeyForm.title,
            distance: journeyForm.distance,
            description: journeyForm.description,
            cost: journeyForm.cost,
            uid: auth.currentUser?.uid!,
            journeyPath: [],
            journeyID: firestoreAutoId(),
        }
        setDoc(doc(database, 'journeys/' ,newJourneyPost.journeyID), newJourneyPost)
        setJourneyForm({
            title: "",
            distance: "",
            description: "",
            cost: 0,
            uid: "",
            journeyPath: [],
            journeyID: ""} as Ijourney)
            setStatusMessage("You have successfully posted a journey\n You can check it out under profile");
            props.setRefreshPosts(!props.refreshPosts);
        } catch (error) {
            setStatusMessage("Something went wrong, please try again");
        }
    }
    
    return(
        <FormControl>
            {statusMessage}
            <FormLabel colorScheme='#454545' marginLeft={'160'}>Trip name</FormLabel>
                <Input placeholder = 'Trip name' type='text' width = '80%' value={journeyForm.title} onChange={(e) => setJourneyForm(
                    {...journeyForm, title: e.target.value})}/>
            <br />
            <br />
            <FormLabel colorScheme='pink' marginLeft={'160'}>Cost in kr</FormLabel>
                <Input placeholder = 'Cost' type='number' width = '80%' value={journeyForm.cost} onChange={(e) => setJourneyForm(
                    {...journeyForm, cost: parseInt(e.target.value)})}/>
            <br />
            <br />
            <FormLabel colorScheme='pink' marginLeft={'160'}>Distance in km</FormLabel>
                <Input placeholder = 'How far?' type='number' width = '80%' value={journeyForm.distance} onChange={(e) => setJourneyForm(
                    {...journeyForm, distance: e.target.value})}/>
            <br />
            <br />
            <FormLabel colorScheme='#454545' marginLeft={'160'}> Tell about your trip!</FormLabel>
                <Input placeholder = 'Write about all your fun experiences!' type='text' width = '80%' value={journeyForm.description} onChange={(e) => setJourneyForm(
                    {...journeyForm, description: e.target.value})}/>
            <br />
            <br />

            <FormLabel> Select your countries </FormLabel>
            <SelectedCountries/>    
            <Button colorScheme='#454545' background= '#C9EFC7' variant='outline' onClick={addJourney}>
                Post
            </Button>
        </FormControl>
    )
  }

  export default CreateJourney;