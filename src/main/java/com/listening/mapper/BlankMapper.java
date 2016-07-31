package com.listening.mapper;

import com.listening.domain.Blank;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Asus on 2016/7/31.
 */
@Component
public interface BlankMapper {
    List<Blank> selectAllBlank();

    int selectBlankOfMin();

    int selectBlankOfNum();
}
