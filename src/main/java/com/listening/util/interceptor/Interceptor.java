package com.listening.util.interceptor;

import com.listening.domain.User;
import com.listening.util.session.SessionUtils;
import org.apache.log4j.Logger;
import org.apache.struts.util.RequestUtils;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by Asus on 2016/7/22.
 */
public class Interceptor extends HandlerInterceptorAdapter {
    private static final Logger logger = Logger.getLogger(Interceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        logger.info("拦截器方法已调用！");

        String requestUri = request.getRequestURI();
        String contextPath = request.getContextPath();
        String uri = requestUri.substring(contextPath.length());

        if(requestUri.contains("/userLogin")||requestUri.contains("/userMapping")){
            return true;
        }else{
            User user = (User) request.getSession().getAttribute("user");
            if(user==null){
                logger.info("拦截器发挥作用，跳转到登陆页面！！");
                //logger.info("user是："+user.getUser_name());
                //request.getRequestDispatcher("/pages/land.html").forward(request, response);
                response.setCharacterEncoding("UTF-8");
                response.getWriter().append("login");
                return false;
            }else {
                return true;
            }
        }
    }
}
