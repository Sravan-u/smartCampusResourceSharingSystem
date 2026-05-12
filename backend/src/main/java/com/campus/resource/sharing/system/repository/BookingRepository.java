package com.campus.resource.sharing.system.repository;

import com.campus.resource.sharing.system.entity.Booking;
import com.campus.resource.sharing.system.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);
    List<Booking> findByStatus(Booking.Status status);
}
