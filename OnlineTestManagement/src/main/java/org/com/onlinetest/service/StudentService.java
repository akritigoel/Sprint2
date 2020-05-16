package org.com.onlinetest.service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import org.com.onlinetest.dao.StudentDao;
import org.com.onlinetest.dao.TestDao;
import org.com.onlinetest.exception.RecordNotFoundException;
import org.com.onlinetest.model.Assessment;
import org.com.onlinetest.model.Question;
import org.com.onlinetest.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class StudentService {
	@Autowired
	private StudentDao stdDao;
	@Autowired
	private TestDao testdao;
	
	
//This service API will be called when a student wants to add himself.
	public Student addStudent(Student std)
	   {
		   return  stdDao.save(std);		   
	   }
	 
	 
//This API will update the details(name and password) of the student. 	
	    public ResponseEntity<Student> updateStudent( @RequestBody Student std)
			{
				Optional<Student> findById=stdDao.findById(std.getStudentId());
				try {
				if(findById.isPresent())
				{
					 stdDao.save(std);
					 return new ResponseEntity<Student>(std,HttpStatus.OK);		
				}
				else {
					throw new RecordNotFoundException("Record not present");
					}
				}
				catch(RecordNotFoundException e) {
				return new ResponseEntity(e.getMessage(),HttpStatus.NOT_FOUND);
				
			}
		}
		
			
//This API will delete the student details from the students list. 	  
	 public String deleteStudent(BigInteger stdId) throws RecordNotFoundException
	    {
		 Optional<Student> findById = stdDao.findById(stdId);
			if (findById.isPresent()) {
				stdDao.deleteById(stdId);
				return "deleted";
			} else {
				return "!!   Id Is Invalid   !!";
			}
	    }
	 
	 
//Below API will be called to get the lists of all students.
	 public List<Student> getAllStudent(BigInteger stdId){
	    	
		    
	    	return stdDao.findAll();   	
	    }
	 

//This API will be used to get student details  by his student Id.
	 public ResponseEntity<Student> getStudentById( BigInteger stdId) throws RecordNotFoundException {
	    	Student stdStudent=stdDao.findById(stdId).
	   	 orElseThrow(() -> new RecordNotFoundException("Test not found for the given id" +stdId));
	    	return ResponseEntity.ok().body(stdStudent);
	    }
	 
	 
//This API will be used at the time of Student login
	 public BigInteger checkLogin(String loginName,String password) {
		 Optional<BigInteger> findById=stdDao.checkLogin(loginName,password);
		 if(findById.isPresent()) {
			 BigInteger id=findById.get();
			 return id;
		 }
		 else return null;
	 }
	 
//This API will get the test assigned to the student using his student id.
		public BigInteger getTestByStudentId(BigInteger studentId)
				throws RecordNotFoundException {

			BigInteger id1= stdDao.getTestByStudentId(studentId);
			return id1;
		}

	 
//For assigning test to the student this API will be called.
	 public String assignTest(BigInteger studentId,BigInteger testId)
		{
			Optional<Student>findById=stdDao.findById(studentId);
			Optional<Assessment>test=testdao.findById(testId);
			if(findById.isPresent()&& test.isPresent())
			{
				Student student=findById.get();
				student.setTestId(testId);
				stdDao.save(student);
				return "Test Assigned";
				
			}
			return "User or Test does not exist";
			
		}
	
}
