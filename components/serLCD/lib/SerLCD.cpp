/******************************************************************************* 
SerLCD - A library to use Sparkfun's SerLCD v2.5 backpack devices with the Arduino
Copyright (C) 2010 Steven Cogswell

See SerLCD.h for version history. 

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

// Compatibility with the Arduino 1.0 library standard
#if defined(ARDUINO) && ARDUINO >= 100  
#include "Arduino.h"  
#else  
#include "WProgram.h"   
#endif

#include "SoftwareSerial.h"    // Arduino 1.0+ includes NewSoftSerial as SoftwareSerial
#include "SerLCD.h"

// Constructor, to which you pass a previously generated NewSoftSerial  Object 
// e.g. - 
//   SoftwareSerial NSS(0,2);   // Note that SerLCD only has Rx and no Tx, so only really need a Tx from Arduino
//   SerLCD theLCD(NSS); 
// This will default to 16 columns, 2 row LCD.  Use the other constructor for more options. 
SerLCD::SerLCD(SoftwareSerial &_SerTX)
{
  
	SerTX = &_SerTX; 
	columns=16;
	rows=2;
}

// Constructor, to which you pass a previously generated SoftwareSerial  Object 
// and the rows and columns of your LCD 
// e.g. - 
//   SoftwareSerial NSS(0,2);
//   SerLCD theLCD(NSS,16,2); 
SerLCD::SerLCD(SoftwareSerial &_SerTX, int _columns, int _rows, int pin)
{
	SerTX = &_SerTX; 
	columns=_columns;
	rows=_rows; 
}

//SerLCD::serLCD(int pin) : SoftwareSerial(pin, pin){
//  pinMode(pin, OUTPUT);
//  begin(9600);
//  _numlines = LCD_2LINE;
//  _numchars = LCD_16CHAR;
//  _rowoffset = 0;
//}

// Does some (perhaps not so) helpful init of the SerLCD.   
void SerLCD::begin()
{
	SerTX->begin(9600);
	displayOn(); 
	clear(); 
	setBacklight(157); 
}

// Clears the SerLCD display.   
void SerLCD::clear() 
{
	SerTX->write(SERLCD_COMMAND); // commmand 
    SerTX->write(0x01);   // Clear LCD
    delay(SERLCD_SHORT_DELAY);   
}

// Uses the virutal "write" of the Print::print class to pass all "print" statements
// through to the Print::print class.  This gets the bonus of less compiled code and 
// all the flexibility of the existing Print::print class without having to implement 
// any of it yourself. 
size_t SerLCD::write(uint8_t byte)
{
	SerTX->write(byte); 
	delay(SERLCD_SHORT_DELAY);   
}

// Sets the position of the cursor on the SerLCD.   Sparkfun uses absolute positions
// but this accepts as row/column position
void SerLCD::setPosition(int row, int col) 
{
	int pos; 
	// For 16-character displays
	if (columns==16) {
		if (row==1) {
			pos=col;
		} else if (row==2) {
			pos=col+64; 
		} else if (row==3) {
			pos=col+16; 
		} else if (row==4) {
			pos=col+80;
		}
	} else if (columns==20) {
		if (row==1) {
			pos=col;
		} else if (row==2) {
			pos=col+64; 
		} else if (row==3) {
			pos=col+20; 
		} else if (row==4) {
			pos=col+84;
		}
	}
		
	pos=pos+128;   // Cursor move command
	SerTX->write(SERLCD_COMMAND); 
	SerTX->write(pos); 
	delay(SERLCD_SHORT_DELAY);   
}

// Move the cursor one space to the right 
void SerLCD::cursorRight()
{
	SerTX->write(SERLCD_COMMAND); 
	SerTX->write(0x14); 
	delay(SERLCD_SHORT_DELAY);   
}

// Move the cursor one space to the left 
void SerLCD::cursorLeft()
{
	SerTX->write(SERLCD_COMMAND); 
	SerTX->write(0x10); 
	delay(SERLCD_SHORT_DELAY);   
}

// Scroll the entire display one position to the right 
void SerLCD::scrollRight()
{
	SerTX->write(SERLCD_COMMAND); 
	SerTX->write(0x1C);
	delay(SERLCD_SHORT_DELAY);   
}

// Scroll the entire display one position to the left 
void SerLCD::scrollLeft()
{
	SerTX->write(SERLCD_COMMAND); 
	SerTX->write(0x18);
	delay(SERLCD_SHORT_DELAY);   
}

// Turn off the display.  Does not affect backlight setting. 
void SerLCD::displayOff() 
{
	SerTX->write(SERLCD_COMMAND); 
	SerTX->write(0x08);
	delay(SERLCD_SHORT_DELAY);   
}

// Turn display on.  Does not affect backlight setting. 
void SerLCD::displayOn() 
{
	SerTX->write(SERLCD_COMMAND); 
	SerTX->write(0x0C);    
	delay(SERLCD_SHORT_DELAY);   
}

// Turns on the "underline"  (" _ ") style cursor 
void SerLCD::underlineCursorOn()
{
	SerTX->write(SERLCD_COMMAND); 
	SerTX->write(0x0E);
	delay(SERLCD_SHORT_DELAY);   
}

// Turns off the underline cursor.  Technically turns off the box cursor since it's the same command 
void SerLCD::underlineCursorOff()
{
	SerTX->write(SERLCD_COMMAND); 
	SerTX->write(0x0C);
	delay(SERLCD_SHORT_DELAY);   
}

// Turns on the "Box" style cursor
void SerLCD::boxCursorOn()
{
	SerTX->write(SERLCD_COMMAND); 
	SerTX->write(0x0D);
	delay(SERLCD_SHORT_DELAY);   

}

// Turns off the box cursor.  Technically turns off the underline cursor since it's the same command 
void SerLCD::boxCursorOff()
{
	SerTX->write(SERLCD_COMMAND); 
	SerTX->write(0x0C);
	delay(SERLCD_SHORT_DELAY);   
}

// Set the backlight intensity level.  According to the Sparkfun 2.5 document, acceptable values 
// are 128 (off) to 157 (full on).  
void SerLCD::setBacklight(int value) 
{
	// Enforce values to 128-157 range, as values outside do different things. 
	if (value >157)
	{
		value=157;
	}
	if (value <128) 
	{
		value=128;
	}

	SerTX->write(SERLCD_BACKLIGHT_COMMAND); 
	delay(SERLCD_BACKLIGHT_COMMAND_DELAY_MS); // A brief delay, or it seems the SerLCD will hang up. 
	SerTX->write(value);
	delay(SERLCD_BACKLIGHT_COMMAND_DELAY_MS); // A brief delay, or it seems the SerLCD will hang up. 
}



// Set brightness value range 1-30 1=OFF 30=FULL
void SerLCD::setBrightness(int val){
  if(val >= 1 && val <= 30){

  SerTX->write(SERLCD_BACKLIGHT_COMMAND); 
  delay(SERLCD_BACKLIGHT_COMMAND_DELAY_MS); // A brief delay, or it seems the SerLCD will hang up. 
  
  SerTX->write(LCD_BACKLIGHT | (val - 1));
  delay(SERLCD_BACKLIGHT_COMMAND_DELAY_MS); // A brief delay, or it seems the SerLCD will hang up. 

  }
}
