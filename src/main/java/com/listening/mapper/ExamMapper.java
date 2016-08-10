package com.listening.mapper;

import com.listening.domain.Exam;
import com.listening.domain.Exama;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Asus on 2016/8/5.
 */
@Component
public interface ExamMapper {
    List<Integer> selectExamOfType();

    List<Exam> selectExamOfListen(int s);

    List<Exama> selectExamaOfUser(int user_id);
}
