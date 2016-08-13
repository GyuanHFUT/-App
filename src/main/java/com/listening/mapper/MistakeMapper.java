package com.listening.mapper;

import com.listening.domain.Exam;
import com.listening.domain.Mistake;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Asus on 2016/7/25.
 */
@Component
public interface MistakeMapper {

    void insertMistake(@Param(value = "user_id") int user_id, @Param(value = "listen_id") int listen_id);

    List<Exam> selectMistakeByUser(int user_id);

    void deleteMistake(@Param(value = "user_id") int user_id, @Param(value = "listen_id") int listen_id);

    Mistake selectMistakeByUL(@Param(value = "user_id") int user_id, @Param(value = "listen_id") int listen_id);
}
