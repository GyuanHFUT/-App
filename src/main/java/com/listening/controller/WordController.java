package com.listening.controller;

import com.listening.domain.Exam;
import com.listening.domain.User;
import com.listening.domain.Word;
import com.listening.serviceManager.CollectManager;
import com.listening.serviceManager.WordManager;
import com.listening.util.session.SessionUtils;
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

    @Autowired
    private CollectManager collectManager;

    @RequestMapping(value = "/showAllWord")
    @ResponseBody
    public Map<String, Object> showAllWord(){
        Map<String, Object> map = new HashMap<String, Object>();
        List<Word> word =  wordManager.showAllWord();
        User user = SessionUtils.getCurrentUser();
        if(user!=null){
            int user_id = user.getUser_id();
            //List<Word> wordList = collectManager.showCollectOfWord(user_id);
            List<Exam> examList = collectManager.showCollectByUser(user_id);
            for(int i=0;i<examList.size();i++){
                for(int j=0;j<word.size();j++){
                    if(examList.get(i).getListen_id()==word.get(j).getListen_id()){
                        word.get(j).setListen_collect("active");
                        break;
                    }
                }
            }
        }
        map.put("word", word);
        map.put("success",true);
        map.put("msg", "查询成功！");
        return map;
    }
}
