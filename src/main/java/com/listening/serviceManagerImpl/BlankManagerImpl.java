package com.listening.serviceManagerImpl;

import com.listening.domain.Blank;
import com.listening.mapper.BlankMapper;
import com.listening.serviceManager.BlankManager;
import com.listening.util.random.RandomTitle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Asus on 2016/7/31.
 */
@Component
public class BlankManagerImpl implements BlankManager {

    @Autowired
    BlankMapper blankMapper;

    @Override
    public List<Blank> showAllBlank() {
        List<Blank> blanks = blankMapper.selectAllBlank();
        int s1 = blankMapper.selectBlankOfMin();
        int count = blankMapper.selectBlankOfNum();
        int s2 = s1+count-1;
        List<Blank> blankList = RandomTitle.reconstructList(blanks, s1, s2, count);
        return blankList;
    }
}
