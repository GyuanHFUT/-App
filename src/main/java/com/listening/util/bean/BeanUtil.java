package com.listening.util.bean;

import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

/**
 * Created by Asus on 2016/8/14.
 */
public class BeanUtil {
    public static Object load(String name){
        WebApplicationContext wap = ContextLoader.getCurrentWebApplicationContext();
        return wap.getBean(name);
    }
}
