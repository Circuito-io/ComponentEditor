/** \addtogroup SevenSegment
 *  @{
 */

// SevenSegment.h

#ifndef _SEVENSEGMENT_h
#define _SEVENSEGMENT_h

#include <Arduino.h>
#include <SoftwareSerial.h>


const unsigned int BUF_LEN=5;

class S7S 
{
	public:
		S7S(int pinTx);
		//write integer to 7Seg
		byte writeInt(int number);
		//write floating point number to 7Seg, with decimal point
		byte writeDouble(double number);
		//write String to 7Seg
		byte writeStr(char *str);
		//write String to 7Seg and scroll through it
		void scroll(char *str, unsigned int charDelay=300);
		//write time to 7Seg, with colon
		void writeTime(uint8_t hour, uint8_t minute);
		//Clear the display
		void clearDisplay();
		//Set display brightness 0-255
		void setBrightness(byte value);
		//Set decimals, see ./cpp
		void setDecimals(byte decimals);
		
	private:
		char buf[BUF_LEN];  // Will be used with sprintf to create strings
		SoftwareSerial *m_puart; 


};
#endif

/** @}*/