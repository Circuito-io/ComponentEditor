#include "TMP102.h"

TMP102::TMP102() 
{
	Wire.begin();
}
int TMP102::read() //return TMP102 reading
{
	Wire.requestFrom(address,2); 

	int result = Wire.read() << 8; 	//read MSB 
	result |= Wire.read(); 			//read LSB 

	return result >> 4; //result is just 12 bits long
}
float TMP102::readCelsius()
{
	return read()*0.0625;
}
float TMP102::readFahrenheit ()
{
	return read()*0.1125 + 32;
}

