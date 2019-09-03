//import fs from 'browserify-fs';

export default function setBPMconfig(configData){
    if(!configData.createProcessInstance || !configData.completeTask || !configData.cancelProcess){
         throw new Error('No config provided for BPM server')
    }
    localStorage.setItem('bpmConfig',JSON.stringify(configData))
}