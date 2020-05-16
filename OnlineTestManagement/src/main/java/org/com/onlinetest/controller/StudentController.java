package org.com.onlinetest.controller;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import org.com.onlinetest.exception.RecordNotFoundException;
import org.com.onlinetest.model.Assessment;
import org.com.onlinetest.model.Question;
import org.com.onlinetest.model.Student;
import org.com.onlinetest.service.QuestionService;
import org.com.onlinetest.service.StudentService;
import org.com.onlinetest.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:4300")
@RequestMapping("/Student")
public class StudentController {

	@Autowired
	private StudentService stdService;
	@Autowired
	private TestService testservice;
	@Autowired
	private QuestionService questionservice;
	
//will add new student
	@PostMapping("/addStudent")
	public Student addStudent(@RequestBody Student std) {

		return stdService.addStudent(std);

	}

//will be used to update student details.
	@PutMapping("/updateStudent")
	public ResponseEntity<Student> updateStudent( @RequestBody Student studentDetails)
			throws RecordNotFoundException {

		return stdService.updateStudent( studentDetails);
	}
	

//used to delete student details.
	@DeleteMapping("/deleteStudent/{id}")
	public String deleteStudent(@PathVariable(value = "id") BigInteger stdId) throws RecordNotFoundException {

		return stdService.deleteStudent(stdId);
	}

//to get student By his id.
	@GetMapping("/findStudentById/{id}")
	public ResponseEntity<Student> getStudentById(@PathVariable(value = "id") BigInteger stdId)
			throws RecordNotFoundException {

		return stdService.getStudentById(stdId);
	}
	

//to get the list of all students.
	@GetMapping("/AllStudents")
	public List<Student> getAllStudent(BigInteger stdId) {

		return stdService.getAllStudent(stdId);

	}
	
//get test id by student id to call take test.
		@GetMapping("/getTestByStudentId/{id}")
		public ResponseEntity<Question[]> getTestIdByStudentId(@PathVariable("id") BigInteger studentId)
				throws RecordNotFoundException {

			BigInteger tid= stdService.getTestByStudentId(studentId);
			 return questionservice.getQuestionById(tid);
			
			
		}
		
	
	
//to get the result of student.
	public BigDecimal getResult(Assessment test) {
		try {
			return testservice.calculateTotalMarks(test.getTestId());
		}
		catch(RecordNotFoundException e) {
			e.printStackTrace();
		}
		return null;
	}
	
//login
	@GetMapping("/login/{loginName}/{password}")
	public BigInteger validStudentLogin(@PathVariable("loginName") String loginName,@PathVariable("password") String password) {
		return stdService.checkLogin(loginName,password);
	}

	
	 
	
	

	}

		

