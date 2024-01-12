import { useState } from 'react'
import './App.css'
import ResumeFields from './Components/ResumeFields'
import { Resume } from './Components/Resume'
import uniqid from 'uniqid';

function App() {
  const [experienceObjectList, setExperienceObjectList] = useState(
    [
      {
        id: uniqid(),
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
        id: uniqid(),
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
        id: uniqid(),
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
        id: uniqid(),
        "Company Name": "Glendale Community College",
        "Position Title": "CSS Front Desk Receptionist",
        startDate: "10/15/2018",
        endDate: "01/15/2021",
        location: "Arizona, U.S.",
        description: "As a team member in the Career Services department from October 2018 to December 2020, I assisted over 20,000 students and community members with job-related activities, including the federal work-study process and resume and cover letter reviews. My role extended to promoting Career Services workshops and job fairs through marketing initiatives, event preparations, and onsite duties. I handled main phone line inquiries, greeted visitors professionally, and supported various office projects such as researching job trends and internships. Additionally, I contributed to data entry for weekly computer usage and department visits. Acting as a liaison, I reached out to student clubs to present career-related topics, and I organized bi-weekly tabling events to promote Career Services and encourage resource utilization among students.",
        "experience name": "Glendale Community College",
        "experience type": "work experience"
      },
    ]
  )

  const updateExpObjList = (propertyName="", propertyValue="", currEditedExperienceObj='') =>{
    console.log("UPDATE EXP")
    console.log(currEditedExperienceObj)
    console.log({propertyName, propertyValue})
    let updatedExperienceList
    setExperienceObjectList(prevExperienceList => {
      console.log("PREEEV")
      console.log(prevExperienceList)
      updatedExperienceList = prevExperienceList.map((expObj) => {
        // Compare objects based on specific properties
        if (
          currEditedExperienceObj["experience name"] === expObj["experience name"] &&
          currEditedExperienceObj["experience type"] === expObj["experience type"]
        ) {
          // If this is the edited experience, update the specific property
          return { ...expObj, [propertyName]: propertyValue };
        }
        // If not the edited experience, keep the object as it is
        return expObj;
      });
  
      console.log("Updated Experience List:");
      console.log(updatedExperienceList);
  
      return updatedExperienceList;
    })

  
  
  }

  return <div className='app-div flex'>
            <div className="content-wrapper grid">
                <ResumeSettings/>
                <ResumeDetais 
                  experienceObjectList = {experienceObjectList}
                  updateExpObjList = {updateExpObjList}
                />
                <Resume
                  experienceObjectList = {experienceObjectList}
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

function ResumeDetais({experienceObjectList=[], updateExpObjList}){
  console.log("RESUME DETAILS")
  console.log(experienceObjectList)
  console.log(updateExpObjList)
  return (
    <div className="resume-details-wrapper flex">
      <div className="display-resume-settings-wrapper flex white-background rounded">
        <button className="delete-resume-button flex rounded">
            <img className='icon' src="./public/delete-red.svg" alt="" />
            <p className="delete">Clear resume</p>
        </button>
        <button className="display-resume-button rounded">
            <p className="display">Load example</p>
        </button>
      </div>
      <ResumeFields 
        experienceObjectList={experienceObjectList} 
        updateExpObjList={updateExpObjList}
      />
    </div>
  )
}

export default App
