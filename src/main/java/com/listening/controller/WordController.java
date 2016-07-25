package com.listening.controller;

import com.listening.domain.Word;
import com.listening.serviceManager.WordManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Asus on 2016/7/23.
 */
@Controller
@RequestMapping(value = "/word")
public class WordController {
    @Autowired
    private WordManager wordManager;

    @RequestMapping(value = "/showAllWord")
    @ResponseBody
    public Map<String, Object> showAllWord(){
        Map<String, Object> map = new HashMap<String, Object>();
        List<Word> word =  wordManager.showAllWord();
        map.put("word", word);
        map.put("success",true);
        map.put("msg", "查询成功！");
        return map;
    }
}
