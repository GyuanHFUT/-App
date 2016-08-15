package com.listening.util.upload;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUpload;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.RequestContext;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.servlet.ServletRequestContext;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by Asus on 2016/8/15.
 */
public class PhotoUpload {
    private static final String PHOTO_SAVE_PATH = "/src/photos/";

    public static String upload(HttpServletRequest request, String type) throws ServletException, UnsupportedEncodingException {
        RequestContext req = new ServletRequestContext(request);
        request.setCharacterEncoding("UTF-8");
        String photo_url = null;
        if(FileUpload.isMultipartContent(req)){
            DiskFileItemFactory factory = new DiskFileItemFactory();
            ServletFileUpload fileUpload = new ServletFileUpload(factory);

            List items = new ArrayList();
            try {
                items = fileUpload.parseRequest(request);
            } catch (FileUploadException e) {
                e.printStackTrace();
            }

            Iterator it = items.iterator();
            while (it.hasNext()){
                FileItem fileItem = (FileItem) it.next();
                if(fileItem.isFormField()){
                    System.out.println(fileItem.getFieldName()+" "+fileItem.getName()+" "+new String(fileItem.getString().getBytes("ISO-8859-1"),"GBK"));
                }else{
                    System.out.println(fileItem.getFieldName()+" "+fileItem.getName()+" "+fileItem.getContentType()+" "+fileItem.isInMemory()+" "+fileItem.getSize()+" "+request.getSession().getServletContext().getRealPath("/"));
                    if(fileItem.getName()!=null && fileItem.getSize()!=0){
                        File fullFile = new File(fileItem.getName());
                        String fileName = fullFile.getName();
                        String suffix = CheckFileType.checkType(fileName,type);
                        if(!suffix.isEmpty()){
                            File newFile = new File(request.getSession().getServletContext().getRealPath("/")+File.separator+PHOTO_SAVE_PATH.replace("/",File.separator)+fullFile.getName());
                            if(!newFile.getParentFile().exists()){
                                newFile.getParentFile().mkdirs();
                            }
                            try {
                                fileItem.write(newFile);
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }else{
                            return null;
                        }
                        photo_url = request.getSession().getServletContext().getRealPath("/")+File.separator+PHOTO_SAVE_PATH.replace("/",File.separator)+fullFile.getName();
                    }
                }
            }
        }
        return photo_url;
    }
}
