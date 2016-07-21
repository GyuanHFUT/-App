package com.listening.serviceManager;

import com.listening.domain.User;

import java.util.Map;

/**
 * Created by Asus on 2016/7/20.
 */
public interface UserManager {
    public Map<String, Object> addUser(User user);
    public User userLogin(User user);
}
