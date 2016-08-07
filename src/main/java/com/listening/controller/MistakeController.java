package com.listening.controller;

import com.listening.domain.Mistake;
import com.listening.domain.User;
import com.listening.serviceManager.MistakeManager;
import com.listening.util.session.SessionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Asus on 2016/7/25.
 */
@Controller
@RequestMapping(value = "/mistake")
public class MistakeController {

    @Autowired
    private MistakeManager mistakeManager;

    @RequestMapping(value = "/addMistake/{listen_id}")
    @ResponseBody
    public Map<String, Object> addMistake(@PathVariable("listen_id") int listen_id){
        Map<String, Object> map = new HashMap<String, Object>();
        User user = SessionUtils.getCurrentUser();
        int user_id = user.getUser_id();
        mistakeManager.addMistake(user_id, listen_id);
        map.put("success", true);
        map.put("msg", "收藏成功！");
        return map;
    }

    @RequestMapping(value = "/showMistakeByUser")
    @ResponseBody
    public Map<String, Object> showMistakeByUser(){
        Map<String, Object> map = new HashMap<String, Object>();
        User user = SessionUtils.getCurrentUser();
        int user_id = user.getUser_id();
        List<Mistake> mistakes = mistakeManager.showMistakeByUser(user_id);
        map.put("mistakes", mistakes);
        map.put("success", true);
        map.put("msg", "查询成功！");
        return map;
    }

    @RequestMapping(value = "/deleteMistake/{listen_id}")
    @ResponseBody
    public Map<String, Object> deleteMistake(@PathVariable("listen_id") int listen_id){
        Map<String, Object> map = new HashMap<String, Object>();
        User user = SessionUtils.getCurrentUser();
        int user_id = user.getUser_id();
        mistakeManager.deleteMistake(user_id, listen_id);
        map.put("success", true);
        map.put("msg", "成功取消！");
        return map;
    }

}