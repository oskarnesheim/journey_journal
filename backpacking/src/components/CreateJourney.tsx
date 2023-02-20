import { FormControl, FormLabel, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormHelperText, Button } from "@chakra-ui/react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { setDoc, doc, GeoPoint, Firestore } from "firebase/firestore";
import { useState } from "react";
import { database, auth, firestoreAutoId } from "../firebase-config";
import { Ijourney } from "../interfaces/Interfaces";
import "css/components.css";




const CreateJourney = () =>{
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
        const newJourneyPost: Ijourney = {
            title: journeyForm.title,
            distance: journeyForm.distance,
            description: journeyForm.description,
            cost: journeyForm.cost,
            uid: auth.currentUser?.uid!,
            journeyPath: [],
            journeyID: firestoreAutoId(),
        }
        setDoc(doc(database, 'journeys/' ,journeyForm.title), newJourneyPost)
        setJourneyForm({
        title: "",
        distance: "",
        description: "",
        cost: 0,
        uid: "",
        journeyPath: [],
        journeyID: ""} as Ijourney)

    }
    return(
        <div>
        <FormControl>
            <FormLabel colorScheme='#454545'>Trip name</FormLabel>
                <Input placeholder = 'Trip name' type='text' value={journeyForm.title} onChange={(e) => setJourneyForm(
                    {...journeyForm, title: e.target.value})}/>


            {/* <FormLabel colorScheme='#454545'>Place of start</FormLabel>
                <Input placeholder = 'Startpoint' type='email' value={journey.startPlace} onChange={(e) => setPost(
            {...journey, startPlace: e.target.value})}/> */}


            {/* <FormLabel colorScheme='#454545'>Place of end</FormLabel>
                <Input placeholder = 'Endpoint' type='email' value={post.finishplace} onChange={(e) => setPost(
                    {...post, finishplace: e.target.value})}/> */}

            <br />
            
            <FormLabel colorScheme='pink'>Cost</FormLabel>
                <Input placeholder = 'Cost' type='number' value={journeyForm.cost} onChange={(e) => setJourneyForm(
                    {...journeyForm, cost: parseInt(e.target.value)})}/>
            <br />
            <FormLabel colorScheme='pink'>Distance in km</FormLabel>
                <Input placeholder = 'how far?' type='number' value={journeyForm.distance} onChange={(e) => setJourneyForm(
                    {...journeyForm, distance: e.target.value})}/>
            <br />
            <br />
            <FormLabel colorScheme='#454545'> Tell about your trip!</FormLabel>
                <Input placeholder = 'Write all your fun experiences!' type='text' value={journeyForm.description} onChange={(e) => setJourneyForm(
                    {...journeyForm, description: e.target.value})}/>
            <br />
            <br />
            <Button colorScheme='#454545' background= '#C9EFC7' variant='outline' onClick={addJourney}>
                Post
            </Button>
        </FormControl>
    </div>

    )
  }

  export default CreateJourney;