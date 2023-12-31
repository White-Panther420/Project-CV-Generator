/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "../Styles/ResumeFields.css"
import uniqid from 'uniqid';

let experienceObjectList = [
  {
    School: "Glendale Community College",
    Degree: "Associates in Science",
    startDate: "08/21/2017",
    endDate: "05/14/2021",
    location: "Arizona, U.S.",
    Description: "",
    "experience name": "Glendale Community College",
    "experience type": "education"
  },
  {
    School: "Arizona State University",
    Degree: "Bachelors of Computer Science",
    startDate: "08/14/2021",
    endDate: "05/14/2024",
    location: "Arizona, U.S.",
    Description: "",
    "experience name": "Arizona State University",
    "experience type": "education"
  },
  {
    "Company Name": "Arizona State University",
    "Position Title": "CMEE Front Desk Receptionist",
    startDate: "09/01/2021",
    endDate: "04/14/2023",
    location: "Arizona, U.S.",
    description: "The tasks involved updating the content of web pages featuring lists of W. P. Carey events using HTML to provide accurate and timely information for students and community members. Additionally, a calling campaign and LinkedIn audits were conducted to gather undergraduate student employment outcomes, resulting in a notable increase of over 15% in responses from 2021 to 2022. Furthermore, I played a role in facilitating student check-ins for career advising appointments by effectively communicating with career coaches. These efforts aimed to enhance the overall experience and engagement for students within the academic and career services sphere.",
    "experience name": "Arizona State University",
    "experience type": "work experience"
  },
  {
    "Company Name": "Glendale Community College",
    "Position Title": "CSS Front Desk Receptionist",
    startDate: "10/15/2018",
    endDate: "01/15/2021",
    location: "Arizona, U.S.",
    description: "As a team member in the Career Services department from October 2018 to December 2020, I assisted over 20,000 students and community members with job-related activities, including the federal work-study process and resume and cover letter reviews. My role extended to promoting Career Services workshops and job fairs through marketing initiatives, event preparations, and onsite duties. I handled main phone line inquiries, greeted visitors professionally, and supported various office projects such as researching job trends and internships. Additionally, I contributed to data entry for weekly computer usage and department visits. Acting as a liaison, I reached out to student clubs to present career-related topics, and I organized bi-weekly tabling events to promote Career Services and encourage resource utilization among students.",
    "experience name": "Glendale Community College",
    "experience type": "work experience"
  }
]

function ResumeFields() {
  //This will hold all the different experiences (i.e. education, work, volunteer)
  return (
    <div className="fields-wrapper flex">
      <PersonalDetails />
      <ExperienceContainer title="Education"/>
      <ExperienceContainer title="Work Experience"/>
    </div>
  )
}

function PersonalDetails(){
    return <div className="personal-details-wrapper flex white-background rounded">
                <h2 className="form-header">Personal Details</h2>
                <form className="personal-details-form flex">
                    <label className='personal-details-form-frield' htmlFor="fullName">Full name</label>
                    <input id='fullName' type='text' placeholder='John Doe'></input>
                    <label className="personal-details-form-frield" htmlFor="email">Email <span className='recommended'>(recommended)</span></label>
                    <input id='email' type='email' placeholder='example@gmail.com'></input>
                    <label className="personal-details-form-frield" htmlFor="phone">Phone number <span className='recommended'>(recommended)</span></label>
                    <input id='phone' type='phone' placeholder='(555)-555-5555)'></input>
                    <label className="personal-details-form-frield" htmlFor="location">Location <span className='recommended'>(recommended)</span></label>
                    <input id='location' type='text' placeholder='Arizona, U.S.'></input>
                </form>
            </div>
}

function ExperienceContainer({title="education"}){
  //Indicates if the container pannel has been clicked
  const [isClicked, setIsClicked] = useState(false)
  //Indicates if the form is open 
  const [formIsActive, setFormIsActive] = useState(false)
  //Indicates if the current form is being used to add a new experience or edit a current experience
  const [addForm, setAddForm] = useState(false)
  // This state represents the current experience being edited and will hold the
  // value of the object tied to thhat experience so the form can render with the values
  const [currEditedExperience, setCurrEditedExperience] = useState(null)

  console.log("CURR EXP STATE")
  console.log(currEditedExperience)

  let fieldNameList = []
  switch (title.toLocaleLowerCase()) {
    case "education":
      fieldNameList = [
        {
          id: uniqid(),
          fieldName: "School",
          placeholder: "Enter school / university"
        },
        {
          id: uniqid(),
          fieldName: "Degree",
          placeholder: "Enter degree / filed of study"
        },
      ]
      break;
    case "work experience":
      fieldNameList = [
        {
          id: uniqid(),
          fieldName: "Company Name",
          placeholder: "Enter company name"
        },
        {
          id: uniqid(),
          fieldName: "Position Title",
          placeholder: "Enter position title"
        },
      ]
      break;
    default:
      break;
  }
  const handleClick = () => {
    setIsClicked(!isClicked)
  }
  const displayForm = () =>{
    console.log("CALLED")
    setFormIsActive(!formIsActive)
  }

  const headerIconSrc = `./public/${title.toLocaleLowerCase().split(" ").join("-")}-black.svg`

  console.log(`${isClicked}, ${formIsActive}, ${addForm}`)
  console.log(experienceObjectList)
  return (
      <div className="experience-container-wrapper">
          <div className="experience-header-div flex white-background">
            <div className="header-wrapper flex" onClick={handleClick}>
              <div className="left-side-wrapper flex">
                <img className="largerIcon" src={headerIconSrc} alt="" />
                <h2>{title}</h2>
              </div>
              <img className="icon dropdown" src="./public/dropdown-black.svg" alt="dropdown" />
            </div>
            {(isClicked && formIsActive) &&
             <Form 
              listOfFields={fieldNameList} 
              experienceType={title} 
              currEditedExperience = {currEditedExperience}
              currFormState={addForm} 
              onHideForm = {() => setFormIsActive(false)}>
             </Form>
            }
          </div>
          {((isClicked && !formIsActive) && (
            <>
              {experienceObjectList.map(experienceObject => {
                console.log(experienceObject)
                return(
                  experienceObject["experience name"] !== "" && 
                  experienceObject["experience type"].toLocaleLowerCase() == title.toLocaleLowerCase() &&  
                  <ExperienceCard 
                    key={experienceObject.id} 
                    experienceName={experienceObject["experience name"]} 
                    showEditForm={() => { 
                      setFormIsActive(true), 
                      setAddForm(false),
                      setCurrEditedExperience(experienceObject)
                    }}>
                  </ExperienceCard>
                )
              })}
              <div className="add-container flex white-background">
                <button className="display-resume-button add-button rounded flex" onClick={() =>{displayForm(); setAddForm(true);}}>
                  <img className="icon" src="./public/add-black.svg" alt="plus" />
                  <p>{title}</p>
                </button>
              </div>
            </>
          ))}            
      </div>
  )
}

function ExperienceCard({experienceName="", showEditForm}){
  const [isVisible, setIsVisible] = useState(true)

  const changeExperienceVisibility = (event) =>{
    event.stopPropagation()
    setIsVisible(!isVisible);
  }

  const displayEditForm = () =>{
    showEditForm()
  }

  const iconSrc = isVisible ? "./public/visible-black.svg" : "./public/hidden-black.svg"

  return (
      <div className="experience-card flex white-background" onClick={displayEditForm}>
        <p className="experience-p">{experienceName}</p>
        <img className="largerIcon eye" src={iconSrc} alt="" onClick={changeExperienceVisibility} />
      </div>
  )
}

function Form({listOfFields="", onHideForm, experienceType, currEditedExperience, currFormState}){
  const field1 = listOfFields[0].fieldName
  const field2 = listOfFields[1].fieldName
  const [fields, setFields] = useState({
    [field1]: currFormState ? "" : (currEditedExperience ? currEditedExperience[field1] : ""),
    [field2]: currFormState ? "" : (currEditedExperience ? currEditedExperience[field2] : ""),
    startDate: currFormState ? "" : (currEditedExperience ? currEditedExperience.startDate : ""),
    endDate: currFormState ? "" : (currEditedExperience ? currEditedExperience.endDate : ""),
    location: currFormState ? "" : (currEditedExperience ? currEditedExperience.location : ""),
    description: currFormState ? "" : (currEditedExperience ? currEditedExperience.description : ""),
  })

  const hideForm = () => {
    onHideForm()
  }

  //Adds new experience to list of experienceObjects when form is submitted
  const createNewExperienceObject = (e) =>{
    console.log("CURR FORM STATE")
    console.log(currFormState)
    // copying fields object so we can add a generic property
    const experienceObject = fields
    experienceObject["experience name"] = experienceObject.School || experienceObject["Company Name"]
    experienceObject["experience type"] = experienceType
    if(currFormState){
      experienceObjectList.push(experienceObject)
      console.log("FIELDDSSSS")
      console.log(fields)
    }else{
      for (const key in experienceObjectList) {
        if (Object.hasOwnProperty.call(experienceObjectList, key)) {
          console.log("FIELDS")
          console.log(fields)
          let expObj = experienceObjectList[key];
          // Avoid looking up an experience with the same name but different experience type
          if(currEditedExperience["experience type"].toLocaleLowerCase() === expObj["experience type"].toLocaleLowerCase()){
            if(currEditedExperience["experience name"] === expObj["experience name"]){
              experienceObjectList[key] = {...experienceObject}
              console.log("UPDATED!")
              console.log(experienceObjectList)
            }
          }
        }
      }
    }

    hideForm()
    e.preventDefault()

  }

  const deleteExperienceObject = () => {

  }

  return (
    <div className="form-wrapper flex">
      <form onSubmit={createNewExperienceObject}>
        {listOfFields.map((field) =>{
          return(
          <div key={field.id} className="field-wrapper flex">
            <label className="form-field-label" htmlFor={field.fieldName}>{field.fieldName}</label>
            <input 
              value={fields[field.fieldName]} 
              id={field.fieldName} type='text' 
              placeholder={field.placeholder} 
              onChange={(event)=> setFields({...fields, [field.fieldName]: event.target.value})}>
            </input>
          </div>
          )
        })}
        <div className="date-wrapper flex">
          <div className="field-wrapper flex">
              <label className="form-field-label" htmlFor="start-date">Start Date</label>
              <input 
                value={fields.startDate} 
                id="start-date" 
                type='text' 
                placeholder="Enter start date" 
                onChange={(event)=> setFields({...fields, startDate: event.target.value})}
              />
            </div>    
          <div className="field-wrapper flex">
              <label className="form-field-label" htmlFor="end-date">End Date</label>
              <input 
                value={fields.endDate} 
                id="end-date" 
                type='text' 
                placeholder="Enter end date" 
                onChange={(event)=> setFields({...fields, endDate: event.target.value})}
              />
          </div>
        </div>
        <div className="field-wrapper flex">
            <label className="form-field-label" htmlFor="location">Location</label>
            <input 
              value={fields.location} 
              id="location" 
              type='text' 
              placeholder="Arizona, U.S." 
              onChange={(event)=> setFields({...fields, location: event.target.value})}
            />
        </div>
          {listOfFields[0].fieldName === "Company Name" &&(
            <div className="field-wrapper flex">
              <label className="form-field-label" htmlFor="description">Company Description</label>
              <textarea 
                value={fields.description || ""} 
                id="description" 
                placeholder="Enter a descriptio of experience" 
                onChange={(event)=> setFields({...fields, description: event.target.value})}
              />
            </div>
          )}
        <div className="form-action-buttons-container flex">
          <button className="delete-resume-button delete-form-button flex rounded">
            <img className='icon' src="./public/delete-red.svg" alt="" />
            <p className="delete" onClick={deleteExperienceObject}>Delete</p>
          </button>
          <div className="delete-and-save-div flex">
              <button className="display-resume-button cancelBtn" onClick={hideForm}>Cancel</button>
              <button className="display-resume-button saveBtn" type="submit">Save</button>
          </div>
        </div>
      </form>
     
    </div>
  )
}


export default ResumeFields
