<p align="center">
  <img src="https://svgshare.com/i/EpB.svg"><br/>
  <h2 align="center">React Framework to create BPM forms</h2>
</p>
<p align="center">
    <a href="https://travis-ci.org/ramunda/ramunda">
        <img alt="Travis" src="https://travis-ci.org/ramunda/ramunda.png?branch=master" />
    </a>
    <a href="https://codecov.io/gh/ramunda/ramunda">
        <img alt="Codecov" src="https://img.shields.io/codecov/c/github/ramunda/ramunda/master.svg?style=flat-square" />
    </a>
</p>

## Contents
- [Install](#install)
- [BPM server support](#bpm-server-support)
- [Basic usage](#basic-usage)
    - [Configuring the BPM server](#configuring-the-bpm-server)
    - [Creating a form](#creating-a-form)
        - [Passing props to the forms](#passing-props-to-the-forms)
- [Examples](#examples)

## Install
To install Ramunda run one of the followings lines.
```
npm install ramunda
```
```
yarn add ramunda
```

## BPM server support
To enable the library to create processes instances, complete tasks and cancel processes, a BPM support server is necessary. To make it easier, we have provided a generic support server where you can host your processes. 

You can find it here: https://github.com/ramunda/camunda-server

We also provided a support server with three processes already implemented.

You can find it here: https://github.com/ramunda/camunda-server-examples

If you want to implement a different server you only have to obey one rule. The server must respond in the following way:

##### Create process instance response:
```
{
	"procDefKey": "process definition key",
	"procInstId": "process instance id",
	"variables": [{"key": "varName","value": varValue}],
	"milestones": [
		"milestoneName1",
		"milestoneName2"
	],
	"activeTask": {
		"id": "task id",
		"inParameters": [
			{
				"key": "paramName",
				"value": paramValue
			}
		],
		"outParameters": [
			{
				"key": "paramName",
				"value": paramValue
			}
		],
		"milestone": "milestoneName1"
	}
}
```

##### Complete task response:
```
{
	"id": "taskID",
	"inParameters": [
		{
			"key": "paramName",
			"value": paramValue
		}
	],
	"outParameters": [
		{
			"key": "paramName",
			"value": paramValue
		}
	],
	"milestone": "milestoneName2"
}
```

##### Cancel process response:
You must only respond if the cancelation was successfull or not.

## Basic usage
### Configuring the BPM server

To make HTTP request to the endpoints of the BPM support server you need to call the external service, exported from Ramunda, setBPMconfig, as following:

``` 
import { setBPMconfig } from 'ramunda'
```
This configuration must be done before the construction of any form!

The object that describes the urls from the BPM support server must contain the definition of the fields createProcessInstance that represents the endpoint where a process instance is instantiated, completeTask that represents the endpoint to complete a task and cancelProcess that represents the endpoint to cancel a process. Following is an example of a configuration object:

```
{
    "createProcessInstance": "endpointURL",
    "completeTask": "endpointURL",
    "cancelProcess": "endpointURL"
}
```

### Creating a form

Ramunda provides four forms:  DefaultForm, DefaultandRadioButtonsForm, CustomForm and ExternalForm.

| Form                  | Explanation                                                                                                   |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| Default form                       |   Defines a form where every parameter of the task is represented as simple HTML inputs                                 | 
| DefaultandRadioButtonsForm             | Defines a form where the task´s parameters can be simple HTML inputs or radio buttons, depending on the specification |
| CustomForm             | Defines a form where the task´s parameters can be simple HTML inputs, radio buttons, dropdowns or checkboxes       | 
| ExternalForm | Defines a form that renders an external React component given in the props. |



#### Passing props to the forms
To control the behavior of the form it is necessary that some information is given to the React component through its props.
Here they are:

- **createInstance**: Defines if the component needs to create a process instance. (Optional)

- **procDefKey**: Key that defines a process, if it is necessary to create a new instance of the process, this key identifies that process. (Optional)

- **variables**: Variables to instantiate a process. (Optional)

- **process**: Object that represents a process instance. Must be defined as the following: (Optional)
```
{
	"processId": "process instance id",
	"task": {
		"id": "task id",
		"parameters": {
			"parameterName": {
				"value": "parameterValue",
				"readOnly": false, // false if is a inputParamter and true if it's a outputParameter 
				"type": "w" // 'w' if it's a inputParamter and 'r' if it's a outputParameter 
			}
		},
		"milestone": "milestoneName1"
	},
	"milestones": [
		"milestoneName1",
		"milestoneName2"
	]
}
```

- **customServer**: Boolean variable that defines if the user wants to use the library to communicate with the BPM support server. (Optional)

- **onNext**: Function called as soon as the HTTP request to the server to complete a task is successful and it is intended to progress with the workflow, or in case of the property customServer being true the function is called as the Next button is pressed. The Next button is only going to be available while the process has an active task in the process object and the next function is defined.

- **onBack**: Function called as soon as the HTTP request to the server to complete a task is successfull and it is intended to regress with the workflow,  or in case of the property customServer being true the function is called as the Back button is pressed. The Back button is only going to be available when the back function is defined.

- **onCancel**: Function called as soon as the HTTP request to the server to cancel a process is successfull, or in case of the property customServer being true the function is called as the Cancel button is pressed and the cancel function is defined.

- **externalForm**: Instantiate a React component that will be rendered is case of externalForm being used. (Optional)

- **options**:Object where the user can associate a parameter from a task to an input type, therefore being able to provide more detail to be represented in the form. The object options must respect the following structure:

```
{
	"invisibleParams": [{
		"bpmParamName": "..",
		"value": "optional" 
	}],
	"radioButtonsInfo":[{
		"bpmParamName": "...",
		"label": "optional",
		"buttonsInfo": [{"label":"..", "value": true},{"label":"..", "value": false}]	
	}],
	"checkboxInfo":[{
		"bpmParamName": "...",
		"label": "optional"
	}],
	"dropdownInfo":[{
		"bpmParamName": "...",
		"label": "optional",
		"options": ["..",".."]
	}],
	"defaultInputInfo": [{
		"bpmParamName": "...",
		"label": "optional",
		"type": "default value text" 
	}]
}
```

## Examples
The following illustrations represent the creation of a form and the produced view. You can also find an example web application (https://github.com/ramunda/ramunda-webapp-example) using Ramunda and a BPM support server (https://github.com/ramunda/camunda-server-examples) where three processes are already defined.

```
{
    "createProcessInstance": "http://localhost:8080/camunda/process",
    "completeTask": "http://localhost:8080/camunda/process/:procInst/next?advance=:advance",
    "cancelProcess": "http://localhost:8080/camunda/process/:procInst/cancel"
}
```

```
import { setBPMconfig } from 'ramunda'

async componentDidMount(){
	let test = await import('./testConfig.json')
	setBPMconfig(test.default)
}
```

```
"firstTaskOptions":{
	"radioButtonsInfo":[{
		"bpmParamName": "toSum",
		"label": "Operação",
		"buttonsInfo": [{"label":"Adição", "value": true},{"label":"Subtração", "value": false}]	
	}],
	"defaultInputInfo": [{
		"bpmParamName": "n1",
		"label": "Primeiro Número",
		"type": "number" 
	},
	{
		"bpmParamName": "n2",
		"label": "Segundo Número",
		"type": "number" 
	}]
}
```

```
import React from 'react';
import CustomForm from 'ramunda'
import ramundaOptions from './ramundaOptions.json'


const initProcessVars = [{key: 'user', value: 'test'}]

export default class FirstTask extends React.Component{
    
    constructor(props) {
        super(props)
        
        this.onNext = this.onNext.bind(this)
        this.onCancel = this.onCancel.bind(this)
    }

    onNext(process){
        this.props.history.push({
            pathname: '/secondTask',
            state: {process: process}
        })
    }

    onCancel(){
        this.props.history.push({
            pathname: '/canceled',
        })
    }
    
    render() {
        return (<CustomForm 
            creatInstance='true' 
            procDefKey='Process_05r67sz'
            variables={initProcessVars}
            options={ramundaOptions.firstCustomTask}	
            onNext={this.onNext}
            onCancel={this.onCancel}
            />)
    }
}
```

<p align="center">
  <img src="https://svgshare.com/i/Enh.svg"><br/>
</p>

<p align="center">
 	<h2 align="center">ENJOY!! :sunglasses:</h2>
</p>

