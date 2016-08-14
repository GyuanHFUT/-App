package com.listening.controller;

import com.listening.domain.Exam;
import com.listening.domain.ShortDialogue;
import com.listening.domain.User;
import com.listening.serviceManager.CollectManager;
import com.listening.serviceManager.ShortDialogueManager;
import com.listening.util.active.ActiveUtils;
import com.listening.util.session.SessionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Asus on 2016/7/30.
 */
@Controller
@RequestMapping(value = "/shortDialogue")
public class ShortDialogueController {

    @Autowired
    private ShortDialogueManager shortDialogueManager;

    @RequestMapping(value = "/showAllShortDialogue")
    @ResponseBody
    public Map<String, Object> showAllShortDialogue(){
        Map<String, Object> map = new HashMap<String, Object>();
        List<ShortDialogue> shortDialogues = shortDialogueManager.showAllShortDialogue();
        ActiveUtils.insertActive(shortDialogues);
        map.put("shortDialogues", shortDialogues);
        map.put("success", true);
        map.put("msg", "查询成功！");
        return map;
    }
}
