/** \addtogroup LDR
 *  @{
 */
#ifndef LDR_H
#define LDR_H

#include <Arduino.h>

class LDR
{
	public:
		LDR(int pin);
		int read(); 
		int readAverage(int samples = 10);
		
	private:
		const int analogPin;
		
};
#endif //LDR_H
/** @}*/