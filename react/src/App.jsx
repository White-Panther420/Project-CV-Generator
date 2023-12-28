import { useState } from 'react'
import './App.css'
import ResumeFields from './Components/ResumeFields'

function App() {
  return <div className='app-div flex'>
            <div className="content-wrapper grid">
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
                    <ResumeFields />
                </div>
              </div>
          </div>
  
}

export default App
