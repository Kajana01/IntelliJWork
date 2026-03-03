package code.logic.tamil.ems_backend.service;

import code.logic.tamil.ems_backend.dto.EmployeeDto;
import code.logic.tamil.ems_backend.entity.Department;
import code.logic.tamil.ems_backend.entity.Employee;
import code.logic.tamil.ems_backend.exception.ResourceNotFoundException;
import code.logic.tamil.ems_backend.mapper.EmployeeMapper;
import code.logic.tamil.ems_backend.repository.DepartmentRepository;
import code.logic.tamil.ems_backend.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    @Override
    @Transactional
    public EmployeeDto createEmployee(EmployeeDto dto) {
        Employee employee = new Employee();
        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setEmail(dto.getEmail());

        // Convert departmentIds to Department entities
        Set<Department> departments = dto.getDepartmentIds().stream()
                .map(id -> departmentRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Department not found: " + id)))
                .collect(Collectors.toSet());

        employee.setDepartments(departments);

        Employee saved = employeeRepository.save(employee);

        // Map back to DTO
        EmployeeDto result = new EmployeeDto();
        result.setId(saved.getId());
        result.setFirstName(saved.getFirstName());
        result.setLastName(saved.getLastName());
        result.setEmail(saved.getEmail());
        // map departments to IDs
        result.setDepartmentIds(
                saved.getDepartments().stream().map(Department::getId).collect(Collectors.toList())
        );

        return result;
    }
    @Override
    @Transactional(readOnly = true)
    public EmployeeDto getEmployeeById(long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeDto> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(EmployeeMapper::mapToEmployeeDto)
                .collect(Collectors.toList());
    }

    @Override

    @Transactional
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());


        // In your EmployeeService updateEmployee method:
        employee.getDepartments().clear();
        List<Department> deptList = departmentRepository.findAllById(updatedEmployee.getDepartmentIds());
        employee.setDepartments(new HashSet<>(deptList));


        Employee saved = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(saved);
    }


    @Override
    @Transactional
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
        employeeRepository.delete(employee);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeDto> getEmployeesByDepartment(Long departmentId) {
        List<Employee> employees = employeeRepository.findByDepartments_Id(departmentId);
        return employees.stream()
                .map(EmployeeMapper::mapToEmployeeDto)
                .collect(Collectors.toList());
    }
}