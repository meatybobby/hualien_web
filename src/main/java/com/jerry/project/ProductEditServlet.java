package com.jerry.project;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.search.query.QueryParser.primitive_return;
import com.google.appengine.api.urlfetch.HTTPResponse;
import com.google.appengine.labs.repackaged.org.json.JSONException;
import com.google.appengine.labs.repackaged.org.json.JSONObject;

public class ProductEditServlet extends HttpServlet {
	 @SuppressWarnings("unused")
	 	private  void getData(HttpServletResponse resp)
	 	{
		 try {
		 Key productKey = KeyFactory.createKey("ProductKind", "productData");
		    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
	        	Query query = new Query("ProductKind", productKey);
	        	 
	        	List<Entity> products= datastore.prepare(query).asList(FetchOptions.Builder.withLimit(100));
	        	System.out.print(products.size());
	        	resp.setCharacterEncoding("UTF-8");
	        	if(products.size()!=0){
	        		System.out.println("have record");
	        		for(Entity e:products){
	            		e.removeProperty("id");
	            	}
					resp.getWriter().write(JSONUtility.ListToJSON(products,"products"));
				} 
	        	else if(products.size()==0){
		        	System.out.println("no record");
		        	resp.getWriter().write("no record");
		        }
	 		}
	        catch (IOException e1) {
					// TODO Auto-generated catch block
			e1.printStackTrace();
			}
	 	}
	 	private Object[] JSONToPropertyValues(JSONObject jsonObject)
	 	{
	 	
	 		String[] names =JSONObject.getNames(jsonObject);
	 		Object[] value = new String[names.length];
	 		for(int i=0;i<names.length;i++){
	 			try {
					value[i] =jsonObject.get(names[i]);
					
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	 		}
			return value;
	 	}
	 	private void delete(JSONObject jsonobj,HttpServletResponse resp) {
	 		try {
		 		String name=null;
		 		if(jsonobj.has("name")){
					
						name=jsonobj.getString("name");
					
				}
		 		
		 		String[] properties = JSONObject.getNames(jsonobj);
				Object[] values = JSONToPropertyValues(jsonobj);
				
				 Key productKey = KeyFactory.createKey("ProductKind", "productData");
				 DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
				 Filter queryFilter =FilterOperator.EQUAL.of("name",name);
			     Query query = new Query("ProductKind", productKey).setFilter(queryFilter);
			     List<Entity> products= datastore.prepare(query).asList(FetchOptions.Builder.withLimit(100));
			     System.out.println(products.size());
			    	 for(Entity e:products){
			    	 	datastore.delete(e.getKey());
					 }
			    resp.getWriter().write("deleted");
	 		} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	 	private void update(JSONObject jsonobj,HttpServletResponse resp) {
	 		try {
	 			String name=null;
		 		if(jsonobj.has("name")){
					name=jsonobj.getString("name");
				}
		 		
		 		String[] properties = JSONObject.getNames(jsonobj);
				Object[] values = JSONToPropertyValues(jsonobj);
				
				 Key productKey = KeyFactory.createKey("ProductKind", "productData");
				 DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
				 Filter queryFilter =FilterOperator.EQUAL.of("name",name);
			     Query query = new Query("ProductKind", productKey).setFilter(queryFilter);
			     List<Entity> products= datastore.prepare(query).asList(FetchOptions.Builder.withLimit(100));
			     
	        	 if(products.size()==1){
						System.out.println("update product info");
	        		for(Entity e:products){
	        			for(int i=0;i<properties.length;i++)
	        				e.setProperty(properties[i], values[i]);
	        			datastore.put(e);	
	            	}
					resp.getWriter().write(JSONUtility.ListToJSON(products,"products"));
				 } 
	        	 else if(products.size()==0){///如果還沒有登錄過的名稱
						System.out.println("create new product info");
		        	Entity productEntity = new Entity("ProductKind",productKey);
		        	System.out.println(properties.length);
		        	for(int i=0;i<properties.length;i++)
        			{
		        		System.out.println(properties[i]);
		        		productEntity.setProperty(properties[i], values[i]);
        			}
		        	datastore.put(productEntity);
		        	resp.getWriter().write("update complete");
		         }
	        	 else
	        	 {
						System.out.println("something wrong");
	        		 resp.getWriter().write("update complete");
	        	 }
				        
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
		}
		public void doPost(HttpServletRequest req, HttpServletResponse resp)
	             throws IOException {
			resp.setContentType("application/json; charset=UTF-8");
		 JSONObject jsonobj=null;
		 
			//S M L XL 2L
			try {

				jsonobj=new JSONObject(JSONUtility.reqToJSONString(req));
				if(jsonobj.getString("mode").equals("update"))
				{
					System.out.println("update");
					update(jsonobj.getJSONObject("property"),resp);
				}
				else if(jsonobj.getString("mode").equals("getData"))
				{
					System.out.println("getdata");
					getData(resp);
					
				}
				else if(jsonobj.getString("mode").equals("delete"))
				{
					delete(jsonobj.getJSONObject("property"), resp);
				}
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			   
		 }
}
