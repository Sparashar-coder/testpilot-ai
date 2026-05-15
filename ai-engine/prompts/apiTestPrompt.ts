export const apiTestPrompt =(endpoint : string, method: string , description : string): string =>{
    return `
    You are an expert API Test Engineer.

    Genearte Detailed Test Cases for the Following EndPoints in JSON Format:

    Endpoint: ${endpoint}
    Method: ${method}
    Description: ${description}


    Return ONLY a JSON array with this exact structure, no extra text:
   [
  {
    "testCaseId": "TC001",
    "title": "test case title",
    "endpoint": "${endpoint}",
    "method": "${method}",
    "headers": {},
    "requestBody": {},
    "expectedStatusCode": 200,
    "expectedResponse": {},
    "testType": "positive/negative/edge",
    "priority": "high/medium/low"
  }
]

Generate atleast 5 Test cases covering:
- Positive scenarios
- Negative scenarios  
- Edge cases
- Auth/No auth scenarios
- Invalid input scenarios 
    `;
}

