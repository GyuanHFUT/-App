package com.listening.serviceManager;

import com.listening.domain.Exam;
import com.listening.domain.Exama;
import net.sf.json.JSONObject;

import java.util.List;

/**
 * Created by Asus on 2016/8/5.
 */
public interface ExamManager {
    int showExamOfType();

    List<Exam> showExamOfListen(int s);

    void addExamOfMistake(String jsonObject);

    List<Exama> showExamOfMistake(JSONObject jsonObject);

    List<Exama> showAllExam(JSONObject jsonObject);
}
