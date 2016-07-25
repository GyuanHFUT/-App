package com.listening.controller;

import com.listening.domain.User;
import com.listening.domain.Word;
import com.listening.serviceManager.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Asus on 2016/7/20.
 */
@Controller
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private UserManager userManager;

    @RequestMapping(value = "/userLogin", method  = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> userLogin(User user){
        Map<String, Object> map = new HashMap<String, Object>();
        User user1 = userManager.userLogin(user);
        map.put("user", user1);
        map.put("success", true);
        map.put("msg", "登陆成功！");
        return map;
    }
    //判断用户名是否已经注册过
    @RequestMapping(value = "/userMapping", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> userMapping(@RequestParam(value = "user_name") String user_name){
            return userManager.userMapping(user_name);
    }

    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addUser(@RequestParam(value = "user_name") String user_name, @RequestParam(value = "user_pwd") String user_pwd, @RequestParam(value = "user_nickname") String user_nickname, @RequestParam(value = "user_code") String user_code){

            return userManager.addUser(user_name, user_pwd, user_nickname, user_code);

    }

    @RequestMapping(value = "/sentUserCode", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> sentUserCode(@RequestParam(value = "user_name") String user_name) {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
             map = userManager.sentUserCode(user_name);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return map;
    }

    @RequestMapping(value = "/backUserPwd", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> backUserPwd(@RequestParam(value = "user_name") String user_name, @RequestParam(value = "user_pwd") String user_pwd, @RequestParam(value = "user_code") String user_code) {
            return userManager.backUserPwd(user_name, user_pwd, user_code);
    }


}
