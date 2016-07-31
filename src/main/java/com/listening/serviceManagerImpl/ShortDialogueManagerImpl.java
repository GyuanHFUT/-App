package com.listening.serviceManagerImpl;

import com.listening.domain.ShortDialogue;
import com.listening.mapper.ShortDialogueMapper;
import com.listening.serviceManager.ShortDialogueManager;
import com.listening.util.random.RandomTitle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Asus on 2016/7/30.
 */
@Component
public class ShortDialogueManagerImpl implements ShortDialogueManager{

    @Autowired
    ShortDialogueMapper shortDialogueMapper;

    @Override
    public List<ShortDialogue> showAllShortDialogue() {
        List<ShortDialogue> shortDialogues = shortDialogueMapper.selectAllShortDialogue();
        int s1 = shortDialogueMapper.selectShortDialogueOfMin();
        int count = shortDialogueMapper.selectShortDialogueOfNum();
        int s2 = s1+count-1;
        List<ShortDialogue> shortDialogueList = RandomTitle.reconstructList(shortDialogues, s1, s2, count);
        return shortDialogueList;
    }
}
