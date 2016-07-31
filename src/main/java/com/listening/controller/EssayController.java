package com.listening.controller;

import com.listening.domain.Essay;
import com.listening.serviceManager.EssayManager;
import com.listening.util.number.RandomNumber;
import com.listening.util.random.RandomTitle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Asus on 2016/7/31.
 */
@Controller
@RequestMapping(value = "/essay")
public class EssayController {

    @Autowired
    EssayManager essayManager;

    @RequestMapping(value = "/showAllEssay")
    @ResponseBody
    public Map<String, Object> showAllEssay(){
        Map<String, Object> map = new HashMap<String, Object>();
        List<List> essays = essayManager.showAllEssay();
        int s1 = 0;
        int count = essays.size();
        int s2 = s1+count-1;
        List<List> essay = RandomTitle.reconstructList(essays, s1, s2, count);
        map.put("essay", essay);
        map.put("success", true);
        map.put("msg", "查询成功！");
        return map;
    }
}
