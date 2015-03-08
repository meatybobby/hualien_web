package com.jerry.project;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.labs.repackaged.org.json.JSONArray;
import com.google.appengine.labs.repackaged.org.json.JSONException;
import com.google.appengine.labs.repackaged.org.json.JSONObject;

public class JSONUtility {
	public static String reqToJSONString(HttpServletRequest req){
		StringBuffer buf = new StringBuffer();
		char[] c = new char[4096];
		int len;
		try {
			while((len = req.getReader().read(c)) != -1) {
				buf.append(c, 0, len);
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String s=null;
		s = buf.toString();
		/*
		try {
			s= URLDecoder.decode(buf.toString(),"UTF-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		*/
		return s;
		
	}
	public static String EntityToJSON(Entity entity,String JSONObjectName) {
		JSONObject jobj=new JSONObject();
		for(String propertyName:entity.getProperties().keySet()){
			try {
				jobj.put(propertyName, entity.getProperty(propertyName));
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return jobj.toString();
	}
	public static String ListToJSON(List<Entity> entities,String JSONArrayName)
	{
		JSONObject jobj=new JSONObject();
		JSONArray array = new JSONArray();
    	for (Entity event :entities) {
    		JSONObject jsonObj=new JSONObject();
    		jsonObj = new JSONObject();
    		for(String propertyName:event.getProperties().keySet()){
    			String propertyValue=null;
    			JSONArray tags=new JSONArray();
    			if(event.getProperty(propertyName)!=null&&!propertyName.equals("tag")){
    				propertyValue =event.getProperty(propertyName).toString();
    				try {
    					jsonObj.put(propertyName,propertyValue);
    				} catch (JSONException e) {
    					// TODO Auto-generated catch block
    					e.printStackTrace();
    				}
    			}
    			else if(event.getProperty(propertyName)!=null&&propertyName.equals("tag")&&!JSONArrayName.equals("tags")){
    				//if(event.getProperty(propertyName).toString().split(",").length!=1){
    					JSONArray value=new JSONArray();
    					for(String tag:event.getProperty(propertyName).toString().split(",")){
    						JSONObject obj=new JSONObject();
    						try {
								obj.put("value", tag);
								value.put(obj);
							} catch (JSONException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
    					}
    					try {
							jsonObj.put(propertyName,value);
						} catch (JSONException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
    				//}
    				//else{
    					//propertyValue =event.getProperty(propertyName).toString();
    				//}
    			}
    			else if(event.getProperty(propertyName)!=null&&propertyName.equals("tag")&&JSONArrayName.equals("tags")){
    				propertyValue =event.getProperty(propertyName).toString();
    				try {
    					jsonObj.put(propertyName,propertyValue);
    				} catch (JSONException e) {
    					// TODO Auto-generated catch block
    					e.printStackTrace();
    				}
    			}
    			else{
    				propertyValue="";
    				try {
    					jsonObj.put(propertyName,propertyValue);
    				} catch (JSONException e) {
    					// TODO Auto-generated catch block
    					e.printStackTrace();
    				}
    			}
    			
    		} 
            array.put(jsonObj); 
            if(JSONArrayName!=null){
            	try {
    				jobj.put(JSONArrayName, array);
    			} catch (JSONException e) {
    				// TODO Auto-generated catch block
    				e.printStackTrace();
    			}
            }
            else{
            	try {
            		jobj.put(null, array);
    			} catch (JSONException e) {
    				// TODO Auto-generated catch block
    				e.printStackTrace();
    			}
            }
    	}
    	return jobj.toString();
	}
}
