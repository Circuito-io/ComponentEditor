#include "BTHC05.h"

/*
* Constructor for SoftwareSerial case.
*/
BTHC05::BTHC05(int pinRx, int pinTx) : SoftwareSerial(pinRx, pinTx)
{
  pinMode(pinRx, INPUT);
  pinMode(pinTx, OUTPUT);
	begin(9600);
}
