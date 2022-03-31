import Nav from "../components/Nav"

const Home = () => {
    
    const authToken = false //building with dummy authToken, change true/false affect button text/functionality?
    
    const handleClick = () => {
        console.log("You've clicked")
    }
    return (
        <div className="overlay">
            {/* WEB API dynamic size rendering*/}
        <Nav mobile={false} authToken={authToken}/>
        <div className="home">
            <h1>Tag Line Here</h1>
            <button className="primaryBtn" onClick={handleClick}>
                {authToken ? 'Log Out' : 'Create Account'} {/* if user is logged in render logout button, else render Create Account button*/}
            </button>
            
        </div>
        </div>
    ) 
}

export default Home