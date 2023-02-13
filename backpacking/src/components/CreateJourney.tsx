import { FormControl, FormLabel, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormHelperText, Button } from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { database, auth, firestoreAutoId } from "../firebase-config";
import { Ijourney } from "../interfaces/Interfaces";



const CreateJourney = () =>{

    const [journey, setJourney] = useState<Ijourney>({
        distance: "",
        cost: 0,
        userID: "",
        journeyPath: [],
        description: ""
    })
        
        
    const addJourney = ():void => {
        setDoc(doc(database, 'journeys/' ,firestoreAutoId()), journey)
        setJourney({distance: "",
        description: "",
        cost: 0,
        userID: "",
        journeyPath: [],} as Ijourney)

    }

    // const createJourney = async () => {
    //     const distanse = journey.distanse;
    //     const kostnad = journey.kostnad;
    //     const userID = journey.userID;
    //     const journeyPath = journey.journeyPath;
    // }
    return(
      <FormControl>
                <FormLabel>Distance in km</FormLabel>
                    <Input type='text' value={journey.distanse} onChange={(e) => setJourney(
                        {...journey, distanse: e.target.value})}/>


                <FormLabel>Cost in NOK</FormLabel>
                    <Input type='number' value={journey.kostnad} onChange={e => setJourney(
                      {...journey, kostnad : parseInt(e.target.value)}
                    )}/>


                <FormLabel>Who traveled</FormLabel>
                <Input type='text' value={journey.userID} onChange={e => setJourney(
                      {...journey, userID : e.target.value}
                      )}/>

                <FormLabel>Where did you travel</FormLabel>
                <Input type='text' value={journey.journeyPath} onChange={e => setJourney(
                      {...journey, journeyPath : e.target.value}
                      )}/>


                <Button colorScheme='teal' variant='outline' onClick={}>
                    Create Journey
                </Button>
            </FormControl>
    )

  }