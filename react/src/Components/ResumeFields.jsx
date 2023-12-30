import React, { useState } from "react";
import "../Styles/ResumeFields.css"
import uniqid from 'uniqid';

//This will hold all the different experiences (i.e. education, work, volunteer)
let experienceObjectList = []

function ResumeFields() {
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
    setFormIsActive(!formIsActive)
  }

  const switchFormType = () =>{
    setAddForm(!addForm)
  }

  const headerIconSrc = `./public/${title.toLocaleLowerCase().split(" ").join("-")}-black.svg`
  console.log(headerIconSrc)

  console.log(`${isClicked}, ${formIsActive}`)
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
            {(isClicked && formIsActive) && <Form listOfFields={fieldNameList} onHideForm = {() => setFormIsActive(false)} formType={() => setAddForm(true)}></Form>}
          </div>
          {((isClicked && !formIsActive) && (
            <>
              {experienceObjectList.map(experienceObject => {
                console.log("LALA: " + experienceObject[1])
                return <ExperienceCard key={experienceObject.id} experienceName={experienceObject[0]} showEditForm={() => { setFormIsActive(true), setAddForm(false)}}></ExperienceCard>
              })}
              <div className="add-container flex white-background">
                <button className="display-resume-button add-button rounded flex" onClick={displayForm}>
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

function Form({listOfFields="", onHideForm, formType}){
  let experienceObject = {id: uniqid()};

  listOfFields.map(field =>{
    experienceObject[field.fieldName] = ""
  })
  
  experienceObject["start-date"] = ""
  experienceObject["end-date"] = ""
  experienceObject["location"] = ""
  experienceObject["description"] = ""

  console.log("formType: " + formType)
  const hideForm = () => {
    onHideForm()
  }

  const changeFormType = ()=>{
    formType()
  }

  //This function will update the 
  const saveInputValue = (event) =>{
    experienceObject[event.target.id] = event.target.value
    console.log(experienceObject)
  }

  const createNewExperienceObject = () =>{
    experienceObjectList.push(experienceObject)
    console.log(experienceObjectList)
  }

  return (
    <div className="form-wrapper flex">
      <form>
        {listOfFields.map((field) =>{
          return(
          <div key={field.id} className="field-wrapper flex">
            <label className="form-field-label" htmlFor={field.fieldName}>{field.fieldName}</label>
            <input id={field.fieldName} type='text' placeholder={field.placeholder} onChange={saveInputValue}></input>
          </div>
          )
        })}
        <div className="date-wrapper flex">
          <div className="field-wrapper flex">
              <label className="form-field-label" htmlFor="start-date">Start Date</label>
              <input id="start-date" type='text' placeholder="Enter start date" onChange={saveInputValue}></input>
          </div>
          <div className="field-wrapper flex">
              <label className="form-field-label" htmlFor="end-date">End Date</label>
              <input id="end-date" type='text' placeholder="Enter end date" onChange={saveInputValue}></input>
          </div>
        </div>
        <div className="field-wrapper flex">
            <label className="form-field-label" htmlFor="location">Location</label>
            <input id="location" type='text' placeholder="Arizona, U.S." onChange={saveInputValue}></input>
        </div>
          {listOfFields[0].fieldName === "Company Name" &&(
            <div className="field-wrapper flex">
              <label className="form-field-label" htmlFor="description">Company Description</label>
              <textarea id="description" placeholder="Enter a descriptio of experience" onChange={saveInputValue}></textarea>
            </div>
          )}
      </form>
      <div className="form-action-buttons-container flex">
        <button className="delete-resume-button delete-form-button flex rounded">
          <img className='icon' src="./public/delete-red.svg" alt="" />
          <p className="delete">Delete</p>
        </button>
        <div className="delete-and-save-div flex">
            <button className="display-resume-button cancelBtn" onClick={hideForm}>Cancel</button>
            <button className="display-resume-button saveBtn" onClick={createNewExperienceObject}>Save</button>
        </div>
      </div>
    </div>
  )
}


export default ResumeFields
