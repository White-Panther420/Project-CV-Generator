import "../Styles/Resume.css"


function Resume({experienceObjectList=[], personalDetailsObject=[], accentColor, contrastCOlor}){
    console.log("INSIDE RESUME COMPONENT")
    console.log(experienceObjectList)
    const headerStyle = {color: accentColor}
    const headerBgStyle = {backgroundColor: contrastCOlor === "white" ? "rgb(245, 245, 245)" : "black"}

    return (
        <div className="resume-wrapper white-background">
            <PersonalInfo
                accentColor = {accentColor}
                contrastCOlor={contrastCOlor}
                personalDetailsObject = {personalDetailsObject}
            />
            <div className="experiences-section-wrapper flex">
                <div style={headerBgStyle} className="section-header-div">
                    <h2 style={headerStyle} className="section-title">Education</h2>
                </div>
                {experienceObjectList.map(experienceObject => {
                    return(
                        <div key={experienceObject.id} className="details-wrapper flex">
                            {experienceObject["experience type"].toLocaleLowerCase() === "education" &&
                                experienceObject.visibility &&
                                <ExperienceInfo
                                    expObj = {experienceObject}
                                />
                            }
                        </div>
                )})}
                <div style={headerBgStyle} className="section-header-div">
                    <h2 style={headerStyle} className="section-title">Work Experience</h2>
                </div>
                {experienceObjectList.map(experienceObject => {
                    return(
                        <div key={experienceObject.id} className="details-wrapper flex">
                            {experienceObject["experience type"].toLocaleLowerCase() !== "education" &&
                                experienceObject.visibility &&
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

function PersonalInfo({personalDetailsObject=[], accentColor, contrastCOlor}){
    const bgColorStyle = {backgroundColor: accentColor}
    const constrastStyleText = {color: contrastCOlor}
    return(
        <div style={bgColorStyle} className="personal-info-header flex">
            <h1 style={constrastStyleText}>{personalDetailsObject["Full Name"]}</h1>
            <div className="contact-info-wrapper flex">
                {personalDetailsObject["Email"] !== "" && 
                <InfoContainer
                    infoType = {"email"}
                    infoValue = {personalDetailsObject["Email"]}
                    contrastCOlor = {contrastCOlor}
                />
                }
                {personalDetailsObject["Phone Number"] !== "" && 
                <InfoContainer
                    infoType = {"phone"}
                    infoValue = {personalDetailsObject["Phone Number"]}
                    contrastCOlor = {contrastCOlor}
                />
                }
                {personalDetailsObject["Location"] !== "" && 
                <InfoContainer
                    infoType = {"location"}
                    infoValue = {personalDetailsObject["Location"]}
                    contrastCOlor = {contrastCOlor}
                />
                }
            </div>
        </div>
    )
}

function InfoContainer({infoType, infoValue, contrastCOlor}){
    const constrastStyleText = {color: contrastCOlor}
    console.log("INFO TYPE: " + infoType)
    console.log(contrastCOlor)
    return(
        <div className="info-container flex">
            <img className="icon" src={`./public/${infoType}-${contrastCOlor}.svg`} alt={infoType}/>
            <p style={constrastStyleText} className="contact-info">{infoValue}</p>
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