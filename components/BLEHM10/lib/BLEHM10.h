/** \addtogroup BLEHM10
 *  @{
 */
 
// BLEHM10.h

#ifndef _BLEHM10_H
#define _BLEHM10_H

#include <Arduino.h>
#include <SoftwareSerial.h>


class BLEHM10 : public SoftwareSerial
{
	public:
		/*
		* Constructor for SoftwareSerial case.
		*/
		BLEHM10(int pinRx, int pinTx);


};
#endif	//_BLEHM10_H
/** @}*/
