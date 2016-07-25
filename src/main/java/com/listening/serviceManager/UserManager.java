package com.listening.serviceManager;

import com.listening.domain.User;
import com.listening.domain.Word;

import java.io.IOException;
import java.util.Map;

/**
 * Created by Asus on 2016/7/20.
 */
public interface UserManager {
    public Map<String, Object> addUser(String user_name, String user_pwd, String user_nickname, String user_code);

    public User userLogin(User user);

    public Map<String,Object> userMapping(String user_name);

    public Map<String,Object> sentUserCode(String user_name) throws IOException;

    public Map<String,Object> backUserPwd(String user_name, String user_pwd, String user_code);


}
