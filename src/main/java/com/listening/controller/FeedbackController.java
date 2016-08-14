package com.listening.controller;

import com.listening.domain.Feedback;
import com.listening.serviceManager.FeedbackManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
    @ResponseBody
    public Map<String,Object> addFeedback(Feedback feedback){
        return feedbackManager.addFeedback(feedback);
    }
}
