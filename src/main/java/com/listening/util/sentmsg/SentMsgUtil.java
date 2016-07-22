package com.listening.util.sentmsg;


import com.listening.util.exception.MessageException;
import net.sf.json.JSONObject;

import java.io.IOException;

/**
 * Created by Asus on 2016/7/21.
 */
public class SentMsgUtil {
    private static final String apikey = "85a92774e8137f46ac3e9f84c256fa3f";

    public static void sentUserCode(String msg, String mobile)throws MessageException, IOException {
        String responseMsg = JavaMsgApi.sentMsg(apikey, msg, mobile);
        int statusCode = Integer.parseInt(JSONObject.fromObject(responseMsg).get("code").toString());
        if(statusCode == 10){
            throw new MessageException("该号码在短信验证黑名单中，请联系客服");
        }else if(statusCode == 17){
            throw new MessageException("24小时内该手机号获取验证码次数超过限制");
        }else if(statusCode == -51){
            throw new MessageException("系统繁忙，请稍后再试");
        }
    }

}
