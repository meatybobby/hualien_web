package com.jerry.project;

import java.io.IOException;
import java.util.ArrayList;
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
import com.google.appengine.labs.repackaged.org.json.JSONArray;
import com.google.appengine.labs.repackaged.org.json.JSONException;

public class ProductStaticServlet extends HttpServlet {
	/**
	 * 
	 */
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		  Key reservationKey = KeyFactory.createKey("ReservationKind", "unpaid_reservation");
		    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
	        	Filter queryFilter =FilterOperator.EQUAL.of("paid", "true");
	        	Query query = new Query("reservations", reservationKey).setFilter(queryFilter);
	        	//List<Integer> totalNum = new ArrayList<Integer>(40);
	        	int [] totalNum = new int[44];
	        	List<Entity> reservations = datastore.prepare(query).asList(FetchOptions.Builder.withLimit(10000));
	        	for (Entity entity : reservations) {
	        		for(int i=0;i<44;i++)
					{
	        			Object gp = entity.getProperty("reserve"+i);
	        			if(gp!=null)
	        			{
	        				String value = gp.toString();
		        			if(value!="null")
		        			{
		        				//Integer integer = totalNum.get(i);
		        				
		        				totalNum[i]+=Integer.parseInt(value);
		        			}
	        			}
					}
				}
	        	//for(Integer rn : totalNum)
	        	JSONArray jsonArray = null;
	        	try {
					 jsonArray= new JSONArray(totalNum);
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	        	
	        	resp.getWriter().write(jsonArray.toString());
	        	if(reservations.size()==0){
	        		resp.getWriter().write("not found");
	        	}
		
	}
}
