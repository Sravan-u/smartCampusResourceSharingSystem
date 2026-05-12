package com.campus.resource.sharing.system.config;

import com.campus.resource.sharing.system.entity.Resource;
import com.campus.resource.sharing.system.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ResourceRepository resourceRepository;

    @Override
    public void run(String... args) throws Exception {
        if (resourceRepository.count() == 0) {
            Resource book = new Resource();
            book.setTitle("Introduction to Algorithms");
            book.setDescription("Standard textbook for algorithms. CLRS 4th Edition.");
            book.setCategory(Resource.Category.BOOK);
            book.setStatus(Resource.Status.AVAILABLE);
            resourceRepository.save(book);

            Resource laptop = new Resource();
            laptop.setTitle("MacBook Pro 2023");
            laptop.setDescription("High performance laptop for development and design.");
            laptop.setCategory(Resource.Category.EQUIPMENT);
            laptop.setStatus(Resource.Status.AVAILABLE);
            resourceRepository.save(laptop);

            Resource racket = new Resource();
            racket.setTitle("Yonex Badminton Racket");
            racket.setDescription("Professional grade racket for indoor matches.");
            racket.setCategory(Resource.Category.GEAR);
            racket.setStatus(Resource.Status.AVAILABLE);
            resourceRepository.save(racket);

            Resource camera = new Resource();
            camera.setTitle("Sony Alpha A7 IV");
            camera.setDescription("Full-frame mirrorless camera for campus events.");
            camera.setCategory(Resource.Category.EQUIPMENT);
            camera.setStatus(Resource.Status.AVAILABLE);
            resourceRepository.save(camera);
        }
    }
}
