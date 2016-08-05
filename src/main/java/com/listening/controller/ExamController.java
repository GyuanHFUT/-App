package com.listening.controller;

import com.listening.domain.Exam;
import com.listening.serviceManager.ExamManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
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
    public Map<String, Object> showExamOfListen(){
        Map<String, Object> map = new HashMap<String, Object>();
        int s = examManager.showExamOfType();
        List<Exam> list = examManager.showExamOfListen(s);
        map.put("list", list);
        map.put("success", true);
        map.put("msg", "查询成功！");
        return map;
    }
}
