package com.listening.serviceManagerImpl;

import com.listening.domain.LongDialogue;
import com.listening.mapper.LongDialogueMapper;
import com.listening.serviceManager.LongDialogueManager;
import com.listening.util.active.ActiveUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Asus on 2016/7/30.
 */
@Component
public class LongDialogueManagerImpl implements LongDialogueManager {

    @Autowired
    LongDialogueMapper longDialogueMapper;

    @Override
    //将具有相同类型listen_group的题放在一个list中，然后组成双list结构
    public List<List> showAllLongDialogue() {

        List<List> list = new ArrayList<List>();
        List<LongDialogue> longDialogues = longDialogueMapper.selectAllLongDialogue();
        ActiveUtils.insertActive(longDialogues);
        for(int i=0;i<longDialogues.size();i++) {
            List<LongDialogue> list1 = new ArrayList<LongDialogue>();
            LongDialogue longDialogue = longDialogues.get(i);
            if (longDialogue == null) {
                continue;
            } else {
                list1.add(longDialogue);
                for (int j = i + 1; j < longDialogues.size(); j++) {
                    if (longDialogue.getListen_group() == longDialogues.get(j).getListen_group()) {
                        //int key2 = longDialogues.get(j).getListen_id();
                        list1.add(longDialogues.get(j));
                        longDialogues.set(j, null);
                        //list.add(list1);
                    }
                }
                if (list1.size() > 1) {
                    list.add(list1);
                }

            }
        }
        return list;
    }

    @Override
    public int selectLongDialogueOfNum() {

        return longDialogueMapper.selectLongDialogueOfNum();
    }

    @Override
    public int selectLongDialogueOfMin() {
        return longDialogueMapper.selectLongDialogueOfMin();
    }
}
