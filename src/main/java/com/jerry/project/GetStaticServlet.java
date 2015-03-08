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
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;

@SuppressWarnings("serial")
public class GetStaticServlet extends HttpServlet{
	 @SuppressWarnings("unused")
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
             throws IOException {	
			

		    Key reservationKey = KeyFactory.createKey("ReservationKind", "unpaid_reservation");
		    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		   
//	        	Filter queryFilter =FilterOperator.EQUAL.of("phone", phone);
	        	Query query = new Query("reservations", reservationKey).addSort("date");
	        	//Filter queryFilter =FilterOperator.EQUAL.of("paid", "true");
	        	//query.setFilter(queryFilter);
	        	
	        	List<Entity> reservations = datastore.prepare(query).asList(FetchOptions.Builder.withLimit(10000));
	        	/*for (Entity entity : reservations) {
					
				}*/
	        	resp.setCharacterEncoding("UTF-8");
	        	resp.getWriter().write(JSONUtility.ListToJSON(reservations,"reservations"));
	        	if(reservations.size()==0){
	        		resp.getWriter().write("not found...");
	        	}
		   
	 }
}
