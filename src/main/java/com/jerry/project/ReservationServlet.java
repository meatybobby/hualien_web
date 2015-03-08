package com.jerry.project;

import java.io.IOException;
import java.lang.reflect.Array;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.search.query.ExpressionParser.var_return;
import com.google.appengine.labs.repackaged.org.json.JSONException;
import com.google.appengine.labs.repackaged.org.json.JSONObject;
import com.google.appengine.labs.repackaged.org.json.JSONArray;
@SuppressWarnings("serial")
public class ReservationServlet extends HttpServlet {
	/**
	 * 
	 */

	
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		
		Price.Init();
		int[] prices = Price.priceArray;
		Key reservationKey = KeyFactory.createKey("ReservationKind", "unpaid_reservation");
		 DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
	 	
	 	JSONObject jsonobj=null;
	 	String phone = null;
	 	String name = null;
	 	String email = null;
	 	String total = null;
	 	String takeTime = null;
	 	JSONArray reserves = null;
        try {
        	String reqString = JSONUtility.reqToJSONString(req);
			jsonobj=new JSONObject(reqString);
			if(jsonobj.has("phone")){
			phone = jsonobj.getString("phone");
			System.out.println(phone);
			}
			if(jsonobj.has("name")){
			name = jsonobj.getString("name");
			System.out.println(name);
			}
			/*
			if(jsonobj.has("email")){
			email = jsonobj.getString("email");
			System.out.println(email);
			}
			*/
			if(jsonobj.has("total"))
				total = jsonobj.getString("total");
			if(jsonobj.has("reserve")){
			reserves = jsonobj.getJSONArray("reserve");
			System.out.println(reserves);
			}
			if(jsonobj.has("takeTime"))
				takeTime=jsonobj.getString("takeTime");
			
		} catch ( JSONException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        
        Boolean existBoolean = false;
        Filter queryFilter =FilterOperator.EQUAL.of("phone", phone);
    	Query query = new Query("reservations", reservationKey).setFilter(queryFilter);
    	List<Entity> reservations = datastore.prepare(query).asList(FetchOptions.Builder.withLimit(100));
    	
    	if(reservations.size()!=0){
    		for(Entity e:reservations){
    			if(e.getProperty("paid").equals("false"))
    			{
    				datastore.delete(e.getKey());
    				resp.getWriter().print("exist");
    				existBoolean = true;
    			}
			}
        }
    	
       
        Date createTime = new Date();
        
        Entity reservationEntity = new Entity("reservations", reservationKey);
        
        reservationEntity.setProperty("date", createTime);
        reservationEntity.setProperty("phone", phone);
        reservationEntity.setProperty("name",name);
        reservationEntity.setProperty("takeTime", takeTime);
        reservationEntity.setProperty("paid", "false");
        if(reserves!=null)
        	System.out.println(reserves.length());
        for(int i=0;i<reserves.length();i++)
        {
			try {
				if(reserves.getJSONObject(i)!=null)
				reservationEntity.setProperty(reserves.getJSONObject(i).getString("name"), reserves.getJSONObject(i).getString("num"));
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }
        reservationEntity.setProperty("total", total);
       
        datastore.put(reservationEntity);
        resp.setContentType("text/plain");
        if(!existBoolean)
		resp.getWriter().print("Reservation received");    
	        /*Query query = new Query("Event", eventKey).addSort("date", Query.SortDirection.DESCENDING);
	        List<Entity> events = datastore.prepare(query).asList(FetchOptions.Builder.withLimit(100));
	        resp.getWriter().write(JSONUtility.ListToJSON(events,"events"));*/
	}

}

