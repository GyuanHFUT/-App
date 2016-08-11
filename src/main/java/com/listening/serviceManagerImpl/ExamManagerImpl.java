package com.listening.serviceManagerImpl;

import com.listening.domain.Exam;
import com.listening.domain.Exama;
import com.listening.domain.Mistake;
import com.listening.domain.User;
import com.listening.mapper.ExamMapper;
import com.listening.mapper.MistakeMapper;
import com.listening.serviceManager.ExamManager;
import com.listening.util.exception.MessageException;
import com.listening.util.number.RandomNumber;
import com.listening.util.session.SessionUtils;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

/**
 * Created by Asus on 2016/8/5.
 */
@Component
public class ExamManagerImpl implements ExamManager {

    @Autowired
    ExamMapper examMapper;

    @Autowired
    MistakeMapper mistakeMapper;

    @Override
    public int showExamOfType() {
        List<Integer> list = examMapper.selectExamOfType();
        int m = RandomNumber.createNumber(list.size());
        int s = list.get(m);
        return s;
    }

    @Override
    public List<Exam> showExamOfListen(int s) {
        List<Exam> list = examMapper.selectExamOfListen(s);
        return list;
    }

    @Override
    public void addExamOfMistake(String jsonObject) {
        JSONObject jsonObject1 = JSONObject.fromObject(jsonObject);
        JSONObject object = jsonObject1.getJSONObject("wrong");
        //JSONArray jsonArray1 = jsonObject.getJSONArray("trans");
        //int n = jsonArray.size();
        User user = SessionUtils.getCurrentUser();
        int user_id = user.getUser_id();
        if(object.isEmpty()){
            return;
        }else {
            Set<Integer> it = object.keySet();
            Iterator iterator = it.iterator();
            while (iterator.hasNext()) {
                Integer listen_id = Integer.parseInt((String) iterator.next());
                Mistake mistake = mistakeMapper.selectMistakeByUL(user_id, listen_id);
                if (mistake != null) {
                    continue;
                } else {
                    mistakeMapper.insertMistake(user_id, listen_id);
                }
            }
        }
    }

    @Override
    public List<Exama> showExamOfMistake(JSONObject jsonObject) {
        JSONObject object = jsonObject.getJSONObject("wrong");
        List<Exama> examaList = new ArrayList<Exama>();
        User user = SessionUtils.getCurrentUser();
        int user_id = user.getUser_id();
        if(object.isEmpty()){
            return null;
        }else {
            //List<Mistake> mistakes = mistakeMapper.selectMistakeByUser(user_id);
            List<Exama> examas = examMapper.selectExamaOfUser(user_id);
            Set<String> set = object.keySet();
            //Iterator it = set.iterator();
            for(String j:set){
                int listen_id = Integer.parseInt(j);
                for(int i=0;i<examas.size();i++){
                    String answer;
                    //int listen_id = j;
                    if(listen_id==examas.get(i).getListen_id()){
                        if(examas.get(i).getListen_type()==5) {
                            JSONObject object1 = (JSONObject) object.get(j);
                            examas.get(i).setExam_first((String) object1.get("0"));
                            examas.get(i).setExam_second((String) object1.get("1"));
                            examas.get(i).setExam_three((String) object1.get("2"));
                            examas.get(i).setExam_four((String) object1.get("3"));
                            examas.get(i).setExam_five((String) object1.get("4"));
                        }else{
                            int exam_answer = Integer.parseInt((String) object.get(j));
                            if (exam_answer == 1) {
                                answer = "A";
                            } else if (exam_answer == 2) {
                                answer = "B";
                            } else if (exam_answer == 3) {
                                answer = "C";
                            } else {
                                throw new MessageException("传入的数据异常！");
                            }
                            examas.get(i).setExam_answer(answer);
                            //examaList.add(examas.get(i));
                        }
                        examaList.add(examas.get(i));
                    }
                }
            }
        }
        return examaList;
    }

    @Override
    public List<Exama> showAllExam(JSONObject jsonObject) {
        JSONObject object = jsonObject.getJSONObject("wrong");
        JSONArray object1 = jsonObject.getJSONArray("true");
        JSONArray object2 = jsonObject.getJSONArray("trans");
        Set<String> set = object.keySet();
        Iterator it = set.iterator();
        List<Exama> examas = new ArrayList<Exama>();
        if(!set.isEmpty()){
            int listen_exam = examMapper.selectExamById(Integer.parseInt((String) it.next()));
            examas = examMapper.selectAllExama(listen_exam);
        }else{
            int listen_exam = examMapper.selectExamById(Integer.parseInt((String) object1.get(0)));
            examas = examMapper.selectAllExama(listen_exam);
        }
        for(int i=0;i<examas.size();i++){
            for(String j:set) {
                int listen_id = Integer.parseInt(j);
                String answer;
                if(listen_id==examas.get(i).getListen_id()){
                    if(examas.get(i).getListen_type()==5){
                        JSONObject object3 = (JSONObject) object.get(j);
                        examas.get(i).setExam_first((String) object3.get("0"));
                        examas.get(i).setExam_second((String) object3.get("1"));
                        examas.get(i).setExam_three((String) object3.get("2"));
                        examas.get(i).setExam_four((String) object3.get("3"));
                        examas.get(i).setExam_five((String) object3.get("4"));
                        examas.get(i).setExam_judge(21);
                    }else {
                        int exam_answer = Integer.parseInt((String) object.get(j));
                        if (exam_answer==1) {
                            answer = "A";
                        }else if(exam_answer==2){
                            answer = "B";
                        }else if(exam_answer==3){
                            answer = "C";
                        }else {

                        }
                    }
                }
            }
        }

        return null;
    }
}
