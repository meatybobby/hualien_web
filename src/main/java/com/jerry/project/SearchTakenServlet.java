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
import com.google.appengine.labs.repackaged.org.json.JSONException;
import com.google.appengine.labs.repackaged.org.json.JSONObject;

public class SearchTakenServlet  extends HttpServlet {
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		JSONObject jsonobj=null;
		String phone=null;
		
		try {
			jsonobj=new JSONObject(JSONUtility.reqToJSONString(req));
			if(jsonobj.has("phone")){
				phone=jsonobj.getString("phone");
			}
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	    Key reservationKey = KeyFactory.createKey("ReservationKind", "unpaid_reservation");
	    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
	    if(phone!=null){
        	Filter phoneFilter =FilterOperator.EQUAL.of("phone", phone);
        	Filter paidFilter =FilterOperator.EQUAL.of("paid", "true");
        	Filter takenFilter = FilterOperator.EQUAL.of("taken", "false");

        	Filter queryFilter = CompositeFilterOperator.and(phoneFilter,paidFilter,takenFilter);
        	Query query = new Query("reservations", reservationKey).setFilter(queryFilter);
        	 
        	
        	List<Entity> reservations = datastore.prepare(query).asList(FetchOptions.Builder.withLimit(1));
        	if(reservations.size()!=0){
        		for(Entity e:reservations){
            		//e.removeProperty("id");
            	}
            	resp.getWriter().write(JSONUtility.ListToJSON(reservations,"reservations"));
        	}
        	if(reservations.size()==0){
        		resp.getWriter().write("not found...");
        	}
	    }                                                                                                                                                                                                                                                            
		
	}
}