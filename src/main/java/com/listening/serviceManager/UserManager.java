package com.listening.serviceManager;

import java.io.IOException;
import java.util.Map;

/**
 * Created by Asus on 2016/7/20.
 */
public interface UserManager {
    public Map<String, Object> addUser(String user_name, String user_pwd, String user_nickname, String user_code);

    public Map<String, Object> userLogin(String user_name, String user_pwd);

    public Map<String,Object> userMapping(String user_name);

    public void sentUserCode(String user_name) throws IOException;

    public Map<String,Object> backUserPwd(String user_name, String user_pwd, String user_code);


    Map<String,Object> deleteUser(int user_id);
}
