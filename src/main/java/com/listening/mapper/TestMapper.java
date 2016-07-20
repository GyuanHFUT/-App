package com.listening.mapper;

import com.listening.domain.Test;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Asus on 2016/7/20.
 */
@Component
public interface TestMapper {
    public List<Test> selectAll();
}
