#ifndef TMP102_H
#define TMP102_H

#include <Arduino.h>
#include <Wire.h>

class TMP102
{
	public:
		TMP102();
		int read(); 
		float readCelsius ();
		float readFahrenheit();	
		
	private:
		const int address =  0x48;
};
#endif //TMP102_H
