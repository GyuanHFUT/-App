package com.listening.domain;

/**
 * Created by Asus on 2016/7/25.
 */
public class Mistake {
    private int mistake_id;
    private int user_id;
    private int listen_id;

    public int getMistake_id() {
        return mistake_id;
    }

    public void setMistake_id(int mistake_id) {
        this.mistake_id = mistake_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getListen_id() {
        return listen_id;
    }

    public void setListen_id(int listen_id) {
        this.listen_id = listen_id;
    }
}
