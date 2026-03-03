package code.logic.tamil.ems_backend.service;
import code.logic.tamil.ems_backend.dto.EmployeeDto;
import code.logic.tamil.ems_backend.entity.Department;
import code.logic.tamil.ems_backend.entity.Employee;
import code.logic.tamil.ems_backend.repository.DepartmentRepository;
import code.logic.tamil.ems_backend.repository.EmployeeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)            //check the service test logic using mock obejcts
class EmployeeServiceManyToManyMockTest {

    @Mock
    private EmployeeRepository employeeRepository;       //fake repository 1

    @Mock
    private DepartmentRepository departmentRepository;         //fake repository 2

    @InjectMocks
    private EmployeeServiceImpl employeeService;

    @Test
    void testCreateEmployeeWithManyDepartments() {

        // GIVEN - Departments
        Department dept1 = new Department();
        dept1.setId(1L);
        dept1.setDepartmentName("IT");

        Department dept2 = new Department();
        dept2.setId(2L);

        dept2.setDepartmentName("HR");

        // Employee entity returned by repo
        Employee employee = new Employee();
        employee.setId(1L);
        employee.setFirstName("Kaja");
        employee.setLastName("Pushpa");
        employee.setEmail("kaja@gmail.com");
        employee.setDepartments(new HashSet<>(Arrays.asList(dept1, dept2)));

        // Employee DTO coming from controller
        EmployeeDto dto = new EmployeeDto();
        dto.setFirstName("Kaja");
        dto.setLastName("Pushpa");
        dto.setEmail("kaja@gmail.com");
        dto.setDepartmentIds(Arrays.asList(1L, 2L));

        // Mock behaviour define
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(dept1));
        when(departmentRepository.findById(2L)).thenReturn(Optional.of(dept2));

        // Mock employeeRepository.save
        when(employeeRepository.save(any(Employee.class))).thenReturn(employee);

        // WHEN
        EmployeeDto saved = employeeService.createEmployee(dto);

        // THEN
        assertNotNull(saved);
        assertEquals("Kaja", saved.getFirstName());
        assertEquals(2, saved.getDepartmentIds().size()); // check Many-to-Many departments

        verify(employeeRepository, times(1)).save(any(Employee.class));
        verify(departmentRepository, times(1)).findById(1L);
        verify(departmentRepository, times(1)).findById(2L);
    }


}

