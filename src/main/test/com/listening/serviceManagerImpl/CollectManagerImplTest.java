package com.listening.serviceManagerImpl;

import com.listening.domain.Exam;
import com.listening.mapper.CollectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

import static org.junit.Assert.*;

/**
 * Created by Asus on 2016/8/13.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath*:test-mybatis.xml"})
public class CollectManagerImplTest {

    @Autowired
    CollectMapper collectMapper;

    @Test
    public void testShowCollectByUser() throws Exception {
        List<Exam> exams = collectMapper.selectCollectByUser(2);
        for(int i=0;i<exams.size();i++){
            System.out.println(exams.get(i));
        }
    }
}