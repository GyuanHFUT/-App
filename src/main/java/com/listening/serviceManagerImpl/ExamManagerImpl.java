package com.listening.serviceManagerImpl;

import com.listening.domain.Exam;
import com.listening.domain.Mistake;
import com.listening.domain.User;
import com.listening.mapper.ExamMapper;
import com.listening.mapper.MistakeMapper;
import com.listening.serviceManager.ExamManager;
import com.listening.util.exception.MessageException;
import com.listening.util.number.RandomNumber;
import com.listening.util.session.SessionUtils;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Iterator;
import java.util.List;

/**
 * Created by Asus on 2016/8/5.
 */
@Component
public class ExamManagerImpl implements ExamManager {

    @Autowired
    ExamMapper examMapper;

    @Autowired
    MistakeMapper mistakeMapper;

    @Override
    public int showExamOfType() {
        List<Integer> list = examMapper.selectExamOfType();
        int m = RandomNumber.createNumber(list.size());
        int s = list.get(m);
        return s;
    }

    @Override
    public List<Exam> showExamOfListen(int s) {
        List<Exam> list = examMapper.selectExamOfListen(s);
        return list;
    }

    @Override
    public void addExamOfMistake(JSONObject jsonObject) {
        JSONArray jsonArray = jsonObject.getJSONArray("wrong");
        //int n = jsonArray.size();
        User user = SessionUtils.getCurrentUser();
        int user_id = user.getUser_id();
        if(jsonArray.isEmpty()){
            throw new MessageException("您未有任何错题！");
        }
        Iterator iterator = jsonArray.iterator();
        while (iterator.hasNext()){
            Integer listen_id = (Integer) iterator.next();
            Mistake mistake = mistakeMapper.selectMistakeByUL(user_id, listen_id);
            if(mistake!=null){
                continue;
            }else {
                mistakeMapper.insertMistake(user_id, listen_id);
            }

        }

    }
}
