package com.listening.serviceManagerImpl;

import com.listening.domain.Feedback;
import com.listening.mapper.FeedbackMapper;
import com.listening.serviceManager.FeedbackManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Asus on 2016/8/13.
 */
@Component
public class FeedbackManagerImpl implements FeedbackManager {

    @Autowired
    FeedbackMapper feedbackMapper;

    @Override
    public Map<String, Object> addFeedback(Feedback feedback) {
        Map<String, Object> map = new HashMap<String, Object>();
        String phone_number = feedback.getPhone_number();
        String feedback_info = feedback.getFeedback_info();
        feedbackMapper.insertFeedback(phone_number,feedback_info);
        map.put("success",true);
        map.put("msg","感谢您的宝贵建议，有你我们会做的更好！");
        return map;
    }
}
