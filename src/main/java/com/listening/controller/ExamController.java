package com.listening.controller;

import com.listening.domain.Exam;
import com.listening.serviceManager.ExamManager;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Created by Asus on 2016/8/5.
 */
@Controller
@RequestMapping(value = "/exam")
public class ExamController {

    @Autowired
    ExamManager examManager;

    @RequestMapping(value = "/showExamOfListen")
    @ResponseBody
    public List<Exam> showExamOfListen(){
        Map<String, Object> map = new HashMap<String, Object>();
        int s = examManager.showExamOfType();
        List<Exam> exams = examManager.showExamOfListen(s);
        return exams;
    }

    @RequestMapping(value = "/addExamOfMistake")
    @ResponseBody
    public Map<String, Object> addExamOfMistake(@RequestBody JSONObject jsonObject){
        Map<String, Object> map = new HashMap<String, Object>();
        examManager.addExamOfMistake(jsonObject);
        map.put("success",true);
        map.put("msg","添加成功！");
        return map;
    }







}
