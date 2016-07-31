package com.listening.serviceManager;

import com.listening.domain.LongDialogue;

import java.util.List;

/**
 * Created by Asus on 2016/7/30.
 */
public interface LongDialogueManager {
    List<List> showAllLongDialogue();

    int selectLongDialogueOfNum();

    int selectLongDialogueOfMin();
}
