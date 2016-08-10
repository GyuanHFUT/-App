package com.listening.controller;

import com.listening.domain.Exam;
import com.listening.domain.Exama;
import com.listening.serviceManager.ExamManager;
import com.listening.util.session.SessionUtils;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
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
    public List<Exam> showExamOfListen(){
        Map<String, Object> map = new HashMap<String, Object>();
        int s = examManager.showExamOfType();
        List<Exam> exams = examManager.showExamOfListen(s);
        return exams;
    }

    @RequestMapping(value = "/acceptExamOfMessage")
    public void acceptExamOfMessage(@RequestBody JSONObject jsonObject){
        //Map<String, Object> map = new HashMap<String, Object>();
        SessionUtils.bindSession("jsonObject",jsonObject);
        try {
            examManager.addExamOfMistake(jsonObject);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "/showExamOfMistake")
    public ModelAndView showExamOfMistake(){
        JSONObject jsonObject = (JSONObject) SessionUtils.getSession().getAttribute("jsonObject");
        //JSONObject object = jsonObject.getJSONObject("wrong");
        List<Exama> exams = examManager.showExamOfMistake(jsonObject);
        Map<String,Object> map = new HashMap<String, Object>();
        map.put("exams",exams);
        JSONObject object = JSONObject.fromObject(map);
        String exam = object.toString();
        return new ModelAndView("/simulation_error","exam",exam);
    }

}
