package com.listening.mapper;

import com.listening.domain.Collect;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Asus on 2016/7/25.
 */
@Component
public interface CollectMapper {
    void insertCollect(@Param(value = "user_id") int user_id, @Param(value = "listen_id") int listen_id);

    Collect selectCollectByUL(@Param(value = "user_id") int user_id, @Param(value = "listen_id") int listen_id);

    List<Collect> selectCollectByUser(@Param(value = "user_id") int user_id);

    void deleteCollect(@Param(value = "user_id") int user_id, @Param(value = "listen_id") int listen_id);
}
