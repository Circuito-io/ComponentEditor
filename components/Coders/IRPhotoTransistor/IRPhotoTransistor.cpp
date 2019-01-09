#include "IRPhotoTransistor.h"

/**
 * IRPhotoTransistor constructor.<BR>
 * pin - requires analog pin on arduino board.
 */
Transistor::Transistor(int pin) : analogPin(pin) {}


/**
 * Reads sensor value.<BR>
 * Returns integer value (0 - 1023).
 */
int Transistor::read()
{
	return analogRead(analogPin);
}


/**
 * Reads sensor value 'samples' times and averages them.<BR>
 * Returns the avarage integer value (0 - 1023).
 */
int Transistor::readAverage(int samples)
{
	long sum = 0;
	for(int i=0;i<samples;i++)
	{
		sum += read();
		delay(2); //minimum delay for prevent sticky samples
	}
	return (int)(sum/samples);
}



