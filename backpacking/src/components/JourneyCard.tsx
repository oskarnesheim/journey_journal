import { Card, CardHeader, Heading, CardBody, CardFooter, Button } from "@chakra-ui/react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { auth } from "../firebase-config";
import { Ijourney } from "../interfaces/Interfaces";
import JourneyPage from "../pages/JourneyPage";
import { JourneyState } from "../recoil/atoms";

type JourneyCardProps = {
    journey: Ijourney;
}

const JourneyCard = (props : JourneyCardProps) => {
    const navigate = useNavigate();
    const [editJourney, setEditJourney] = useRecoilState(JourneyState);

    const showJourneyPage = () => {
        setEditJourney(props.journey)
        navigate('/journey');
    }
    
    return (
        <Card paddingBottom={4} margin={10} boxShadow={"2xl"} >
          <CardHeader >
            <Heading size='md'> {props.journey.title}</Heading>
          </CardHeader>
          <CardBody>
            <p>Description : {props.journey.description}</p>
            <p>Distance : {props.journey.distance}</p>
            <p>Cost : {props.journey.cost}</p>
          </CardBody>
          <CardFooter>
            {auth.currentUser?.uid === props.journey.uid ? <Button onClick={showJourneyPage}>View journey</Button> : <p>Cannot edit</p>}
          </CardFooter>
        </Card>
    )
}

export default JourneyCard;