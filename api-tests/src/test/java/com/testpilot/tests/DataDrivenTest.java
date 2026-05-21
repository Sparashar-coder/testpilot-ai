package com.testpilot.tests;

import static io.restassured.RestAssured.given;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.json.JSONArray;
import org.json.JSONObject;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import com.testpilot.base.BaseTest;

public class DataDrivenTest extends  BaseTest{

    @DataProvider(name = "userData")
    public Object[][] getUserData() throws IOException{
        String content = new String(Files.readAllBytes(Paths.get("src/test/resources/testdata.json")));
        JSONArray jsonArray = new JSONArray(content);
        Object[][] data  = new Object[jsonArray.length()][4];
        
        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject obj = jsonArray.getJSONObject(i);
            data[i][0] = obj.getString("name");
            data[i][1] = obj.getString("username");
            data[i][2] = obj.getString("email");
            data[i][3] = obj.getInt("expectedStatus");
        }

        return data;

    }

    @Test(dataProvider = "userData")
    public void createUserDDT(String name , String username, String email , int expectedStatus){

        JSONObject requestBody = new JSONObject();

        requestBody.put("name", name);
        requestBody.put("username", username);
        requestBody.put("email", email);

        given(requestSpecification)
        .when().body(requestBody)
        .post("/users")
        .then().statusCode(expectedStatus);

    }
    
}
