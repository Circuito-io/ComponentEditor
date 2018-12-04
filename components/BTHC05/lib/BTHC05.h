/** \addtogroup BTHC05
 *  @{
 */
 
// BTHC05.h

#ifndef _BTHC05_H
#define _BTHC05_H

#include <Arduino.h>
#include <SoftwareSerial.h>


class BTHC05 : public SoftwareSerial
{
	public:
		/*
		* Constructor for SoftwareSerial case.
		*/
		BTHC05(int pinRx, int pinTx);


};
#endif	//_BTHC05_H
/** @}*/
