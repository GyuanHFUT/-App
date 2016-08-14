package com.listening.util.active;

import com.listening.controller.CollectController;
import com.listening.domain.Exam;
import com.listening.domain.ShortDialogue;
import com.listening.domain.User;
import com.listening.domain.Word;
import com.listening.serviceManager.CollectManager;
import com.listening.serviceManagerImpl.CollectManagerImpl;
import com.listening.util.bean.BeanUtil;
import com.listening.util.session.SessionUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by Asus on 2016/8/14.
 */
public class ActiveUtils {



    public static <T extends Exam> void insertActive(List<T> list){

        User user = SessionUtils.getCurrentUser();

        if(user!=null) {
            int user_id = user.getUser_id();
            CollectManager collectManager = (CollectManager) BeanUtil.load("collectManagerImpl");
            List<Exam> examList = collectManager.showCollectByUser(user_id);
            for (int i = 0; i < examList.size(); i++) {
                for (int j = 0; j < list.size(); j++) {
                    if (examList.get(i).getListen_id() == list.get(j).getListen_id()) {
                        list.get(j).setListen_collect("active");
                        break;
                    }
                }
            }
        }
    }
}
