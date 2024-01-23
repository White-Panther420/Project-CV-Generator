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
                <ResumeSettings/>
                <ResumeDetais 
                  experienceObjectList = {experienceObjectList}
                  updateExpObjList = {updateExpObjList}
                  toggleResumeTemplate = {toggleResumeTemplate}
                  personalDetailsObject = {personalDetailsObject}
                  updatePersonalDetails = {setPersonalDetails}
                  deleteFromExpObjList = {deleteFromExpObjList}
                  changeExpObjVisibility = {changeExpObjVisibility}
                />
                <Resume
                  experienceObjectList = {experienceObjectList}
                  personalDetailsObject = {personalDetailsObject}
                />
              </div>
          </div>
}

function ResumeSettings(){
  return(
          <div className="resume-settings-wrapper white-background rounded">
              <button className="content flex rounded">
                <img className='icon' src="./public/resume.svg" alt="" />
                <p>Content</p>
              </button>
              <button className="customize flex rounded">
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
      <div className="display-resume-settings-wrapper flex white-background rounded">
        <button className="delete-resume-button flex rounded" onClick={() => toggleResumeTemplate(true)}>
            <img className='icon' src="./public/delete-red.svg" alt="" />
            <p className="delete">Clear resume</p>
        </button>
        <button className="display-resume-button rounded" onClick={() => toggleResumeTemplate(false)}>
            <p className="display">Load example</p>
        </button>
      </div>
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

export default App
