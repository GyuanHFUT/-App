package com.listening.mapper;

import com.listening.domain.LongDialogue;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Asus on 2016/7/30.
 */
@Component
public interface LongDialogueMapper {
    List<LongDialogue> selectAllLongDialogue();

    int selectLongDialogueOfNum();

    int selectLongDialogueOfMin();
}
