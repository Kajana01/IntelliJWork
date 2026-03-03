package code.logic.tamil.ems_backend.entity;

import code.logic.tamil.ems_backend.entity.Employee;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "departments")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Department {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "department_name", nullable = false)
    private String departmentName;

    // Department.java
    @ManyToMany(mappedBy = "departments")
    @JsonIgnore
    private List<Employee> employees;


}

