package com.listening.controller;

import com.listening.domain.Exam;
import com.listening.domain.Mistake;
import com.listening.domain.User;
import com.listening.serviceManager.MistakeManager;
import com.listening.util.active.ActiveUtils;
import com.listening.util.session.SessionUtils;
import net.sf.json.JSONArray;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Asus on 2016/7/25.
 */
@Controller
@RequestMapping(value = "/mistake")
public class MistakeController {
    private static Logger logger = Logger.getLogger(MistakeController.class);

    @Autowired
    private MistakeManager mistakeManager;

    @RequestMapping(value = "/addMistake/{listen_id}")
    @ResponseBody
    public Map<String, Object> addMistake(@PathVariable("listen_id") int listen_id){
        Map<String, Object> map = new HashMap<String, Object>();
        User user = SessionUtils.getCurrentUser();
        if(user==null){
            return null;
        }else {
            int user_id = user.getUser_id();
            mistakeManager.addMistake(user_id, listen_id);
            map.put("success", true);
            map.put("msg", "添加成功！");
            return map;
        }
    }

    @RequestMapping(value = "/showMistakeByUser")
    public ModelAndView showMistakeByUser(){
        //Map<String, Object> map = new HashMap<String, Object>();
        User user = SessionUtils.getCurrentUser();
        int user_id = user.getUser_id();
        List<Exam> mistakes = mistakeManager.showMistakeByUser(user_id);
        ActiveUtils.insertActive(mistakes);
        JSONArray jsonArray = JSONArray.fromObject(mistakes);
        logger.info(jsonArray);
        String exam = jsonArray.toString();
        return new ModelAndView("/mistakes","exam",exam);
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
