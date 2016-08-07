package com.listening.serviceManager;

import com.listening.domain.Exam;
import net.sf.json.JSONObject;

import java.util.List;

/**
 * Created by Asus on 2016/8/5.
 */
public interface ExamManager {
    int showExamOfType();

    List<Exam> showExamOfListen(int s);

    void addExamOfMistake(JSONObject jsonObject);
}
