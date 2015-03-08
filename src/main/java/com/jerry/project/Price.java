package com.jerry.project;

public class Price {
	public static int[] priceArray = new int[45];
	public static void Init(){
		for(int i=0;i<13;i++)
			priceArray[i] = 100;
		for(int i=13;i<16;i++)
			priceArray[i] = 105;
		for(int i=16;i<20;i++)
			priceArray[i] = 180;
		priceArray[20] = 100;
		priceArray[21] = 140;
		priceArray[22] = 120;
		for(int i=23;i<30;i++)
			priceArray[i] = 65;
		priceArray[30]=210;
		
		priceArray[31] = 250;
		priceArray[32] = 280;
		priceArray[33] = 280;
		priceArray[34] = 310;
		priceArray[35] = 225;
		priceArray[36] = 275;
		priceArray[37] = 275;
		for(int i=38;i<45;i++)
			priceArray[i] = 25;
	}
	
}
