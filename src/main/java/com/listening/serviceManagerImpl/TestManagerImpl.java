package com.listening.serviceManagerImpl;

import com.listening.domain.Test;
import com.listening.mapper.TestMapper;
import com.listening.serviceManager.TestManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Asus on 2016/7/20.
 */
@Component
public class TestManagerImpl implements TestManager {
    @Autowired
    private TestMapper testMapper;
    @Override
    public List<Test> showAll() {
        return testMapper.selectAll();
    }
}
