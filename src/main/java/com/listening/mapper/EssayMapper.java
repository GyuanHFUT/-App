package com.listening.mapper;

import com.listening.domain.Essay;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Asus on 2016/7/31.
 */
@Component
public interface EssayMapper {
    List<Essay> selectAllEssay();
}
