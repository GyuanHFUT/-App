package com.listening.controller;

import com.listening.domain.User;
import com.listening.serviceManager.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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

    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addUser(User user){
        return userManager.addUser(user);
    }
}
