import "../Styles/Resume.css"


function Resume(experienceObjectList=[]){
    return (
        <div className="resume-wrapper white-background">
            <PersonalInfo/>
            <div className="experiences-section-wrapper flex">
                <div className="section-header-div">
                    <h2>Education</h2>
                </div>
                <ExperienceInfo/>
                <div className="section-header-div">
                    <h2>Professional Experience</h2>
                </div>
                <ExperienceInfo/>
                <div className="section-header-div">
                    <h2>Volunteer Experience</h2>
                </div>
                <ExperienceInfo/>
            </div>
        </div>
    )
}

function PersonalInfo(){
    return(
        <div className="personal-info-header flex">
            <h1>Header</h1>
            <div className="contact-info-wrapper flex">
                <div className="info-container flex">
                    <img className="icon" src="./public/email-black.svg" alt="email" />
                    <p className="contact-info">Lorem ipsum</p>
                </div>
                <div className="info-container flex">
                    <img src="./public/phone-black.svg" alt="phone" className="icon" />
                    <p className="contact-info">Lorem ipsum</p>
                </div>
                <div className="info-container flex">
                    <img src="./public/location-black.svg" alt="location" className="icon" />
                    <p className="contact-info">Lorem ipsum</p>
                </div>
            </div>
        </div>
    )
}

function ExperienceInfo(){
    return(
        <div className="experience-wrapper grid">
            <div className="date-and-location-wrapper">
                <p className="date-info">Lorem ipsum</p>
                <p className="location-info">Lorem ipsum</p>
            </div>
            <div className="experience-details-wrapper">
                <p className="experience-name">Lorem ipsum</p>
                <p className="experience-position">Lorem ipsum</p>
                <p className="experience-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                </p>
            </div>
        </div>
    )
}

export{
    Resume
}