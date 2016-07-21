package com.listening.serviceManagerImpl;

import com.listening.domain.User;
import com.listening.mapper.UserMapper;
import com.listening.serviceManager.UserManager;
import com.listening.util.exception.MessageException;
import org.aspectj.bridge.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.test.context.transaction.AfterTransaction;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Asus on 2016/7/20.
 */
@Component
public class UserManagerImpl implements UserManager {
    @Autowired
    private UserMapper userMapper;

    @Override
    public Map<String, Object> addUser(User user) {
        Map<String, Object> map = new HashMap<String, Object>();

        if(user!=null){
            if(StringUtils.isEmpty(user.getUser_name())||StringUtils.isEmpty(user.getUser_pwd())||StringUtils.isEmpty(user.getUser_nickname())){
                map.put("success", false);
                map.put("msg", "请将用户信息补全！");
            }else if (userMapper.selectUserByName(user.getUser_name())!=null){
                map.put("success", false);
                map.put("msg", "此用户已存在！");
            }else{
                userMapper.insertUser(user);
                map.put("success", true);
                map.put("msg", "用户注册成功！");
            }

        }else{
            map.put("success",false);
            map.put("msg", "用户数据不能为空！");
        }

        return map;
    }

    @Override
    public User userLogin(User user) {

        if(StringUtils.isEmpty(user.getUser_name())||StringUtils.isEmpty(user.getUser_pwd())){
            throw new MessageException("用户名或密码不能为空！");
        }else {
            User user1 = userMapper.selectUserByName(user.getUser_name());
            if(user1 == null){
               throw new MessageException("此用户不存在，请重新输入！");
            }else if(!(user1.getUser_pwd().equals(user.getUser_pwd()))){
                throw new MessageException("密码不正确，请重新输入！");
            }else {
                User user2 = userMapper.userLogin(user.getUser_name(), user.getUser_pwd());
                return user2;
            }

        }

    }
}
