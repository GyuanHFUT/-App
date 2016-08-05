package com.listening.serviceManagerImpl;

import com.listening.domain.Exam;
import com.listening.mapper.ExamMapper;
import com.listening.serviceManager.ExamManager;
import com.listening.util.number.RandomNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Asus on 2016/8/5.
 */
@Component
public class ExamManagerImpl implements ExamManager {

    @Autowired
    ExamMapper examMapper;

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
}
