package com.example.springy;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class ProjectController {

    @GetMapping("/projects")
    public List<Project> getProjects() {
        return List.of(
            new Project("Website Redesign")
        );
    }
}