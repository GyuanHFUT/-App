package com.listening.mapper;

import com.listening.domain.Sentence;
import com.listening.domain.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Asus on 2016/7/20.
 */
@Component
public interface UserMapper {
    void insertUser(@Param(value = "user_name") String user_name, @Param(value="user_pwd") String user_pwd, @Param(value = "user_nickname") String user_nickname);
    User selectUserByName(@Param(value = "user_name") String user_name);
    User userLogin(@Param(value = "user_name") String user_name, @Param(value="user_pwd") String user_pwd);
    void updateUserByName(@Param(value = "user_name") String user_name,@Param(value="user_pwd") String user_pwd);

    void deleteUser(int user_id);

    List<Integer> selectSentenceOfType();

    Sentence selectSentenceOfId(Integer integer);
}
