export const uiTestPrompt =(pageURL : string, pageDescription : string) : string =>{
return `
You are an expert UI Test Engineer.

Generate Detailed Test Cases for the following UI Page in JSON format:

PageUrl:${pageURL}
PageDescription: ${pageDescription}

Return ONLY a JSON array with this exact structure, no extra text:
[{
"testCaseId": "TC001",
"title": "Test Case Title",
"pageUrl": "${pageURL}",
"preconditions": "User must be on the login page",
"steps": [{

    "action": "enter the URL",
    "target": "login page",
    "value": "Using the URL",
    "expectedResult": "login page is visible"
},
{
"action": "enter the email",
    "target": "Email Text field",
    "value": "",
    "expectedResult": "should be able to enter in Email Text field"
},
{
"action": "enter the password",
    "target": "password Text field",
    "value": "",
    "expectedResult": "should be able to enter in password Text field"
},
{
"action": "click on Submit",
    "target": "submit button",
    "value": "",
    "expectedResult": "should be able to Login"
}
],
"expectedResult": "",
"testType": "positive/negative/edge",
"priority": "high/medium/low"
}]
Generate all possible Test cases covering:
- Positive scenarios
- Negative scenarios  
- Edge cases
- To check The Actions
`
}