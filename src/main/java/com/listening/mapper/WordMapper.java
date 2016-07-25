package com.listening.mapper;

import com.listening.domain.Word;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Asus on 2016/7/23.
 */
@Component
public interface WordMapper {
    public List<Word> selectAllWord();
    int selectWordOfMin();
    int selectWordOfNum();
}
