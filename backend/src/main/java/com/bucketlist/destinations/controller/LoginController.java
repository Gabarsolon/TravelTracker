package com.bucketlist.destinations.controller;

import com.bucketlist.destinations.model.User;
import com.bucketlist.destinations.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
public class LoginController {
    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User newUser = this.loginService.createAccount(user);
        return new ResponseEntity<>(this.loginService.createAccount(newUser), HttpStatus.OK);
    }

    @GetMapping("/login")
    public ResponseEntity<Long> login(@RequestParam String username, @RequestParam String password){
        try{
            User loggedInUser = this.loginService.login(username, password);
            return new ResponseEntity<>(loggedInUser.getUserId(), HttpStatus.OK);
        }
        catch (NullPointerException e){
            String errorMessage = e.getMessage();
            System.out.println(ResponseEntity.status(404).body("Error: " + errorMessage + "\nInvalid credentials!"));
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
