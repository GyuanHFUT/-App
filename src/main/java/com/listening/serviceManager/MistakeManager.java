package com.listening.serviceManager;

import com.listening.domain.Exam;
import com.listening.domain.Mistake;

import java.util.List;

/**
 * Created by Asus on 2016/7/26.
 */
public interface MistakeManager {
    void addMistake(int user_id, int listen_id);

    List<Exam> showMistakeByUser(int user_id);

    void deleteMistake(int user_id, int listen_id);
}
