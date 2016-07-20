package com.listening.controller;

import com.listening.domain.Test;
import com.listening.serviceManager.TestManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.test.context.transaction.AfterTransaction;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by Asus on 2016/7/20.
 */
@Controller
@RequestMapping(value = "/test")
public class TestController {
    @Autowired
    TestManager testManager;
    @RequestMapping(value = "/showAll")
    @ResponseBody
    public List<Test> showAll(){
        return testManager.showAll();
    }
}
