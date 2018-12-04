#include "SevenSegment.h"

const unsigned char OutOfRangeError   = 0x00;
const unsigned char ClearDisplay      = 0x76;
const unsigned char DotsControl       = 0x77;
const unsigned char DotsColon         = 1<<4;
const unsigned char BrightnessControl = 0x7A;
const unsigned char Colon             = 0x10;


S7S::S7S(int pinTx) 
{
	m_puart = new SoftwareSerial(pinTx, pinTx);
	pinMode(pinTx, OUTPUT);
	m_puart->begin(9600);
	setBrightness(255);
	clearDisplay();
}

/**
 * write integer to 7Seg
 */
byte S7S::writeInt(int number)
{
	if (number > 9999 || number < -999)
	{
		return OutOfRangeError;
	}
	else
	{
		snprintf(buf, BUF_LEN, "%4d", number);
		m_puart->print(buf);
	}
	return 1;
}

/**
 * write floating point number to 7Seg, with decimal point
 */
byte S7S::writeDouble(double number) 		//write floating point number to 7Seg, with decimal point
{
	if(number > 9999 || number < -999)
		return OutOfRangeError;
	
	if(number >= 0.0 && number <= 10.0)	// x.xxx
	{
		writeInt(int(number*1000));
		setDecimals(0b00000001);
	}
	else if((number >= -10.0 && number < 0.0) || (number > 10.0 && number <= 100.0) )	// xx.xx
	{
		writeInt(int(number*100));
		setDecimals(0b00000010);  
	}
	else if((number >= -100.0 && number < -10.0) || (number > 100.0 && number <= 1000.0) )	// xxx.x
	{
		writeInt(int(number*10));
		setDecimals(0b00000100);  
	}
	else if((number >= -999.0 && number < -100.0) || (number > 1000.0 && number <= 9999.0) )	// xxxx.
	{
		writeInt(int(number));
		setDecimals(0b00001000);  
	}
	return 1;
}

/**
 * write String to 7Seg
 */ 
byte S7S::writeStr(char *str)
{
	byte len = min(strlen(str), 4);
	memcpy((char *)buf, str, len);
	m_puart->print(buf);
	return 1;
}

/**
 * write String to 7Seg and scroll through it
 */
void  S7S::scroll(char *str, unsigned int charDelay)
{
	unsigned int len = strlen(str);
	
	for (unsigned int i=0; i<len; i++)
	{
		Serial.println(str+i);
		writeStr(str+i);
		delay(charDelay);
	}
	clearDisplay();
}

/** 
 * write time to 7Seg, with colon
 */
void S7S::writeTime(uint8_t hour, uint8_t minute)
{
	snprintf(buf, BUF_LEN, "%02d%02d", hour, minute);
	writeStr(buf);
	setDecimals(0b00010000);
}

/**
 * Clear the display and reset the cursor
 */
void S7S::clearDisplay()
{
	m_puart->write(ClearDisplay);  // Clear display command
}

/**
 * Set the displays brightness. value from 0 (min) to 255 (max)
 */
void S7S::setBrightness(byte value)
{
	m_puart->write(BrightnessControl);  // Set brightness command byte
	m_puart->write(value);  // brightness data byte
}

/**
 * Toggle any of the decimal points, colon or apostrophe.
 * Send byte, each digit corresponds to one decimal.
 *  [MSB] (X)(X)(Apos)(Colon)(Digit 4)(Digit 3)(Digit2)(Digit1)
 */
void S7S::setDecimals(byte decimals)
{
	m_puart->write(DotsControl);
	m_puart->write(decimals);
}

