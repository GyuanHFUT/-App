package com.listening.util.sentmsg;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Asus on 2016/7/22.
 */
public class JavaMsgApi {
    private static final String URl_SENT_MSG = "http://yunpian.com/v1/sms/send.json";
    private static final String ENCODING = "UTF-8";

    public static String sentMsg(String apikey, String text, String mobile)throws IOException{
        Map<String, String> params = new HashMap<String, String>();
        params.put("apikey", apikey);
        params.put("text", text);
        params.put("mobile", mobile);
        return post(URl_SENT_MSG, params);
    }

    private static String post(String url, Map<String, String> paramsMap) throws IOException {
        CloseableHttpClient client = HttpClients.createDefault();
        String responseMsg = "";
        CloseableHttpResponse response = null;
        try{
            HttpPost method = new HttpPost(url);
            if(paramsMap!=null){
                List<NameValuePair> paramList = new ArrayList<NameValuePair>() ;
                for(Map.Entry<String, String> param : paramsMap.entrySet()){
                    NameValuePair pair = new BasicNameValuePair(param.getKey(),param.getValue());
                    paramList.add(pair);
                }
                method.setEntity(new UrlEncodedFormEntity(paramList, ENCODING));
            }
            response = client.execute(method);
            //System.out.println(22222222);
            if(response.getStatusLine().getStatusCode()==200){
                HttpEntity httpEntity = response.getEntity();
                if(httpEntity!=null){
                    responseMsg = EntityUtils.toString(httpEntity);
                    //System.out.println(responseMsg);
                }
            }

        }catch (Exception e){
           e.printStackTrace();
        }finally {
            try{
                response.close();
            }catch (Exception e){
               e.printStackTrace();
            }
        }
        return responseMsg;
        //return null;
    }
}
