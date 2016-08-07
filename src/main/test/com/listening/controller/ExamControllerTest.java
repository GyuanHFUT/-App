package com.listening.controller;

import com.listening.domain.Exam;
import com.listening.serviceManager.ExamManager;
import com.listening.serviceManagerImpl.ExamManagerImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.*;

/**
 * Created by Asus on 2016/8/5.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:test-mybatis.xml","classpath:spring-mybatis.xml"})
public class ExamControllerTest {

    ExamManagerImpl examManager = new ExamManagerImpl();

    @Test
    public void testShowExamOfListen() throws Exception {
        //Map<String, Object> map = new HashMap<String, Object>();
        int s = examManager.showExamOfType();
        System.out.println(s);
        List<Exam> exams = examManager.showExamOfListen(s);
        for(int i=0;i<exams.size();i++){
            System.out.println(exams.get(i));
        }
        /*map.put("exams", exams);
        map.put("success", true);
        map.put("msg", "查询成功！");*/
        //return map;
    }
}