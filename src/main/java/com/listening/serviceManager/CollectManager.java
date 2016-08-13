package com.listening.serviceManager;

import com.listening.domain.Collect;

import java.util.List;
import java.util.Map;

/**
 * Created by Asus on 2016/7/25.
 */
public interface CollectManager {
    Map<String, Object> addCollect(int user_id, int listen_id);

    List<Collect> showCollectByUser(int user_id);

    void deleteCollect(int user_id, int listen_id);
}
