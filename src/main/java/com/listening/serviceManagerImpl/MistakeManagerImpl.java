package com.listening.serviceManagerImpl;

import com.listening.domain.Mistake;
import com.listening.serviceManager.MistakeManager;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Asus on 2016/7/26.
 */
@Component
public class MistakeManagerImpl implements MistakeManager {
    @Override
    public void addMistake(int user_id, int listen_id) {


    }

    @Override
    public List<Mistake> showMistakeByUser(int user_id) {
        return null;
    }

    @Override
    public void deleteMistake(int user_id, int listen_id) {

    }
}
