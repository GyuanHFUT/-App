package com.listening.serviceManagerImpl;

import com.listening.domain.Word;
import com.listening.mapper.WordMapper;
import com.listening.serviceManager.WordManager;
import com.listening.util.random.RandomTitle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Asus on 2016/7/23.
 */
@Component
public class WordManagerImpl implements WordManager {
    @Autowired
    private WordMapper wordMapper;

    @Override
    public List<Word> showAllWord() {
        List<Word> words = wordMapper.selectAllWord();
        int s1 = wordMapper.selectWordOfMin();
        int count = wordMapper.selectWordOfNum();
        int s2 = s1+count-1;
        List<Word> wordList = RandomTitle.reconstructList(words, s1, s2, count);
        return wordList;
    }
}
