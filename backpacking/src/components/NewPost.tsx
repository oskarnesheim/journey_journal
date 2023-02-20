import { FormControl, FormLabel, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormHelperText, Button } from "@chakra-ui/react";

const NewPost = ({...user} as Iuser) => {

    
    return(<FormControl>
        <FormLabel>Firstname</FormLabel>
            <Input type='email' value={user.firstname} onChange={(e) => setUser(
                {...user, firstname: e.target.value})}/>


        <FormLabel>Lastname</FormLabel>
            <Input type='email' value={user.lastname} onChange={(e) => setUser(
        {...user, lastname: e.target.value})}/>


        <FormLabel>Username</FormLabel>
            <Input type='email' value={user.username} onChange={(e) => setUser(
                {...user, username: e.target.value})}/>


        <FormLabel>Email address</FormLabel>
            <Input type='email' value={user.email} onChange={(e) => setUser(
                {...user, email: e.target.value})}/>
        <br />
        <br />
        
        <p>Age</p>
        <NumberInput defaultValue={0} min={16} max={169} onChange={(e) => setUser(
        {...user, age: parseInt(e)})}>
            <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        <FormHelperText>You must be over 15 to join</FormHelperText>
        </NumberInput >

        <FormLabel>Password</FormLabel>
            <Input type='password' value={user.password} onChange={(e) => setUser(
                {...user, password: e.target.value})}/>
        <FormHelperText><b> We'll never share your password or email</b></FormHelperText>
        <br />
        <Button colorScheme='teal' variant='outline' onClick={addUser}>
            Create
        </Button>
    </FormControl>
    )
}

export default NewPost;