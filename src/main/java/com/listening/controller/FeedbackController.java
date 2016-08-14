package com.listening.controller;

import com.listening.domain.Feedback;
import com.listening.domain.User;
import com.listening.serviceManager.FeedbackManager;
import com.listening.util.session.SessionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;

/**
 * Created by Asus on 2016/8/13.
 */
@Controller
@RequestMapping(value = "/feedback")
public class FeedbackController {

    @Autowired
    FeedbackManager feedbackManager;

    @RequestMapping(value = "/addFeedback")
    public String addFeedback(Feedback feedback) {
        User user = SessionUtils.getCurrentUser();
        feedbackManager.addFeedback(feedback);
        if(user==null){
            return "choice_que";
        }else{
            return "redirect:/user/showUserMessage";
        }
    }
}
