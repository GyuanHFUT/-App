package com.listening.controller;

import com.listening.domain.LongDialogue;
import com.listening.serviceManager.LongDialogueManager;
import com.listening.util.random.RandomTitle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Asus on 2016/7/30.
 */
@Controller
@RequestMapping(value = "/longDialogue")
public class LongDialogueController {

    @Autowired
    LongDialogueManager longDialogueManager;

    @RequestMapping(value = "/showAllLongDialogue")
    @ResponseBody
    public Map<String, Object> showAllLongDialogue(){
        Map<String, Object> map = new HashMap<String, Object>();
        List<List> longDialogues = longDialogueManager.showAllLongDialogue();
        int s1 = 0;
        int count = longDialogues.size();
        int s2 = s1+count-1;
        List<List> longDialogue = RandomTitle.reconstructList(longDialogues, s1, s2, count);
        map.put("longDialogue", longDialogue);
        map.put("success", true);
        map.put("msg", "查询成功！");
        return map;
    }

}
