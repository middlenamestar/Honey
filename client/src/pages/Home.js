import Nav from "../components/Nav"

const Home = () => {
    
    const authToken = true //building with assumption we are logged in, change true/false affect button text/functionality?
    
    const handleClick = () => {
        console.log("You've clicked")
    }
    return (
        <>
        <Nav/>
        <div className="home">
            <h1>Tag Line Here</h1>
            <button className="primary-button" onClick={handleClick}>
                {authToken ? 'Log Out' : 'Create Account'} {/* if user is logged in render logout button, else render Create Account button*/}
            </button>
            
        </div>
        </>
    ) 
}

export default Home