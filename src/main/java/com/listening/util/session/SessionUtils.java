package com.listening.util.session;

import com.listening.domain.User;
import com.listening.util.exception.MessageException;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Created by Asus on 2016/7/21.
 */
public class SessionUtils {
    public static HttpSession getSession(){
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attr.getRequest().getSession();
        if(session==null){
            throw new MessageException("登陆异常！");
        }
          return  session;
    }
    //向session中写入登陆对象
    public static void bindSession(String str, Object obj){
        getSession().setAttribute(str, obj);
    }
    //从session中得到登陆对象
    public static User getCurrentUser(){
        return (User) getSession().getAttribute("user");
    }
    //清空session中的user对象
    public static void resetSession(String str){
        getSession().setAttribute(str, null);
    }
    
}
