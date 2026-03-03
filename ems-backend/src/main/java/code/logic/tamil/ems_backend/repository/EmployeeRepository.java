package code.logic.tamil.ems_backend.repository;

import code.logic.tamil.ems_backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByDepartments_Id(Long departmentId);
}