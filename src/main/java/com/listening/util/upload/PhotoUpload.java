package com.listening.util.upload;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUpload;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.RequestContext;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.servlet.ServletRequestContext;
import org.apache.log4j.Logger;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

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
    private static final Logger logger = Logger.getLogger(PhotoUpload.class);
    private static final String PHOTO_SAVE_PATH = "/src/photos/";

    public static String upload(HttpServletRequest request, String type) throws ServletException, UnsupportedEncodingException {
        RequestContext req = new ServletRequestContext(request);
        request.setCharacterEncoding("UTF-8");
        String photo_url = null;
        if(FileUpload.isMultipartContent(req)){
            //logger.info("lalalallala");
/*            DiskFileItemFactory factory = new DiskFileItemFactory();
            ServletFileUpload fileUpload = new ServletFileUpload(factory);*/
            MultipartHttpServletRequest items = (MultipartHttpServletRequest) request;
            //List items = new ArrayList();
/*            try {
                items = fileUpload.parseRequest(request);
            } catch (FileUploadException e) {
                e.printStackTrace();
            }*/

            Iterator it = items.getFileNames();
            while (it.hasNext()){
                //FileItem fileItem = (FileItem) it.next();
                MultipartFile file = items.getFile(it.next().toString());
/*                if(file.isFormField()){
                    System.out.println(fileItem.getFieldName()+" "+fileItem.getName()+" "+new String(fileItem.getString().getBytes("ISO-8859-1"),"GBK"));
                }else{*/
                    //System.out.println(file.getFieldName()+" "+fileItem.getName()+" "+fileItem.getContentType()+" "+fileItem.isInMemory()+" "+fileItem.getSize()+" "+request.getSession().getServletContext().getRealPath("/"));
                    if(file!=null){
                        //File fullFile = new File(fileItem.getName());
                        String fileName = file.getOriginalFilename();
                        String suffix = CheckFileType.checkType(fileName,type);
                        if(!suffix.isEmpty()){
                            File newFile = new File(request.getSession().getServletContext().getRealPath("/")+File.separator+PHOTO_SAVE_PATH.replace("/",File.separator)+fileName);
                            System.out.println(request.getSession().getServletContext().getRealPath("")+PHOTO_SAVE_PATH.replace("/",File.separator)+fileName);
                            if(!newFile.getParentFile().exists()){
                                newFile.getParentFile().mkdirs();
                            }
                            try {
                                file.transferTo(newFile);
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }else{
                            return null;
                        }
                        photo_url = request.getSession().getServletContext().getRealPath("/")+File.separator+PHOTO_SAVE_PATH.replace("/",File.separator)+fileName;
                    }
                }
            }
          return photo_url;
        }
    }

