package com.listening.serviceManagerImpl;

import com.listening.domain.Word;
import com.listening.mapper.WordMapper;
import com.listening.util.random.RandomTitle;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

import static org.junit.Assert.*;

/**
 * Created by Asus on 2016/7/23.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath*:test-mybatis.xml"})
public class WordManagerImplTest {
    @Autowired
    private WordMapper wordMapper;

    @Test
    public void testShowAllWord() throws Exception {
        List<Word> words = wordMapper.selectAllWord();
        int s1 = wordMapper.selectWordOfMin();
        int count = wordMapper.selectWordOfNum();
        int s2 = s1+count-1;
        List<Word> wordList = RandomTitle.reconstructList(words, s1, s2, count);
        for(int i=0;i<wordList.size();i++){
            System.out.println(wordList.get(i));
        }

    }

}