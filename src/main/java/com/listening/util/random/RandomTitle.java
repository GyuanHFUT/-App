package com.listening.util.random;

import com.listening.domain.Word;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Asus on 2016/7/24.
 */
//生成随机数组
public class RandomTitle {

    public static int[] createRandom(int s1, int s2, int n){
       /* s1 = 1;
        s2 = s2-s1+1;*/
        if(s1>s2 || n>s2-s1+1){
            return null;
        }
        int count = 0;
        int[] array = new int[n];
        while(count<n){
            int s = s1 + (int)(Math.random()*(s2-s1+1));
            boolean flag = true;
            for(int i=0;i<n;i++){
                if(s==array[i]){
                    flag = false;
                    break;
                }
            }
            if(flag){
                array[count]=s;
                count++;
            }
        }
        return array;
    }

    public static List<Word> reconstructList(List<Word> list, int s1, int s2, int n){
        int[] array = RandomTitle.createRandom(s1, s2, n);
        List<Word> list1 = new ArrayList<Word>();
        for(int i: array){
            Word word = list.get(i-s1);
            list1.add(word);
        }
        return list1;
    }
}
