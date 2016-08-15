package com.listening.util.upload;

/**
 * Created by Asus on 2016/8/15.
 */
public class CheckFileType {
    private static String[] imageType = {".jpg",".jpeg",".png",".gif",".bmp",".psd",".svg",".tiff"};

    public static String checkType(String fileName, String type) {
        if(type.equals("image")){
            return checkImageType(fileName);
        }else{
            return null;
        }
    }

    private static String checkImageType(String fileName) {
        for(int i=0;i<imageType.length;i++){
            if(fileName.endsWith(imageType[i])){
                return imageType[i];
            }
        }
        return null;
    }
}
