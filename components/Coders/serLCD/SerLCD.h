/******************************************************************************* 
SerLCD - A library to use Sparkfun's SerLCD v2.5 backpack devices with the Arduino
Copyright (C) 2010-2013 Steven Cogswell

http://www.sparkfun.com/commerce/product_info.php?products_id=258
http://www.sparkfun.com/commerce/product_info.php?products_id=9395
http://www.sparkfun.com/datasheets/LCD/SerLCD_V2_5.PDF

Version 20130712A.

Version History:
20130711A:

- Compatibility with the Arduino 1.0+ library specifications.  
- Changes to support Arduino IDE 1.0 (tested with IDE 1.0.5):
- NewSoftSerial now part of Arduino Core as SoftwareSerial
- print(value, BYTE) deprecated, replaced with write(value); 
- size_t types for virtual write() function. 
	
20130712A:

- Arduino core deprecated print(variable,BYTE), so made the write() method not private
(I wanted to be able to print a degree symbol)
  
20131030A:

- Verified compatibility with the Sparkfun 20x4 5v LCD.   Includes a new demo program
specifically for the 20x4 unit. 
- All command sequences get a delay of SERLCD_SHORT_DELAY to improve reliability.
Default is 10 ms, but you can change that in serlcd.h if you want.  
	
Due to the Arduino IDE 1.0 changes, this may not work on older versions of the 
Arduino IDE.  Your mileage may vary.  

I have only tested this with the 5v 16x2, and 5v 20x4 display.  Your mileage may vary.  
I tested this version with an Arduino UNO R2, and an UNO R3.   

Originally this library required NewSoftSerial, available from http://arduiniana.org, 
which lets you run Serial Port style communications on pins other than the hardware pins.
As of version 20130711A NewSoftSerial is replaced with the Arduino Core SoftwareSerial  

As usual, I wrote this for myself, and it works for me.  It may not work for you, in 
which case I sympathize.  

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA

	
***********************************************************************************/

#ifndef SerLCD_h
#define SerLCD_h

// Compatibility with the Arduino 1.0 library standard
#if defined(ARDUINO) && ARDUINO >= 100  
#include "Arduino.h"  
#else  
#include "WProgram.h"   
#endif

#include "SoftwareSerial.h"
#include <inttypes.h>
#include "Print.h"

#define SERLCD_COMMAND 0xFE
#define SERLCD_BACKLIGHT_COMMAND 0x7C
#define SERLCD_BACKLIGHT_COMMAND_DELAY_MS 5
#define SERLCD_SHORT_DELAY 10
#define LCD_BACKLIGHT   0x80

class SerLCD : public Print
{
	public:
		SerLCD(SoftwareSerial &_SerTX); 
		SerLCD(SoftwareSerial &_SerTX, int _columns, int _rows, int pin);
		void begin(); 
		void clear(); 
		void setPosition(int row, int col);
		void cursorRight();
		void cursorLeft();
		void scrollRight();
		void scrollLeft();
		void displayOff();
		void displayOn(); 
		void underlineCursorOn();
		void underlineCursorOff();
		void boxCursorOn();
		void boxCursorOff();
		void setBacklight(int value);
    	void setBrightness(int value);
		size_t write(uint8_t byte);  // If this is public, we can use SerLCD->write() for custom characters

	private: 
		SoftwareSerial *SerTX; 
		//size_t write(uint8_t byte);    // changed to public due to deprecation of Arduino's print(variable,BYTE) mode.  "use write() instead"
		int columns, rows;

};


#endif
