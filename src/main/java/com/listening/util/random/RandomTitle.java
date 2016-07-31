package com.listening.util.random;

import com.listening.domain.ShortDialogue;
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
//利用泛型使得list传入不同的对象
    public static <T> List<T> reconstructList(List<T> list, int s1, int s2, int n){
        int[] array = RandomTitle.createRandom(s1, s2, n);
        List<T> list1 = new ArrayList<T>();
        for(int i: array){
            //Word word = list.get(i-s1);
            list1.add(list.get(i-s1));
        }
        return list1;
    }

/*    public static List<ShortDialogue> reconstructList(List<ShortDialogue> list, int s1, int s2, int n){
        int[] array = RandomTitle.createRandom(s1, s2, n);
        List<ShortDialogue> list1 = new ArrayList<ShortDialogue>();
        for(int i: array){
            ShortDialogue shortDialogue = list.get(i-s1);
            list1.add(shortDialogue);
        }
        return list1;
    }*/
}
