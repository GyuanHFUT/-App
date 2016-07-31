package com.listening.serviceManagerImpl;

import com.listening.domain.Collect;
import com.listening.mapper.CollectMapper;
import com.listening.serviceManager.CollectManager;
import com.listening.util.exception.MessageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Asus on 2016/7/25.
 */
@Component
public class CollectManagerImpl implements CollectManager {

    @Autowired
    private CollectMapper collectMapper;
    @Override
    public void addCollect(int user_id, int listen_id) {
        Collect collect = collectMapper.selectCollectByUL(user_id, listen_id);
        if(collect!=null){
            throw new MessageException("此题已在收藏夹中！");
        }else {
            collectMapper.insertCollect(user_id, listen_id);
        }
    }

    @Override
    public List<Collect> showCollectByUser(int user_id) {
        return collectMapper.selectCollectByUser(user_id);
    }

    @Override
    public void deleteCollect(int user_id, int listen_id) {
        collectMapper.deleteCollect(user_id, listen_id);
    }
}
