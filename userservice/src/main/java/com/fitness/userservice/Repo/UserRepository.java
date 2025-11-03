package com.fitness.userservice.Repo;

import com.fitness.userservice.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,String> {

    Boolean existsByEmail(String email);
    boolean existsByKeycloakId(String userId);
    User findByEmail( String email);
}
