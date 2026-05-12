package com.campus.resource.sharing.system.controller;

import com.campus.resource.sharing.system.entity.Booking;
import com.campus.resource.sharing.system.entity.Resource;
import com.campus.resource.sharing.system.entity.User;
import com.campus.resource.sharing.system.repository.BookingRepository;
import com.campus.resource.sharing.system.repository.ResourceRepository;
import com.campus.resource.sharing.system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    ResourceRepository resourceRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/my")
    @PreAuthorize("hasRole('STUDENT') or hasRole('FACULTY')")
    public List<Booking> getMyBookings() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).get();
        return bookingRepository.findByUser(user);
    }

    @PostMapping("/resource/{resourceId}")
    @PreAuthorize("hasRole('STUDENT') or hasRole('FACULTY')")
    public ResponseEntity<?> bookResource(@PathVariable Long resourceId, @RequestBody Booking bookingRequest) {
        return resourceRepository.findById(resourceId)
                .map(resource -> {
                    if (resource.getStatus() != Resource.Status.AVAILABLE) {
                        return ResponseEntity.badRequest().body("Resource is not available");
                    }

                    String username = SecurityContextHolder.getContext().getAuthentication().getName();
                    User user = userRepository.findByUsername(username).get();

                    resource.setStatus(Resource.Status.BOOKED);
                    resourceRepository.save(resource);

                    Booking booking = Booking.builder()
                            .resource(resource)
                            .user(user)
                            .startTime(bookingRequest.getStartTime())
                            .endTime(bookingRequest.getEndTime())
                            .qrCodeIdentifier(UUID.randomUUID().toString())
                            .status(Booking.Status.ACTIVE)
                            .build();

                    return ResponseEntity.ok(bookingRepository.save(booking));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/complete")
    @PreAuthorize("hasRole('STUDENT') or hasRole('FACULTY') or hasRole('ADMIN')")
    public ResponseEntity<?> completeBooking(@PathVariable Long id) {
        return bookingRepository.findById(id)
                .map(booking -> {
                    booking.setStatus(Booking.Status.COMPLETED);
                    booking.getResource().setStatus(Resource.Status.AVAILABLE);
                    
                    // Reward logic
                    User owner = booking.getResource().getOwner();
                    owner.setRewardPoints(owner.getRewardPoints() + 10);
                    userRepository.save(owner);
                    
                    resourceRepository.save(booking.getResource());
                    return ResponseEntity.ok(bookingRepository.save(booking));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
