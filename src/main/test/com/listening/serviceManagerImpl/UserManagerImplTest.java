package com.listening.serviceManagerImpl;

import com.listening.util.number.RandomNumber;
import com.listening.util.sentmsg.SentMsgUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.*;

/**
 * Created by Asus on 2016/7/22.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath*:test-mybatis.xml","classpath:spring-mybatis.xml"})
public class UserManagerImplTest {

    @Test
    public void testSentUserCode() throws Exception {
        String randomNo = RandomNumber.createRandom()+"";
        System.out.println("验证码是:"+randomNo);
        SentMsgUtil.sentUserCode("您的验证码是"+randomNo, "15256976718");

    }
}