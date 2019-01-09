/** \addtogroup IRPhotoTransistor
 *  @{
 */
#ifndef IRPhotoTransistor_H
#define IRPhotoTransistor_H

#include <Arduino.h>

class Transistor
{
	public:
		Transistor(int pin);
		int read(); 
		int readAverage(int samples = 10);
		
	private:
		const int analogPin;
		
};
#endif //IRPhotoTransistor_H
/** @}*/