/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "../Styles/ResumeFields.css"
import uniqid from 'uniqid';



function ResumeFields({experienceObjectList=[], updateExpObjList}) {
  //This will hold all the different experiences (i.e. education, work, volunteer)
  return (
    <div className="fields-wrapper flex">
      <PersonalDetails />
      <ExperienceContainer 
        title="Education"
        experienceObjectList={experienceObjectList}
        updateExpObjList={updateExpObjList}
      />
      <ExperienceContainer 
        title="Work Experience"
        experienceObjectList={experienceObjectList}
        updateExpObjList={updateExpObjList}
      />
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

function ExperienceContainer({title="education", experienceObjectList=[], updateExpObjList}){
  //Indicates if the container pannel has been clicked
  const [isClicked, setIsClicked] = useState(false)
  //Indicates if the form is open 
  const [formIsActive, setFormIsActive] = useState(false)
  //Indicates if the current form is being used to add a new experience or edit a current experience
  const [addForm, setAddForm] = useState(false)
  // This state represents the current experience being edited and will hold the
  // value of the object tied to that experience so the form can render with the values
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
  const updateCurrEditedExpProperty = (propertyName, propertyValue) =>{
    setCurrEditedExperience({...currEditedExperience, [propertyName]: propertyValue})
  }


  const headerIconSrc = `./public/${title.toLocaleLowerCase().split(" ").join("-")}-black.svg`

  console.log(`${isClicked}, ${formIsActive}, ${addForm}`)
  console.log("WHY ARE WE HERE?")
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
                setCurrEditExp={updateCurrEditedExpProperty}
                currFormState={addForm} 
                updateExpObjList={updateExpObjList}
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

function Form({listOfFields="", onHideForm, currEditedExperience, setCurrEditExp, currFormState, updateExpObjList}){
  console.log("JUST TO SUFFER??")
  console.log(currEditedExperience)
  const [inputFields, setInputFields] = useState(currEditedExperience)


  const hideForm = () => {
    onHideForm()
  }

  //Adds new experience to list of experienceObjects when form is submitted
  const createNewExperienceObject = (e) =>{


    hideForm()
    e.preventDefault()

  }

  const deleteExperienceObject = () => {

  }
  console.log("FORM STUFF")
  console.log(updateExpObjList)
  console.log(currEditedExperience)
  return (
    <div className="form-wrapper flex">
      <form onSubmit={createNewExperienceObject}>
        {listOfFields.map((field) =>{
          return(
          <div key={field.id} className="field-wrapper flex">
            <label className="form-field-label" htmlFor={field.fieldName}>{field.fieldName}</label>
            <input 
            //Check if we are adding a new experience or if we are editing one from a valid object
              value={currFormState ? "" : inputFields[field.fieldName]}
              id={field.fieldName} type='text' 
              placeholder={field.placeholder} 
              onChange={(event)=> {
                setInputFields({...inputFields, [field.fieldName]: event.target.value})
                updateExpObjList(field.fieldName, event.target.value, currEditedExperience)
              }}
            >
            </input>
          </div>
          )
        })}
        <div className="date-wrapper flex">
          <div className="field-wrapper flex">
              <label className="form-field-label" htmlFor="start-date">Start Date</label>
              <input 
              value={currFormState ? "" : (currEditedExperience ? currEditedExperience.startDate : "")}
              id="start-date" 
                type='text' 
                placeholder="Enter start date" 
                onChange={(event)=>{
                  setInputFields({...inputFields, "startDate": event.target.value})
                  updateExpObjList("startDate", event.target.value, currEditedExperience)
              }}

              />
            </div>    
          <div className="field-wrapper flex">
              <label className="form-field-label" htmlFor="end-date">End Date</label>
              <input 
              value={currFormState ? "" : (currEditedExperience ? currEditedExperience.endDate : "")}
              id="end-date" 
                type='text' 
                placeholder="Enter end date" 
                onChange={(event)=>{
                  setInputFields({...inputFields, "endDate": event.target.value})
                  updateExpObjList("endDate", event.target.value, currEditedExperience)}
                }
            />
          </div>
        </div>
        <div className="field-wrapper flex">
            <label className="form-field-label" htmlFor="location">Location</label>
            <input 
              value={currFormState ? "" : (currEditedExperience ? currEditedExperience.location : "")}
              id="location" 
              type='text' 
              placeholder="Arizona, U.S." 
              onChange={(event)=>{
                setInputFields({...inputFields, "location": event.target.value})
                updateExpObjList("location", event.target.value, currEditedExperience)}
              }
            />
        </div>
          {listOfFields[0].fieldName === "Company Name" &&(
            <div className="field-wrapper flex">
              <label className="form-field-label" htmlFor="description">Company Description</label>
              <textarea 
              value={currFormState ? "" : (currEditedExperience ? currEditedExperience.description : "")}
              id="description" 
                placeholder="Enter a descriptio of experience" 
                onChange={(event)=>{
                  setInputFields({...inputFields, "description": event.target.value})
                  updateExpObjList("description", event.target.value, currEditedExperience)}
                }
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
