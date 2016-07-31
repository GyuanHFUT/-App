package com.listening.serviceManagerImpl;

import com.listening.domain.Essay;
import com.listening.mapper.EssayMapper;
import com.listening.serviceManager.EssayManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Asus on 2016/7/31.
 */
@Component
public class EssayManagerImpl implements EssayManager {

    @Autowired
    EssayMapper essayMapper;

    @Override
    public List<List> showAllEssay() {
        List<List> list = new ArrayList<List>();
        List<Essay> essays = essayMapper.selectAllEssay();

        for(int i=0;i<essays.size();i++){
            List<Essay> list1 = new ArrayList<Essay>();
            Essay essay = list1.get(i);
            if(essay==null){
                continue;
            }
            list1.add(essay);
            for(int j=i+1;j<essays.size();j++){
                if(essay.getListen_group()==essays.get(j).getListen_group()){
                    list1.add(essays.get(j));
                    essays.set(j,null);
                }
            }
            if(list1.size()>1){
                list.add(list1);
            }
        }
        return list;
    }
}
