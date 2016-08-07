package com.listening.mapper;

import com.listening.domain.Mistake;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Asus on 2016/7/25.
 */
@Component
public interface MistakeMapper {

    void insertMistake(int user_id, int listen_id);

    List<Mistake> selectMistakeByUser(int user_id);

    void deleteMistake(int user_id, int listen_id);

    Mistake selectMistakeByUL(int user_id, int listen_id);
}
