#include "BLEHM10.h"

/*
* Constructor for SoftwareSerial case.
*/
BLEHM10::BLEHM10(int pinRx, int pinTx) : SoftwareSerial(pinRx, pinTx)
{
  pinMode(pinRx, INPUT);
  pinMode(pinTx, OUTPUT);
	begin(9600);
}
