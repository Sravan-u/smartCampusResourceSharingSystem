package com.campus.resource.sharing.system.controller;

import com.campus.resource.sharing.system.entity.Resource;
import com.campus.resource.sharing.system.entity.User;
import com.campus.resource.sharing.system.repository.ResourceRepository;
import com.campus.resource.sharing.system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/resources")
public class ResourceController {
    @Autowired
    ResourceRepository resourceRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping
    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    @GetMapping("/owned/me")
    @PreAuthorize("hasRole('STUDENT') or hasRole('FACULTY') or hasRole('ADMIN')")
    public List<Resource> getMyResources() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).get();
        return resourceRepository.findByOwner(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> getResourceById(@PathVariable Long id) {
        return resourceRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('STUDENT') or hasRole('FACULTY') or hasRole('ADMIN')")
    public Resource createResource(@RequestBody Resource resource) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).get();
        resource.setOwner(user);
        resource.setStatus(Resource.Status.AVAILABLE);
        return resourceRepository.save(resource);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('STUDENT') or hasRole('FACULTY') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteResource(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByUsername(username).get();
        
        return resourceRepository.findById(id)
                .map(resource -> {
                    // Allow deletion if:
                    // 1. Current user is the owner
                    // 2. The resource has NO owner (Sample Data)
                    // 3. Current user is an ADMIN
                    boolean isOwner = resource.getOwner() != null && resource.getOwner().getId().equals(currentUser.getId());
                    boolean hasNoOwner = resource.getOwner() == null;
                    boolean isAdmin = currentUser.getRole() == User.Role.ADMIN;

                    if (isOwner || hasNoOwner || isAdmin) {
                        resourceRepository.delete(resource);
                        return ResponseEntity.ok().build();
                    }
                    return ResponseEntity.status(403).body("Error: You don't have permission to delete this resource");
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
