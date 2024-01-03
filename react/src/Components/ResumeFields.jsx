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
    console.log("CALLED")
    setFormIsActive(!formIsActive)
  }

  const toggleAddForm = () =>{
    console.log("LE ADD FORM: " + addForm)
    setAddForm(!addForm)
  }


  const headerIconSrc = `./public/${title.toLocaleLowerCase().split(" ").join("-")}-black.svg`

  console.log(`${isClicked}, ${formIsActive}, ${addForm}`)
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
            {(isClicked && formIsActive) && <Form listOfFields={fieldNameList} experienceType={title} currFormState={addForm} onHideForm = {() => setFormIsActive(false)}></Form>}
          </div>
          {((isClicked && !formIsActive) && (
            <>
              {experienceObjectList.map(experienceObject => {
                return experienceObject["experience name"] !== "" && experienceObject.experienceType.toLocaleLowerCase() == title.toLocaleLowerCase() &&  <ExperienceCard key={experienceObject.id} experienceName={experienceObject["experience name"]} showEditForm={() => { setFormIsActive(true), setAddForm(false)}}></ExperienceCard>
              })}
              <div className="add-container flex white-background">
                <button className="display-resume-button add-button rounded flex" onClick={() =>{displayForm(); toggleAddForm();}}>
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

function Form({listOfFields="", onHideForm, toggleFormType, experienceType, currFormState}){
  const field1 = listOfFields[0].fieldName
  const field2 = listOfFields[0].fieldName
  const [fields, setFields] = useState({
    field1,
    field2,
    startDate: "",
    endDate: "",
    location: "",
    description: "",
  })

  console.log("CURR STATE: " + currFormState)
  console.log(listOfFields)
  let experienceObject = "";
  let experienceObjectToEdit = ""
  // currFormState = true means the form is being used to add a new experience
  if(currFormState){
    experienceObject = {id: uniqid(),  
      experienceType: experienceType
    };
  
    listOfFields.map(field =>{
      experienceObject[field.fieldName] = ""
    })
    
    experienceObject["start-date"] = ""
    experienceObject["end-date"] = ""
    experienceObject["location"] = ""
    experienceObject["description"] = ""

    console.log("EXP OBJECT")
    console.log(experienceObject)
  }else{
    for (const key in experienceObjectList) {
      if (Object.hasOwnProperty.call(experienceObjectList, key)) {
        const experienceObject = experienceObjectList[key];
        const experienceName = document.querySelector(".experience-p")
        console.log("COMPARISON")
        console.log(experienceObject)
        console.log(experienceName.textContent)
        console.log(experienceObject["experience name"])
        if(experienceName.textContent === experienceObject["experience name"]){
          experienceObjectToEdit = experienceObject
          console.log("WE FOUND IT!!!!")
          console.log(experienceObjectToEdit)
        }
      }
    }
  }
  
 

  console.log("formType: " + toggleFormType)
  const hideForm = () => {
    onHideForm()
  }

  const changeFormType = ()=>{
    toggleFormType()
  }

  //This function will update the experienceObject everytime the user types
  const saveInputValue = (event) =>{
    const fieldToUpdate = event.target.id
    setFields({...fields, fields.fieldToUpdate: event.target.value})

    if(experienceObject !== ""){
      experienceObject[event.target.id] = event.target.value
    }else{
      experienceObjectToEdit[event.target.id] = event.target.value
    }
  }

  //Once the user submits the form, the experienceObject will then be placed in the list of experienceObjects
  const createNewExperienceObject = (e) =>{
    e.preventDefault()
    // Used as a generic property to display the name of an experience
    experienceObject["experience name"] = experienceObject.School || experienceObject["Company Name"]

    experienceObjectList.push(experienceObject)
    hideForm()
  }

  const deleteExperienceObject = () => {

  }

  return (
    <div className="form-wrapper flex">
      <form onSubmit={createNewExperienceObject}>
        {listOfFields.map((field) =>{
          console.log("EDOTTT")
          console.log(experienceObjectToEdit[field.fieldName])
          return(
          <div key={field.id} className="field-wrapper flex">
            <label className="form-field-label" htmlFor={field.fieldName}>{field.fieldName}</label>
            <input value={fields[field.fieldName]} id={field.fieldName} type='text' placeholder={field.placeholder} onChange={saveInputValue}></input>
          </div>
          )
        })}
        <div className="date-wrapper flex">
          <div className="field-wrapper flex">
              <label className="form-field-label" htmlFor="start-date">Start Date</label>
              <input value={fields.startDate} id="start-date" type='text' placeholder="Enter start date" onChange={saveInputValue}></input>
          </div>
          <div className="field-wrapper flex">
              <label className="form-field-label" htmlFor="end-date">End Date</label>
              <input value={fields.endDate} id="end-date" type='text' placeholder="Enter end date" onChange={saveInputValue}></input>
          </div>
        </div>
        <div className="field-wrapper flex">
            <label className="form-field-label" htmlFor="location">Location</label>
            <input value={fields.location} id="location" type='text' placeholder="Arizona, U.S." onChange={saveInputValue}></input>
        </div>
          {listOfFields[0].fieldName === "Company Name" &&(
            <div className="field-wrapper flex">
              <label className="form-field-label" htmlFor="description">Company Description</label>
              <textarea value={fields.description || ""} id="description" placeholder="Enter a descriptio of experience" onChange={saveInputValue}></textarea>
            </div>
          )}
      </form>
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
    </div>
  )
}


export default ResumeFields
