package code.logic.tamil.ems_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import code.logic.tamil.ems_backend.entity.Department;

//handle database operations
public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
