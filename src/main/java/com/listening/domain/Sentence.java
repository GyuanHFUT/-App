package com.listening.domain;

/**
 * Created by Asus on 2016/8/13.
 */
public class Sentence {
    private int sentence_id;
    private String picture_url;
    private String sentence_chinese;
    private String sentence_english;

    public int getSentence_id() {
        return sentence_id;
    }

    public void setSentence_id(int sentence_id) {
        this.sentence_id = sentence_id;
    }

    public String getPicture_url() {
        return picture_url;
    }

    public void setPicture_url(String picture_url) {
        this.picture_url = picture_url;
    }

    public String getSentence_chinese() {
        return sentence_chinese;
    }

    public void setSentence_chinese(String sentence_chinese) {
        this.sentence_chinese = sentence_chinese;
    }

    public String getSentence_english() {
        return sentence_english;
    }

    public void setSentence_english(String sentence_english) {
        this.sentence_english = sentence_english;
    }
}
