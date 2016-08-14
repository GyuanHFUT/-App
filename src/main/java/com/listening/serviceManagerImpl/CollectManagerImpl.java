package com.listening.serviceManagerImpl;

import com.listening.domain.Collect;
import com.listening.domain.Exam;
import com.listening.mapper.CollectMapper;
import com.listening.serviceManager.CollectManager;
import com.listening.util.exception.MessageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Asus on 2016/7/25.
 */
@Component
public class CollectManagerImpl implements CollectManager {

    @Autowired
    private CollectMapper collectMapper;
    @Override
    public Map<String, Object> addCollect(int user_id, int listen_id) {
        Map<String,Object> map = new HashMap<String, Object>();
        Collect collect = collectMapper.selectCollectByUL(user_id, listen_id);
        if(collect!=null){
            map.put("success",false);
            map.put("msg","此题已在收藏夹中！");
        }else {
            collectMapper.insertCollect(user_id, listen_id);
            map.put("success",true);
            map.put("msg","添加成功！");
        }
        return map;
    }

    @Override
    public List<Exam> showCollectByUser(int user_id) {
        return collectMapper.selectCollectByUser(user_id);
    }

    @Override
    public void deleteCollect(int user_id, int listen_id) {
        collectMapper.deleteCollect(user_id, listen_id);
    }
}
