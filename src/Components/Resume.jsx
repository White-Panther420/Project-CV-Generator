import "../Styles/Resume.css"


function Resume({experienceObjectList=[], personalDetailsObject=[], accentColor, contrastCOlor, layout, fontType}){
    const headerStyle = {color: accentColor}
    const headerBgStyle = {backgroundColor: contrastCOlor === "white" ? "rgb(245, 245, 245)" : "black"}
    
    let resumeStyle;
    let personalDetailsHeaderStyle;
    let contactInfoWrapperStyle;
    let gridAreaStyle
    let experienceGridStyle
    switch (layout) {
        case "top":
            //Use default style
            experienceGridStyle = {
                gridTemplateColumns: "30% 1fr",
                gap: "30px"
            }
            break;
        
        case "left":
            resumeStyle = {
                display: "grid",
                gridTemplateColumns: "325px 1fr",
            }
            personalDetailsHeaderStyle = {
                justifyContent: "start",
                alignItems: "start",
                padding: "30px",
                marginBottom: "0"
            }
            contactInfoWrapperStyle = {
                flexDirection: "column",
                gap: "10px",
                marginLeft: "20px",
                marginTop: "5px"
            }
            experienceGridStyle = {
                gridTemplateColumns: "50% 1fr",
                gap: "10px"
            }
            gridAreaStyle = {
                padding: "0 30px",
                justifyContent: "start"
            }
            break

        case "right":
            resumeStyle = {
                display: "grid",
                gridTemplateColumns: "1fr 325px",
                //To reverse the columns
                gridTemplateAreas: '"main sidebar"',
                gap: "20px"
            }
            personalDetailsHeaderStyle = {
                justifyContent: "start",
                alignItems: "start",
                padding: "30px",
                marginBottom: "0",
                gridArea: "sidebar"
            }
            gridAreaStyle = {
                gridArea: "main",
                padding: "0 30px",
                justifyContent: "start"
            }
            contactInfoWrapperStyle = {
                flexDirection: "column",
                gap: "10px",
                marginLeft: "20px",
                marginTop: "5px"
            }
            experienceGridStyle = {
                gridTemplateColumns: "50% 1fr",
                gap: "10px"
            }
            break

        default:
            break;
    }

    let fontStyle
    switch (fontType) {
        case "serif":
            fontStyle = {
                fontFamily: "serif"
            }
            break;
        case "sans":
            fontStyle = {
                fontFamily: "sans-serif"
            }
            break;
        case "mono":
            fontStyle = {
                fontFamily: "monospace"
            }
            break;
        default:
            break;
    }

    resumeStyle = {...resumeStyle, ...fontStyle}

    return (
        <div style={resumeStyle} className="resume-wrapper white-background">
            <PersonalInfo
                headerStyle = {personalDetailsHeaderStyle}
                contactInfoWrapperStyle = {contactInfoWrapperStyle}
                accentColor = {accentColor}
                contrastCOlor={contrastCOlor}
                layout = {layout}
                personalDetailsObject = {personalDetailsObject}
            />
            <div style={gridAreaStyle} className="experiences-section-wrapper flex">
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
                                    expGridStyle = {experienceGridStyle}
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
                                    expGridStyle = {experienceGridStyle}
                                />
                            }
                        </div>
                )})}            
            </div>
        </div>
    )
}

function PersonalInfo({personalDetailsObject=[], accentColor, contrastCOlor, layout, headerStyle, contactInfoWrapperStyle}){
    const constrastStyleText = {color: contrastCOlor}
    const newHeaderStyle = {...headerStyle, backgroundColor: accentColor}

    return(
        <div style={newHeaderStyle}  className="personal-info-header flex">
            <h1 style={constrastStyleText}>{personalDetailsObject["Full Name"]}</h1>
            <div style={contactInfoWrapperStyle} className="contact-info-wrapper flex">
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
    return(
        <div className="info-container flex">
            <img className="icon" src={`./public/${infoType}-${contrastCOlor}.svg`} alt={infoType}/>
            <p style={constrastStyleText} className="contact-info">{infoValue}</p>
        </div>
    )
}

function ExperienceInfo({expObj=[], expGridStyle}){
    return(
        <div style={expGridStyle} className="experience-wrapper grid">
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
