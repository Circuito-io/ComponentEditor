#include "PIR.h"


PIR::PIR(int PIRPin) : signalPin(PIRPin)
{
	pinMode(signalPin, INPUT);
 
}
bool PIR::read()
{
	return digitalRead(signalPin);
}



