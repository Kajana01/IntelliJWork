package code.logic.tamil.ems_backend.mapper;

import code.logic.tamil.ems_backend.dto.EmployeeDto;
import code.logic.tamil.ems_backend.entity.Employee;
import code.logic.tamil.ems_backend.entity.Department;

import java.util.stream.Collectors;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee){
        EmployeeDto dto = new EmployeeDto();
        dto.setId(employee.getId());
        dto.setFirstName(employee.getFirstName());
        dto.setLastName(employee.getLastName());
        dto.setEmail(employee.getEmail());

        dto.setDepartmentIds(
                employee.getDepartments().stream()
                        .map(Department::getId)
                        .collect(Collectors.toList())
        );

        dto.setDepartmentNames(
                employee.getDepartments().stream()
                        .map(Department::getDepartmentName)
                        .collect(Collectors.toList())
        );

        return dto;
    }
}