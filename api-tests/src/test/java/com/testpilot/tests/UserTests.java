package com.testpilot.tests;

import static io.restassured.RestAssured.given;

import org.testng.annotations.Test;

import com.testpilot.base.BaseTest;
import static org.hamcrest.Matchers.*;


public class UserTests extends BaseTest{

    @Test
    public void getUsers(){

        given(requestSpecification)
        .when().get("/users")
        .then().statusCode(200);

    }

    @Test
    public void getSingleUser(){

        given(requestSpecification)
        .when().get("/users/1")
        .then().statusCode(200)
        .body("id" ,equalTo(1));

    }
    @Test
    public void createUser(){

        String requestBody = "{ \"name\": \"Test User\", \"username\": \"testuser\", \"email\": \"test@test.com\" }";
       
        given(requestSpecification)
    .body(requestBody)
.when()
    .post("/users")
.then()
    .statusCode(201)
    .body("name", equalTo("Test User"));

    }

    @Test
    public void updateUser(){
        String requestBody = "{ \"name\": \"Updated User\", \"username\": \"updateduser\", \"email\": \"updated@test.com\" }";

        given(requestSpecification)
        .body(requestBody)
        .when()
        .put("/users/1").then()
        .statusCode(200).body("name",equalTo("Updated User"));
    }
    @Test
    public void deleteUser(){
        
        given(requestSpecification)
        .when()
        .delete("/users/1").then()
        .statusCode(200);
    }

    
}
