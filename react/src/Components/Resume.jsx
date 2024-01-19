import "../Styles/Resume.css"


function Resume({experienceObjectList=[]}){
    return (
        <div className="resume-wrapper white-background">
            <PersonalInfo/>
            <div className="experiences-section-wrapper flex">
                <div className="section-header-div">
                    <h2 className="section-title">Education</h2>
                </div>
                {experienceObjectList.map(experienceObject => {
                    return(
                        <div key={experienceObject.id} className="details-wrapper flex">
                            {experienceObject["experience type"].toLocaleLowerCase() === "education" &&
                                <ExperienceInfo
                                    expObj = {experienceObject}
                                />
                            }
                        </div>
                )})}
                <div className="section-header-div">
                    <h2 className="section-title">Work Experience</h2>
                </div>
                {experienceObjectList.map(experienceObject => {
                    return(
                        <div key={experienceObject.id} className="details-wrapper flex">
                            {experienceObject["experience type"].toLocaleLowerCase() !== "education" &&
                                <ExperienceInfo
                                    expObj = {experienceObject}
                                />
                            }
                        </div>
                )})}            
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

function ExperienceInfo({expObj=[]}){
    return(
        <div className="experience-wrapper grid">
            <div className="date-and-location-wrapper">
                <p className="date-info">{expObj["startDate"]} - {expObj["endDate"]}</p>
                <p className="location-info">{expObj.location}</p>
            </div>
            <div className="experience-details-wrapper">
                <p className="experience-name">{expObj["experience name"]}</p>
                {expObj["experience type"].toLocaleLowerCase() !== "education" &&  
                <div className="position-and-desc-wrapper">
                    <p className="experience-position">{expObj["Position Title"]}</p>
                    <p className="experience-description">{expObj.description}</p>                        
                </div>
                }
                <p className="experience-position">{expObj["Degree"]}</p>   
            </div>
        </div>
    )
}

export{
    Resume
}