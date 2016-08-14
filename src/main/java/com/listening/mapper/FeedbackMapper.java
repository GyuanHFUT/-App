package com.listening.mapper;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

/**
 * Created by Asus on 2016/8/13.
 */
@Component
public interface FeedbackMapper {
    void insertFeedback(@Param(value = "phone_number") String phone_number,@Param(value = "feedback_info") String feedback_info);
}
