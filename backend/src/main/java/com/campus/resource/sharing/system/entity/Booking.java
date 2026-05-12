package com.campus.resource.sharing.system.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "resource_id")
    private Resource resource;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private String qrCodeIdentifier;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    public Booking() {}

    public Booking(Resource resource, User user, LocalDateTime startTime, LocalDateTime endTime, String qrCodeIdentifier, Status status) {
        this.resource = resource;
        this.user = user;
        this.startTime = startTime;
        this.endTime = endTime;
        this.qrCodeIdentifier = qrCodeIdentifier;
        this.status = status;
    }

    public static BookingBuilder builder() {
        return new BookingBuilder();
    }

    public static class BookingBuilder {
        private Resource resource;
        private User user;
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private String qrCodeIdentifier;
        private Status status;

        public BookingBuilder resource(Resource resource) { this.resource = resource; return this; }
        public BookingBuilder user(User user) { this.user = user; return this; }
        public BookingBuilder startTime(LocalDateTime startTime) { this.startTime = startTime; return this; }
        public BookingBuilder endTime(LocalDateTime endTime) { this.endTime = endTime; return this; }
        public BookingBuilder qrCodeIdentifier(String qrCodeIdentifier) { this.qrCodeIdentifier = qrCodeIdentifier; return this; }
        public BookingBuilder status(Status status) { this.status = status; return this; }
        public Booking build() { return new Booking(resource, user, startTime, endTime, qrCodeIdentifier, status); }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Resource getResource() { return resource; }
    public void setResource(Resource resource) { this.resource = resource; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    public String getQrCodeIdentifier() { return qrCodeIdentifier; }
    public void setQrCodeIdentifier(String qrCodeIdentifier) { this.qrCodeIdentifier = qrCodeIdentifier; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public enum Status {
        PENDING, ACTIVE, COMPLETED, CANCELLED
    }
}
