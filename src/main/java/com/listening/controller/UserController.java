package com.listening.controller;

import com.listening.domain.User;
import com.listening.serviceManager.UserManager;
import com.listening.util.session.SessionUtils;
import com.listening.util.upload.PhotoUpload;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Asus on 2016/7/20.
 */
@Controller
@RequestMapping(value = "/user")
public class UserController {
    private static Logger logger = Logger.getLogger(UserController.class);

    @Autowired
    private UserManager userManager;

    @RequestMapping(value = "/userLogin", method  = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> userLogin(@RequestParam(value = "user_name") String user_name, @RequestParam(value = "user_pwd") String user_pwd){
        //Map<String, Object> map = new HashMap<String, Object>();
        return userManager.userLogin(user_name,user_pwd);
        //map.put("user", user1);
        //map.put("success", true);
        //map.put("msg", "登陆成功！");
        //return map;
    }
    //判断用户名是否已经注册过
    @RequestMapping(value = "/userMapping", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> userMapping(@RequestParam(value = "user_name") String user_name){
            return userManager.userMapping(user_name);
    }

    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addUser(@RequestParam(value = "user_name") String user_name, @RequestParam(value = "user_pwd") String user_pwd, @RequestParam(value = "user_nickname") String user_nickname, @RequestParam(value = "user_code") String user_code){

            return userManager.addUser(user_name, user_pwd, user_nickname, user_code);
    }

    @RequestMapping(value = "/photoUpload")
    @ResponseBody
    public Map<String,Object> photoUpload(HttpServletRequest request) throws ServletException, UnsupportedEncodingException {
        Map<String,Object> map = new HashMap<String, Object>();
        User user = SessionUtils.getCurrentUser();
        int user_id = user.getUser_id();
        String photo_url = PhotoUpload.upload(request,"image");
        if(photo_url==null){
            map.put("success",false);
            map.put("msg","请选择合适的图片格式和大小！");
            return map;
        }
        try{
            user.setPhoto_url(photo_url);//改变session中的值
            userManager.updateUserOfPhoto(user_id,photo_url);
        }catch (Exception e){
            e.printStackTrace();
        }
        map.put("success",true);
        map.put("msg","头像上传成功！");
        map.put("photo_url",photo_url);
        return map;
    }

    @RequestMapping(value = "/deleteUser")
    @ResponseBody
    public Map<String, Object> deleteUser(){
        User user = SessionUtils.getCurrentUser();
        int user_id = user.getUser_id();
        return userManager.deleteUser(user_id);
    }

    @RequestMapping(value = "/sentUserCode", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> sentUserCode(@RequestParam(value = "user_name") String user_name) throws IOException {
        //Map<String, Object> map = new HashMap<String, Object>();

        if (userManager.selectUserByName(user_name) != null) {
            return null;
        } else {
            return userManager.sentUserCode(user_name);
        }
    }

    @RequestMapping(value = "/sentCodeOfBack", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> sentCodeOfBack(@RequestParam(value = "user_name") String user_name) throws IOException {
        return userManager.sentUserCode(user_name);
    }

    @RequestMapping(value = "/backUserPwd", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> backUserPwd(@RequestParam(value = "user_name") String user_name, @RequestParam(value = "user_pwd") String user_pwd, @RequestParam(value = "user_code") String user_code) {
            return userManager.backUserPwd(user_name, user_pwd, user_code);
    }

    @RequestMapping(value = "/sendUser")
    @ResponseBody
    public Map<String, Object> sendUser(){
        return userManager.sendUser();
    }

    @RequestMapping(value = "/sendUserDay")
    @ResponseBody
    public Map<String, Object> sendUserDay(){
        return userManager.showSentence();
    }

    @RequestMapping(value = "/showUserMessage")
    public ModelAndView showUserMessage(){
        User user = SessionUtils.getCurrentUser();
        logger.info("进入该方法："+user.getUser_name());
        JSONObject jsonObject = JSONObject.fromObject(user);
        String exam = jsonObject.toString();
        logger.info(exam);
        return new ModelAndView("choice_que","exam",exam);
    }

    @RequestMapping(value = "/cancelUser")
    @ResponseBody
    public Map<String,Object> cancelUser(){
        Map<String,Object> map = new HashMap<String, Object>();
        User user = SessionUtils.getCurrentUser();
        if(user==null){
            map.put("success",true);
            map.put("msg","您还未登录！");
            return map;
        }
        SessionUtils.resetSession("user");
        map.put("success",true);
        map.put("msg","退出登录成功！");
        return map;
    }

}
