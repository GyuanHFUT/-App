package com.listening.serviceManagerImpl;

import com.listening.domain.Exam;
import com.listening.domain.Mistake;
import com.listening.mapper.MistakeMapper;
import com.listening.serviceManager.MistakeManager;
import com.listening.util.exception.MessageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Asus on 2016/7/26.
 */
@Component
public class MistakeManagerImpl implements MistakeManager {

    @Autowired
    MistakeMapper mistakeMapper;

    @Override
    public void addMistake(int user_id, int listen_id) {
        Mistake mistake = mistakeMapper.selectMistakeByUL(user_id, listen_id);
        if (mistake != null) {
            return;
        } else {
            mistakeMapper.insertMistake(user_id, listen_id);
        }
    }

    @Override
    public List<Exam> showMistakeByUser(int user_id) {
        return mistakeMapper.selectMistakeByUser(user_id);
    }

    @Override
    public void deleteMistake(int user_id, int listen_id) {
        mistakeMapper.deleteMistake(user_id, listen_id);
    }
}
