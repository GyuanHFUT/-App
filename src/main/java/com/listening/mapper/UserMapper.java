package com.listening.mapper;

import com.listening.domain.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

/**
 * Created by Asus on 2016/7/20.
 */
@Component
public interface UserMapper {
    public void insertUser(User user);
    public User selectUserByName(String user_name);
    public User userLogin(@Param(value = "user_name") String user_name, @Param(value="user_pwd") String user_pwd);
}
