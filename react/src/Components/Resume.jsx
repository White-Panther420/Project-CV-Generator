import "../Styles/Resume.css"


function Resume({experienceObjectList=[], personalDetailsObject=[]}){
    return (
        <div className="resume-wrapper white-background">
            <PersonalInfo
                personalDetailsObject = {personalDetailsObject}
            />
            <div className="experiences-section-wrapper flex">
                <div className="section-header-div">
                    <h2 className="section-title">Education</h2>
                </div>
                {experienceObjectList.map(experienceObject => {
                    return(
                        <div key={experienceObject.id} className="details-wrapper flex">
                            {experienceObject["experience type"].toLocaleLowerCase() === "education" &&
                                experienceObject.visbility === true &&
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
                                experienceObject.visbility === true &&
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

function PersonalInfo({personalDetailsObject=[]}){
    return(
        <div className="personal-info-header flex">
            <h1>{personalDetailsObject["Full Name"]}</h1>
            <div className="contact-info-wrapper flex">
                {personalDetailsObject["Email"] !== "" && 
                <InfoContainer
                    infoType = {"email"}
                    infoValue = {personalDetailsObject["Email"]}
                />
                }
                {personalDetailsObject["Phone Number"] !== "" && 
                <InfoContainer
                    infoType = {"phone"}
                    infoValue = {personalDetailsObject["Phone Number"]}
                />
                }
                {personalDetailsObject["Location"] !== "" && 
                <InfoContainer
                    infoType = {"location"}
                    infoValue = {personalDetailsObject["Location"]}
                />
                }
            </div>
        </div>
    )
}

function InfoContainer({infoType, infoValue}){
    console.log("INFO TYPE: " + infoType)
    return(
        <div className="info-container flex">
            <img className="icon" src={`./public/${infoType}-black.svg`} alt={infoType}/>
            <p className="contact-info">{infoValue}</p>
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