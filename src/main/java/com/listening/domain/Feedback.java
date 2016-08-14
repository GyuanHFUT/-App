package com.listening.domain;

/**
 * Created by Asus on 2016/8/14.
 */
public class Feedback {
    private int feedback_id;
    private String phone_number;
    private String feedback_info;

    public int getFeedback_id() {
        return feedback_id;
    }

    public void setFeedback_id(int feedback_id) {
        this.feedback_id = feedback_id;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getFeedback_info() {
        return feedback_info;
    }

    public void setFeedback_info(String feedback_info) {
        this.feedback_info = feedback_info;
    }
}
