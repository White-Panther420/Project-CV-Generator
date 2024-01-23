/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "../Styles/ResumeFields.css"
import uniqid from 'uniqid';



function ResumeFields({experienceObjectList=[], updateExpObjList, personalDetailsObject=[], updatePersonalDetails, deleteFromExpObjList, changeExpObjVisibility}) {
  //This will hold all the different experiences (i.e. education, work, volunteer)
  console.log(personalDetailsObject)
  return (
    <div className="fields-wrapper flex">
      <PersonalDetails 
        personalDetailsObject = {personalDetailsObject}
        updatePersonalDetails = {updatePersonalDetails}
      />
      <ExperienceContainer 
        title="Education"
        experienceObjectList={experienceObjectList}
        updateExpObjList={updateExpObjList}
        deleteFromExpObjList = {deleteFromExpObjList}
        changeExpObjVisibility = {changeExpObjVisibility}
      />
      <ExperienceContainer 
        title="Work Experience"
        experienceObjectList={experienceObjectList}
        updateExpObjList={updateExpObjList}
        deleteFromExpObjList = {deleteFromExpObjList}
        changeExpObjVisibility = {changeExpObjVisibility}
      />
    </div>
  )
}

function PersonalDetails({personalDetailsObject=[], updatePersonalDetails}){
  const [values, setValues] = useState(personalDetailsObject)
  // We check this when we toggle the resume template to ensure values is blank
  if (values !== personalDetailsObject) {
    setValues(personalDetailsObject);
  }
  const handleCancel = (event) => {
    event.preventDefault();
    // Set all properties of values state to be blank
    const blankValues = Object.fromEntries(Object.keys(values).map(key => [key, ""]));
    setValues(blankValues);
  };
  const handleSubmit = (event)=>{
    event.preventDefault();
    updatePersonalDetails(values)
  }

    return( 
              <div className="personal-details-wrapper flex white-background rounded">
                <h2 className="form-header">Personal Details</h2>
                <form className="personal-details-form flex" onSubmit={handleSubmit}>
                  <label className='personal-details-form-frield' htmlFor="fullName">Full name</label>
                  <input 
                    value={values["Full Name"]} 
                    id='fullName' 
                    type='text' 
                    placeholder='John Doe'
                    onChange={(event) => setValues({...values, "Full Name": event.target.value})}
                  />

                  <label className='personal-details-form-frield' htmlFor="email">Email <span className='recommended'>(recommended)</span></label>
                  <input 
                    value={values["Email"]} 
                    id='email' 
                    type='email' 
                    placeholder='example@gmail.com'
                    onChange={(event) => setValues({...values, "Email": event.target.value})}
                  />

                  <label className='personal-details-form-frield' htmlFor="phone">Phone number <span className='recommended'>(recommended)</span></label>
                  <input 
                    value={values["Phone Number"]} 
                    id='phone' 
                    type='phone' 
                    placeholder='(555)-555-5555'
                    onChange={(event) => setValues({...values, "Phone Number": event.target.value})}
                  />

                  <label className='personal-details-form-frield' htmlFor="location">Location <span className='recommended'>(recommended)</span></label>
                  <input 
                    value={values["Location"]} 
                    id='location' 
                    type='text' 
                    placeholder='Arizona, U.S.'
                    onChange={(event) => setValues({...values, "Location": event.target.value})}
                  />
                  <div className="form-action-buttons-container flex">
                    <button className="display-resume-button cancelBtn" onClick={handleCancel}>Cancel</button>
                    <button className="display-resume-button saveBtn" type="submit">Save</button>
                  </div>
                </form>
              </div>
    )
}

function ExperienceContainer({title="education", experienceObjectList=[], updateExpObjList, deleteFromExpObjList, changeExpObjVisibility}){
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
                deleteFromExpObjList = {deleteFromExpObjList}
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
                    experienceObject = {experienceObject}
                    changeExpObjVisibility = {changeExpObjVisibility}
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

function ExperienceCard({experienceName="", experienceObject, showEditForm, changeExpObjVisibility}){
  const changeExperienceVisibility = (event) =>{
    event.stopPropagation()
    changeExpObjVisibility(experienceObject)
  }

  const displayEditForm = () =>{
    showEditForm()
  }

  console.log("EXP OBJ VIS")
  console.log(experienceObject.visibility)
  const iconSrc = experienceObject.visibility ? "./public/visible-black.svg" : "./public/hidden-black.svg"

  return (
      <div className="experience-card flex white-background" onClick={displayEditForm}>
        <p className="experience-p">{experienceName}</p>
        <img className="largerIcon eye" src={iconSrc} alt="" onClick={changeExperienceVisibility} />
      </div>
  )
}

function Form({listOfFields="", onHideForm, currEditedExperience, experienceType, currFormState, updateExpObjList, deleteFromExpObjList}){
    const field1 = listOfFields[0].fieldName
    const field2 = listOfFields[1].fieldName
    //If we have an add form or invalid experience object, set input fields to blank
    const [fields, setFields] = useState({
      id: currFormState ? uniqid() : (currEditedExperience ? currEditedExperience.id : uniqid()),
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
      console.log("SAVE FIELDS")
      console.log(fields)
      console.log(currEditedExperience)
      fields["experience name"] = fields[field1]
      fields["experience type"] = experienceType;
      fields.visibility = true
      updateExpObjList(fields)
      hideForm()
      e.preventDefault()
    }
  
    const deleteExperienceObject = (e) => {
      e.preventDefault()
      deleteFromExpObjList(fields)
      hideForm()
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
            <button className="delete-resume-button delete-form-button flex rounded" onClick={deleteExperienceObject}>
              <img className='icon' src="./public/delete-red.svg" alt="" />
              <p className="delete">Delete</p>
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