package com.listening.mapper;

import org.springframework.stereotype.Component;

/**
 * Created by Asus on 2016/8/13.
 */
@Component
public interface FeedbackMapper {
    void insertFeedback(String phone_number, String feedback_info);
}
