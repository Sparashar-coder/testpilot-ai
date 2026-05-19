package com.testpilot.base;



import static io.restassured.RestAssured.*;

import org.testng.annotations.BeforeClass;

import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;

public class BaseTest {

    protected final static String BASE_URL = "https://jsonplaceholder.typicode.com";
    protected RequestSpecification requestSpecification;

    @BeforeClass
    public void setup(){
        requestSpecification = given().baseUri(BASE_URL).contentType(ContentType.JSON);
    }
    
}
