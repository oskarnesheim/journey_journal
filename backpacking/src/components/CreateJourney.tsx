import { FormControl, FormLabel, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormHelperText, Button } from "@chakra-ui/react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { setDoc, doc, GeoPoint, Firestore } from "firebase/firestore";
import { useState } from "react";
import { database, auth, firestoreAutoId, getUserProfile } from "../firebase-config";
import { Ijourney } from "../interfaces/Interfaces";



const CreateJourney = () =>{
    const user = getAuth().currentUser;
    const userProfile = getUserProfile(user?.uid!);
    // console.log(userProfile + "userprofile")
    const [journey, setJourney] = useState<Ijourney>({
        title: "",
        distance: "",
        cost: 0,
        userID: "",
        journeyPath: [],
        description: ""
    })

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
        // setJourney({...journey, userID : "1232"})
        setDoc(doc(database, 'journeys/' ,firestoreAutoId()), journey)
        setJourney({
        title: "",
        distance: "",
        description: "",
        cost: 0,
        userID: "",
        journeyPath: [],} as Ijourney)

    }
    return(
        <div>
        <FormControl>
            <FormLabel colorScheme='#454545'>Trip name</FormLabel>
                <Input placeholder = 'Trip name' type='text' value={journey.title} onChange={(e) => setJourney(
                    {...journey, title: e.target.value})}/>


            {/* <FormLabel colorScheme='#454545'>Place of start</FormLabel>
                <Input placeholder = 'Startpoint' type='email' value={journey.startPlace} onChange={(e) => setPost(
            {...journey, startPlace: e.target.value})}/> */}


            {/* <FormLabel colorScheme='#454545'>Place of end</FormLabel>
                <Input placeholder = 'Endpoint' type='email' value={post.finishplace} onChange={(e) => setPost(
                    {...post, finishplace: e.target.value})}/> */}

            <br />
            
            <FormLabel colorScheme='pink'>Cost</FormLabel>
                <Input placeholder = 'Cost' type='number' value={journey.cost} onChange={(e) => setJourney(
                    {...journey, cost: parseInt(e.target.value)})}/>
            <br />
            <FormLabel colorScheme='pink'>Distance in km</FormLabel>
                <Input placeholder = 'how far?' type='number' value={journey.distance} onChange={(e) => setJourney(
                    {...journey, distance: e.target.value})}/>
            <br />
            <br />
            <FormLabel colorScheme='#454545'> Tell about your trip!</FormLabel>
                <Input placeholder = 'Write all your fun experiences!' type='text' value={journey.description} onChange={(e) => setJourney(
                    {...journey, description: e.target.value})}/>
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