package com.listening.controller;

import com.listening.domain.Blank;
import com.listening.serviceManager.BlankManager;
import com.listening.util.active.ActiveUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Asus on 2016/7/31.
 */
@Controller
@RequestMapping(value = "/blank")
public class BlankController {

    @Autowired
    BlankManager blankManager;

    @RequestMapping(value = "/showAllBlank")
    @ResponseBody
    public Map<String, Object> showAllBlank(){
        Map<String, Object> map = new HashMap<String, Object>();
        List<Blank> blanks = blankManager.showAllBlank();
        ActiveUtils.insertActive(blanks);
        map.put("blanks", blanks);
        map.put("success", true);
        map.put("msg", "查询成功！");
        return map;
    }
}
