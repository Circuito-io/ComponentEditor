#include "RGBLed.h"

#include <Arduino.h>
/**
* RGBLed constructor.<BR>
* redPin, greenPin, bluePin - three PWM pin on arduino board.
*/
RGBLed::RGBLed(int redPin, int greenPin, int bluePin, bool type) : rPin(redPin), gPin(greenPin), bPin(bluePin)
{
  TYPE = type;
	pinMode(rPin, OUTPUT);
	pinMode(gPin, OUTPUT);
	pinMode(bPin, OUTPUT);
}

/**
* Set Red,Green,Blue values of the LED.
*/
void RGBLed::setRGB(int R, int G, int B)
{
  if(TYPE)
  {
  analogWrite(rPin,R);
  analogWrite(gPin,G);
  analogWrite(bPin,B);
  }
  else
  {
  analogWrite(rPin,255-R);
  analogWrite(gPin,255-G);
  analogWrite(bPin,255-B);
  }
}

/**
* Turn off the LED.
*/
void RGBLed::turnOff()
{
  if(TYPE)
  {
	digitalWrite(rPin,0);
	digitalWrite(gPin,0);
	digitalWrite(bPin,0);
  }
  else
  {
  digitalWrite(rPin,1);
  digitalWrite(gPin,1);
  digitalWrite(bPin,1);
  }
  
}

