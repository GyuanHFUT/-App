package com.listening.serviceManagerImpl;

import com.listening.domain.Sentence;
import com.listening.domain.User;
import com.listening.mapper.UserMapper;
import com.listening.serviceManager.UserManager;
import com.listening.util.exception.MessageException;
import com.listening.util.number.RandomNumber;
import com.listening.util.sentmsg.SentMsgUtil;
import com.listening.util.session.SessionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Asus on 2016/7/20.
 */
@Component
public class UserManagerImpl implements UserManager {
    @Autowired
    private UserMapper userMapper;

    Map<String, Object> msgMap = new HashMap<String, Object>();

    @Override
    public Map<String, Object> addUser(String user_name, String user_pwd, String user_nickname, String user_code) {
        Map<String, Object> map = new HashMap<String, Object>();
        HttpSession sessionMap = SessionUtils.getSession();
        synchronized (sessionMap) {
            if (StringUtils.isEmpty(user_name) || StringUtils.isEmpty(user_pwd) || StringUtils.isEmpty(user_nickname)) {
                map.put("success", false);
                map.put("msg", "请将用户信息补全！");
            }  else {
                HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
                HttpSession httpSession = request.getSession();
                String randomNo = (String) httpSession.getAttribute("randomNo");
                //必须强制转化成Long对象类型
                long sentMsgTime = (Long)(httpSession.getAttribute("sentMsgTime"));
                if (!(user_code.equals(randomNo))) {
                    map.put("success", false);
                    map.put("msg", "短信验证码输入错误！");
                } else if((System.currentTimeMillis()-sentMsgTime)>300000){
                    map.put("success", false);
                    map.put("msg", "手机验证码过期，请重新获取！");
                }
                else {
                    userMapper.insertUser(user_name, user_pwd, user_nickname);
                    User user = userMapper.selectUserByName(user_name);
                    SessionUtils.bindSession("user", user);
                    map.put("success", true);
                    map.put("msg", "用户注册成功！");
                }
            }
            return map;

        }
    }




    @Override
    public Map<String, Object> userLogin(String user_name, String user_pwd) {
        Map<String, Object> map = new HashMap<String, Object>();
        if(StringUtils.isEmpty(user_name)||StringUtils.isEmpty(user_pwd)){
            map.put("success", false);
            map.put("msg","用户名或密码不能为空！");
            //throw new MessageException("用户名或密码不能为空！");
        }else {
            User user1 = userMapper.selectUserByName(user_name);
            if(user1 == null){
                map.put("success", false);
                map.put("msg","此用户不存在，请重新输入！");
               //throw new MessageException("此用户不存在，请重新输入！");
            }else if(!(user1.getUser_pwd().equals(user_pwd))){
                map.put("success", false);
                map.put("msg","密码不正确，请重新输入！");
                //throw new MessageException("密码不正确，请重新输入！");
            }else {
                User user2 = userMapper.userLogin(user_name, user_pwd);
                SessionUtils.bindSession("user", user2);
                map.put("success", true);
                map.put("msg","登陆成功！");
                //return map;
            }

        }
        return map;

    }

    @Override
    public Map<String, Object> userMapping(String user_name) {
        Map<String, Object> map = new HashMap<String, Object>();
        if(userMapper.selectUserByName(user_name)!=null){
            map.put("success", false);
            map.put("msg", "此用户已存在！");
        }else {
            map.put("success",true);
        }
        return map;
    }

    @Override
    public void sentUserCode(String user_name) throws MessageException, IOException{
        String randomNo = RandomNumber.createRandom()+"";
        SentMsgUtil.sentUserCode("您的验证码是"+randomNo, user_name);
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        HttpSession session = request.getSession();
        long sentMsgTime = System.currentTimeMillis();
        //msgMap.put("success",true);
        //msgMap.put("randomNo", randomNo);
        session.setAttribute("sentMsgTime", sentMsgTime);
        session.setAttribute("randomNo", randomNo);
        //return msgMap;
    }

    @Override
    public Map<String, Object> backUserPwd(String user_name, String user_pwd, String user_code) {
        User user = userMapper.selectUserByName(user_name);
        Map<String, Object> map = new HashMap<String, Object>();
        if(user==null){
            map.put("success", false);
            map.put("msg", "用户不存在，请重新输入！");
        }else if(StringUtils.isEmpty(user_pwd)){
            map.put("success", false);
            map.put("msg", "密码不能为空！");
        }else{
            HttpSession httpSession = SessionUtils.getSession();
            String randomNo = (String) httpSession.getAttribute("randomNo");
            long sentMsgTime = (Long) httpSession.getAttribute("sentMsgTime");
            if(!(user_code.equals(randomNo))){
                map.put("success", false);
                map.put("msg", "短信验证码输入错误！");
            }else if((System.currentTimeMillis()-sentMsgTime)>300000){
                map.put("success", false);
                map.put("msg", "手机验证码过期，请重新获取！");
            }
            else{
                userMapper.updateUserByName(user_name, user_pwd);
                SessionUtils.bindSession("user", user);
                map.put("success", true);
                map.put("msg", "密码找回成功！");
            }
        }
        return map;
    }

    @Override
    public Map<String, Object> deleteUser(int user_id) {
        Map<String, Object> map = new HashMap<String, Object>();
        try{
            userMapper.deleteUser(user_id);
            SessionUtils.resetSession("user");
            map.put("success", true);
            map.put("msg", "注销成功！");
        }catch (Exception e){
            e.printStackTrace();
        }
        return map;
    }

    @Override
    public Map<String, Object> sendUser() {
        Map<String, Object> map = new HashMap<String, Object>();
        User user = SessionUtils.getCurrentUser();
        map.put("user",user);
        return map;
    }

    @Override
    public Map<String, Object> showSentence() {
        Map<String,Object> map = new HashMap<String, Object>();
        List<Integer> list = userMapper.selectSentenceOfType();
        int m = RandomNumber.createNumber(list.size());
        //int s = list.get(m);
        Sentence sentence = userMapper.selectSentenceOfId(list.get(m));
        map.put("sentence",sentence);
        map.put("success",true);
        map.put("msg","查询成功！");
        return map;
    }

}
