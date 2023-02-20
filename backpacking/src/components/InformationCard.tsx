import '../index.css'
import "./css/components.css";

const InformationCard = () => {
    return(
        <div className='aboutbackground'>
            <div className='aboutheader'>
                <img src='../images/aboutheader.jpg' className='backgroundimg' />
                <h1 className= 'backgroundimgtitle'>About us</h1>
            </div>
            <h2 className='aboutsub'>Background</h2>
            <p> Journey Journal is a newly started platform for people who are interested in backpacking, and was created in the spring of 2023, ready for the upcoming backpacking season!
                Members of the team are passionate about travel, and backpacking in particular.
                At our website, you can find posts from other users about travel routes they have been on, and read about their experience.
                You can also share your own travels to help and inspire others!</p>
            <h2 className='aboutsub'>Vision</h2>
            <p>Our vision is to expand the backpacking community and spread inspiration and motivation among backpackers! 
                We wanted to build this platform to inspire future backpackers, 
                and make it easier for you to plan your upcoming trips!
                We feel that such a platform is something the community has been lacking, 
                where you can easily connect with other backpackers, and find important information and tips about trips.
                Reading other people's reviews of a trip can help you to stay safe, plan better, and discover hidden gems.</p>
            <h2 className='aboutsub'>Contact</h2>
            <p>Email: contact@journeyjournal.com</p>
            <p>Phone: +47 123 45 678</p>
        </div>
    )
    
}

export default InformationCard;