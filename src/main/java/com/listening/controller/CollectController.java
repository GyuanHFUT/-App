package com.listening.controller;

import com.listening.domain.Collect;
import com.listening.domain.Exam;
import com.listening.domain.User;
import com.listening.serviceManager.CollectManager;
import com.listening.util.active.ActiveUtils;
import com.listening.util.session.SessionUtils;
import net.sf.json.JSONArray;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Asus on 2016/7/25.
 */
@Controller
@RequestMapping(value = "/collect")
public class CollectController {
    private static Logger logger = Logger.getLogger(CollectController.class);

    @Autowired
    private CollectManager collectManager;

    @RequestMapping(value = "/addCollect/{listen_id}")
    @ResponseBody
    public Map<String, Object> addCollect(@PathVariable("listen_id") int listen_id){
        Map<String, Object> map = new HashMap<String, Object>();
        User user = SessionUtils.getCurrentUser();
        int user_id = user.getUser_id();
        return collectManager.addCollect(user_id, listen_id);
/*        map.put("success", true);
        map.put("msg", "收藏成功！");
        return map;*/
    }

    @RequestMapping(value = "/showCollectByUser")
    public ModelAndView showCollectByUser(){
        User user = SessionUtils.getCurrentUser();
        int user_id = user.getUser_id();
        List<Exam> collects = collectManager.showCollectByUser(user_id);
        JSONArray jsonArray = JSONArray.fromObject(collects);
        logger.info(jsonArray);
        String exam = jsonArray.toString();
        return new ModelAndView("collect","exam",exam);
    }

    @RequestMapping(value = "/deleteCollect/{listen_id}")
    @ResponseBody
    public Map<String, Object> deleteCollect(@PathVariable("listen_id") int listen_id){
        Map<String, Object> map = new HashMap<String, Object>();
        User user = SessionUtils.getCurrentUser();
        int user_id = user.getUser_id();
        collectManager.deleteCollect(user_id, listen_id);
        map.put("success", true);
        map.put("msg", "成功取消！");
        return map;
    }

}
