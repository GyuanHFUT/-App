package com.listening.mapper;

import com.listening.domain.ShortDialogue;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Asus on 2016/7/30.
 */
@Component
public interface ShortDialogueMapper {
    List<ShortDialogue> selectAllShortDialogue();

    int selectShortDialogueOfNum();

    int selectShortDialogueOfMin();
}
