package com.example.gewerbeanmeldung.Question;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path = "")
public class QuestionController {

	
	@Autowired
	QuestionService questionService;
	
	//Lists all Questions 
		@CrossOrigin
		@RequestMapping(path = "/frage")
		public List<Question> getAllQuestions() {	
			return questionService.getAllQuestions();
		}
		
	//Get a specific Question by ID
	@CrossOrigin
	@RequestMapping(path = "frage/{id}")
	public Question getQuestionById(@PathVariable Integer id) {
		return questionService.getQuestionById(id);
	}
		
	//Gets all Questions with specific form-type
	@CrossOrigin
	@RequestMapping(path = "type/{formType}")
	public List<Question> getByFormType(@PathVariable String formType){
		return questionService.getByFormType(formType);
	}
	
	//Add a new Question
	@CrossOrigin
	@RequestMapping(
	 method = RequestMethod.POST,
	 value = "frage/add")
	 public Question saveQuestion(@RequestBody Question question) {
	     return questionService.saveQuestion(question);
	}
	
	//Edit a specific Question 
	@CrossOrigin
	@RequestMapping(
	 method = RequestMethod.PUT,
	 value = "frage/{id}/edit")
	 public Question editQuestion(@PathVariable Integer id, @RequestBody Question question) {
	     return questionService.editQuestion(question, id);
	}
	
	//Deletes a specific Question
	@CrossOrigin
	@RequestMapping(
	method = RequestMethod.DELETE,value = "frage/{id}/delete")
	public String deleteQuestionById(@PathVariable Integer id) {
		questionService.deleteQuestionById(id);
			  return "deleted";
	}
	
}
