package com.listening.serviceManager;

import com.listening.domain.Feedback;

import java.util.Map;

/**
 * Created by Asus on 2016/8/13.
 */
public interface FeedbackManager {

    Map<String,Object> addFeedback(Feedback feedback);
}
