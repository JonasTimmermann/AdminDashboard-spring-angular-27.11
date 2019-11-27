package com.example.gewerbeanmeldung.Question;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gewerbeanmeldung.Choices.Choices;
import com.example.gewerbeanmeldung.Choices.ChoicesService;
import com.example.gewerbeanmeldung.QuestionCategory.QuestionCategory;
import com.example.gewerbeanmeldung.QuestionCategory.QuestionCategoryService;



@Service
public class QuestionService {

	@Autowired
	private QuestionRepository questionRepo;

	@Autowired
	private ChoicesService choiceService;
	
	@Autowired
	private QuestionCategoryService questionCategoryService;
	
		//Lists all questions
		public List<Question> getAllQuestions() {
			List<Question>frageList = new ArrayList<>();
			questionRepo.findAll().forEach(frageList::add);
			return frageList;
		}
		//Lists all questions of a specific FormType
		public List<Question> getByFormType(String formType) {
			List<Question>frageList = new ArrayList<>();
			questionRepo.findByFormType(formType).forEach(frageList::add);;
			return frageList;
		}

		//Saves a Question
		public Question saveQuestion(Question question) {
			questionRepo.save(question);
			return question;
		}

		//Gets a specific Question by it's id
		public Question getQuestionById(Integer id) {
			return questionRepo.findById(id).orElse(null);
		}

		//Edits a specific Question
		public Question editQuestion(Question question, Integer id) {
			
			question.setId(id);
			question.getQuestionType().setId(id);
			//Gets all old Data of the Question, which is going to be updated
			Question q = getQuestionById(id);
			
			//Sets all Ids of the old Choices from the Question to the probably
			//new choices of new question. So we don't create new Choices, but update existing
			List<Choices> c = q.getQuestionType().getChoices();
			Integer size = c.size();
			List<Choices> delete_choices_candidates = new ArrayList<>();
			for(int i = 0; i < size; i++) {
				if(question.getQuestionType().getChoices() != null && 
				   question.getQuestionType().getChoices().size() > i) {
					question.getQuestionType().getChoices().get(i).setId(c.get(i).getId());
				}else {
					delete_choices_candidates.add(c.get(i));
				}
			}
			
			//Get the QuestionCategory IDs from the old instance of the Question and 
			//overtakes these for the new QuestionCategory. So we will update this instance 
			//and not creating a new one
			List<QuestionCategory> qc = q.getQuestionCategories();
			Integer size2 = qc.size();
			List<QuestionCategory> delete_question_category_candidates = new ArrayList<>();
			for(int i = 0; i < size2 ; i++) {
				if(question.getQuestionCategories() != null && 
				   question.getQuestionCategories().size() > i) {
					question.getQuestionCategories().get(i).setId(qc.get(i).getId());
				}else {
					delete_question_category_candidates.add(qc.get(i));
				}
			}
			question = questionRepo.save(question);
			choiceService.deleteAllChoices(delete_choices_candidates);
			questionCategoryService.deleteAllCategories(delete_question_category_candidates);
			
			return question;
		}

		
		//Deletes a question by it's ID
		public void deleteQuestionById(Integer id) {
			questionRepo.deleteById(id);
		}

}
