import { useState } from 'react'
import './App.css'
import ResumeFields from './Components/ResumeFields'
import { Resume } from './Components/Resume'
import uniqid from 'uniqid';

function App() {
let preMadeExperienceObjectList = [
    {
      id: uniqid(),
      School: "Glendale Community College",
      Degree: "Associates in Science",
      startDate: "08/21/2017",
      endDate: "05/14/2021",
      location: "Arizona, U.S.",
      Description: "",
      "experience name": "Glendale Community College",
      "experience type": "education",
      visibility: true
    },
    {
      id: uniqid(),
      School: "Arizona State University",
      Degree: "Bachelors of Computer Science",
      startDate: "08/14/2021",
      endDate: "05/14/2024",
      location: "Arizona, U.S.",
      Description: "",
      "experience name": "Arizona State University",
      "experience type": "education",
      visibility: true
    },
    {
      id: uniqid(),
      "Company Name": "Arizona State University",
      "Position Title": "CMEE Front Desk Receptionist",
      startDate: "09/01/2021",
      endDate: "04/14/2023",
      location: "Arizona, U.S.",
      description: "The tasks involved updating the content of web pages featuring lists of W. P. Carey events using HTML to provide accurate and timely information for students and community members. Additionally, a calling campaign and LinkedIn audits were conducted to gather undergraduate student employment outcomes, resulting in a notable increase of over 15% in responses from 2021 to 2022. Furthermore, I played a role in facilitating student check-ins for career advising appointments by effectively communicating with career coaches. These efforts aimed to enhance the overall experience and engagement for students within the academic and career services sphere.",
      "experience name": "Arizona State University",
      "experience type": "work experience",
      visibility: true
    },
    {
      id: uniqid(),
      "Company Name": "Glendale Community College",
      "Position Title": "CSS Front Desk Receptionist",
      startDate: "10/15/2018",
      endDate: "01/15/2021",
      location: "Arizona, U.S.",
      description: "As a team member in the Career Services department from October 2018 to December 2020, I assisted over 20,000 students and community members with job-related activities, including the federal work-study process and resume and cover letter reviews. My role extended to promoting Career Services workshops and job fairs through marketing initiatives, event preparations, and onsite duties. I handled main phone line inquiries, greeted visitors professionally, and supported various office projects such as researching job trends and internships. Additionally, I contributed to data entry for weekly computer usage and department visits. Acting as a liaison, I reached out to student clubs to present career-related topics, and I organized bi-weekly tabling events to promote Career Services and encourage resource utilization among students.",
      "experience name": "Glendale Community College",
      "experience type": "work experience",
      visibility: true
    },
  ]
  let emptyExperienceObjectList = [{
    id: "",
    "Company Name": "",
    "Position Title": "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
    "experience name": "",
    "experience type": "",
    visibility: false
  }]
  let preMadePersonalDetailsObject = {
    "Full Name": "Abel Haddis",
    Email: "abelhaddisbusiness@gmail.com",
    "Phone Number": "555-555-5555",
    Location: "Arizona U.S."
  }
  let emptyPersonalDetailsObejct = {
    "Full Name": "",
    Email: "",
    "Phone Number": "",
    Location: ""
  }

  const [experienceObjectList, setExperienceObjectList] = useState(preMadeExperienceObjectList)
  const [personalDetailsObject, setPersonalDetails] = useState(preMadePersonalDetailsObject)
  
  const [customize, setCustomize] = useState(false)
  const [layout, setLayout] = useState(1)
  const [accentColor, setAccentColor] = useState("black")
  const [contrastCOlor, setContrastColor] = useState("white")

  const updateExpObjList = (currEditedExperienceObj='') =>{
    console.log("UPDATE EXP")
    console.log(currEditedExperienceObj)
    let updatedExperienceList
    let isFound = false;
    setExperienceObjectList(prevExperienceList => {
      console.log("PREEEV")
      console.log(prevExperienceList)
      updatedExperienceList = prevExperienceList.map((expObj) => {
        console.log("COMPARISON")
        console.log(currEditedExperienceObj)
        console.log(expObj)
        // Compare objects based on specific properties
        if (currEditedExperienceObj.id === expObj.id){
          console.log("YAYAYY")
          isFound = true;
          // If this is the edited experience, update the object
          expObj = {...currEditedExperienceObj};
          return { 
            ...expObj, 
            "experience name": currEditedExperienceObj["School"] || currEditedExperienceObj["Company Name"]
          };
        }
        // If not the edited experience, keep the object as it is
        return expObj;
      });
      
      if(!isFound){
        updatedExperienceList.push(currEditedExperienceObj)
      }
      console.log("Updated Experience List:");
      console.log(updatedExperienceList);
  
      return updatedExperienceList;
    })
  }

  const deleteFromExpObjList = (expObjToDelete) =>{
    setExperienceObjectList(prevExperienceList => {
      //Filters everything into new array that is not equal to the id of the obj we want to delete
      let newExpList = prevExperienceList.filter(obj => obj.id !== expObjToDelete.id)
      console.log("DELETING . . .")
      console.log(newExpList)
      return newExpList
    })
  }

  const toggleResumeTemplate = (emptyResume) =>{
    if(emptyResume){
      setExperienceObjectList(emptyExperienceObjectList)
      setPersonalDetails(emptyPersonalDetailsObejct)
    }else{
      setExperienceObjectList(preMadeExperienceObjectList)
      setPersonalDetails(preMadePersonalDetailsObject)
    }
  }

  //Converts ehx to rgb and changes contrast
  const changeContrast = (backgroundHexColor) =>{
    let rgbResult = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(backgroundHexColor);
    let rgb = [parseInt(rgbResult[1], 16), parseInt(rgbResult[2], 16), parseInt(rgbResult[3], 16),]
    
    const brightness = Math.round(((parseInt(rgb[0]) * 299) +
    (parseInt(rgb[1]) * 587) +
    (parseInt(rgb[2]) * 114)) / 1000);
    let contrast = (brightness > 125) ? 'black' : 'white'
    setContrastColor(contrast);
  }

  const changeExpObjVisibility = (expObjToChangeVisibility) => {
    setExperienceObjectList(prevExperienceList => {
      let updatedExperienceList = prevExperienceList.map((expObj) => {
        console.log("EXP Visibility")
        console.log(expObj.visibility)
        let expVisibility = expObj.visibility
        // Compare objects based on specific properties
        if (expObjToChangeVisibility.id === expObj.id)
        {
          return{...expObj, visibility: !expVisibility}
        }
        return expObj
      })
    return updatedExperienceList
    })
  }

  return <div className='app-div flex'>
            <div className="content-wrapper grid">
              <ResumeSettings
                customize = {customize}
                setCustomize = {setCustomize}
              /> 
              {!customize ? 
                <>
                  <ResumeDetais 
                    experienceObjectList = {experienceObjectList}
                    updateExpObjList = {updateExpObjList}
                    toggleResumeTemplate = {toggleResumeTemplate}
                    personalDetailsObject = {personalDetailsObject}
                    updatePersonalDetails = {setPersonalDetails}
                    deleteFromExpObjList = {deleteFromExpObjList}
                    changeExpObjVisibility = {changeExpObjVisibility}
                  /> 
                </> :
                <>
                  <ResumeCustomization
                    toggleResumeTemplate={toggleResumeTemplate}
                    accentColor = {accentColor}
                    setAccentColor = {setAccentColor}
                    changeContrast = {changeContrast}
                  />
                </>
              }
              <Resume
                experienceObjectList = {experienceObjectList}
                personalDetailsObject = {personalDetailsObject}
                accentColor = {accentColor}
                contrastCOlor = {contrastCOlor}
              />         
              </div>
          </div>
}

function ResumeSettings({customize, setCustomize}){
  const customizeButtonStyle = {
    backgroundColor: customize ? "rgb(245, 245, 245)" : "#fff",
    transition: "background-color 0.3s ease-in-out",
  };
  
  const contentButtonStyle = {
    backgroundColor: customize ? "#fff" : "rgb(245, 245, 245)",
    transition: "background-color 0.3s ease-in-out",
  };

  return(
          <div className="resume-settings-wrapper white-background rounded">
              <button 
                style={contentButtonStyle}
                className="content flex rounded" 
                onClick={() => setCustomize(false)}>
                <img className='icon' src="./public/resume.svg" alt="" />
                <p>Content</p>
              </button>
              <button 
                style={customizeButtonStyle}
                className="customize flex rounded" 
                onClick={() => setCustomize(true)}>
                <img className='icon' src="./public/maintanance.svg" alt="" />
                <p>Customize</p>  
              </button>
          </div>
  )
}

function ResumeDetais({experienceObjectList=[], updateExpObjList, personalDetailsObject=[], updatePersonalDetails, deleteFromExpObjList, changeExpObjVisibility, toggleResumeTemplate}){
  console.log("RESUME DETAILS")
  console.log(experienceObjectList)
  console.log(updateExpObjList)
  console.log(personalDetailsObject)
  return (
    <div className="resume-details-wrapper flex">
      <ResumeTemplateSettings
        toggleResumeTemplate={toggleResumeTemplate}
      />
      <ResumeFields 
        experienceObjectList={experienceObjectList} 
        updateExpObjList={updateExpObjList}
        personalDetailsObject = {personalDetailsObject}
        updatePersonalDetails = {updatePersonalDetails}
        deleteFromExpObjList = {deleteFromExpObjList}
        changeExpObjVisibility = {changeExpObjVisibility}
      />
    </div>
  )
}


function ResumeTemplateSettings({toggleResumeTemplate}){
  const [selected, setSelected] = useState(true)
  const displayResumeTemplate = {
    backgroundColor: selected ? "rgb(245, 245, 245)" : "#fff",
    transition: "background-color 0.3s ease-in-out",
  };
  
  const deleteResumeTemplate = {
    backgroundColor: selected ? "#fff" : "rgb(245, 245, 245)",
    transition: "background-color 0.3s ease-in-out",
  };
  return(
    <div className="display-resume-settings-wrapper flex white-background rounded">
    <button style={deleteResumeTemplate} className="delete-resume-button flex rounded" onClick={() => {
        toggleResumeTemplate(true)
        setSelected(false)}}>
        <img className='icon' src="./public/delete-red.svg" alt="" />
        <p className="delete">Clear resume</p>
    </button>
    <button style={displayResumeTemplate} className="display-resume-button rounded" onClick={() =>{toggleResumeTemplate(false)
        setSelected(true)}}>
        <p className="display">Load example</p>
    </button>
  </div>
  )
}

function ResumeCustomization({toggleResumeTemplate, accentColor, setAccentColor, changeContrast}){
  const bgColorStyle = {
    backgroundColor: accentColor
  }

  return(
      <div className='resume-customization-wrapper flex'>
      <ResumeTemplateSettings
        toggleResumeTemplate={toggleResumeTemplate}
      />
      <div className="layout-content-wrapper flex">
        <div className="layout-section rounded white-background">
          <h2 className='customization-header'>Layout</h2>
          <div className="layout-types-wrapper flex">
          <div className="layout-option-wrapper">
            <button className="layout-option rounded white-background top">
              <div style={bgColorStyle} className="accent-color-div"></div>
            </button>
            <p className="option-name">Top</p>
          </div>
          <div className="layout-option-wrapper">
            <button className="layout-option rounded white-background flex left">
              <div style={bgColorStyle} className="accent-color-div"></div>
            </button>
            <p className="option-name">Left</p>
          </div>
          <div className="layout-option-wrapper">
            <button className="layout-option rounded white-background flex right">
              <div style={bgColorStyle} className="accent-color-div"></div>
            </button>
            <p className="option-name">Right</p>
          </div>
          </div>
        </div>
        <div className="accent-color-section-wrapper white-background rounded">
          <h2 className='customization-header'>Color</h2>
          <div className="color-setting-wrapper flex">
            <p className='accent-p'>Accent color</p>
            <button style={bgColorStyle} className='accent-color-button'>
              {/*To make color picker look better*/}
              <span 
                id="color-front"
                style={bgColorStyle}
                onClick={()=>{
                  const inputColorBtn = document.querySelector(".colorpicker")
                  inputColorBtn.click()
                }}
              />
              <input 
                type="color" 
                className="colorpicker" 
                value={accentColor}
                onChange={(e)=> {
                  setAccentColor(e.target.value)
                  changeContrast(e.target.value)
                }}
              />
            </button>
          </div>
        </div>

        <div className="font-section-wrapper white-background rounded">
          <h2 className='customization-header'>Fonts</h2>
          <div className="font-options-wrapper flex">
            <button className="font-option white-background">
              <p className="font-sample">Aa</p>
              <p className="font-name">Serif</p>
            </button>
            <button className="font-option white-background rounded">
              <p className="font-sample">Aa</p>
              <p className="font-name">Sans</p>
            </button>
            <button className="font-option white-background rounded">
              <p className="font-sample">Aa</p>
              <p className="font-name">Mono</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
