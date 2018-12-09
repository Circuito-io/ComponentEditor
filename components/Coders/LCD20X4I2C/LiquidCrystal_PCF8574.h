///
/// \file LiquidCrystal_PCF8574.h
/// \brief LiquidCrystal library with PCF8574 I2C adapter.
///
/// \author Matthias Hertel, http://www.mathertel.de
/// \copyright Copyright (c) 2014 by Matthias Hertel.\n
/// This work is licensed under a BSD style license.\n
/// See http://www.mathertel.de/License.aspx
/// 
/// Copyright (c) 2005-2012 by Matthias Hertel, http://www.mathertel.de/
/// All rights reserved.
///
/// * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
/// * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
/// * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the 
///   documentation and/or other materials provided with the distribution. Neither the name of the copyright owners nor the names of its 
///   contributors may be used to endorse or promote products derived from this software without specific prior written permission.
///
/// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, 
/// INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
/// IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, 
/// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
/// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT 
/// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


/// \details
/// This is a library for driving LiquidCrystal displays (LCD) by using the I2C bus and an PCF8574 I2C adapter.
/// This library is derived from the original Arduino LiquidCrystal library and uses the original Wire library for communication.
///
/// ChangeLog:
/// --------
/// * 19.10.2013 created.
/// * 24.05.2015 Arduino Library Manager compatible.
/// * 20.12.2016 circuito.io:
///                 * Added scrolling multiple chars to scrolling functions
///                 * Added selectLine function, same as setCursor(0, line - 1)
///                 * Added checkI2CConnection - prints to the serial monitor if connection faild. it is called inside begin.



#ifndef LiquidCrystal_PCF8574_h
#define LiquidCrystal_PCF8574_h

#include <inttypes.h>
#include "Print.h"

// commands
#define LCD_CLEARDISPLAY 0x01
#define LCD_RETURNHOME 0x02
#define LCD_ENTRYMODESET 0x04
#define LCD_DISPLAYCONTROL 0x08
#define LCD_CURSORSHIFT 0x10
#define LCD_FUNCTIONSET 0x20
#define LCD_SETCGRAMADDR 0x40
#define LCD_SETDDRAMADDR 0x80

// flags for display entry mode
#define LCD_ENTRYRIGHT 0x00
#define LCD_ENTRYLEFT 0x02
#define LCD_ENTRYSHIFTINCREMENT 0x01
#define LCD_ENTRYSHIFTDECREMENT 0x00

// flags for display on/off control
#define LCD_DISPLAYON 0x04
#define LCD_DISPLAYOFF 0x00
#define LCD_CURSORON 0x02
#define LCD_CURSOROFF 0x00
#define LCD_BLINKON 0x01
#define LCD_BLINKOFF 0x00

// flags for display/cursor shift
#define LCD_DISPLAYMOVE 0x08
#define LCD_CURSORMOVE 0x00
#define LCD_MOVERIGHT 0x04
#define LCD_MOVELEFT 0x00

// flags for function set
#define LCD_8BITMODE 0x10
#define LCD_4BITMODE 0x00
#define LCD_2LINE 0x08
#define LCD_1LINE 0x00
#define LCD_5x10DOTS 0x04
#define LCD_5x8DOTS 0x00

class LiquidCrystal_PCF8574 : public Print {
public:

  LiquidCrystal_PCF8574();
  LiquidCrystal_PCF8574(uint8_t addr);

  void begin(uint8_t cols, uint8_t rows, uint8_t charsize = LCD_5x8DOTS);
  void begin(uint8_t cols, uint8_t lines, uint8_t addr, uint8_t backlight);
  bool checkI2CConnection();

  void clear();
  void home();
  
  void noDisplay();
  void display();
  void noBlink();
  void blink();
  void noCursor();
  void cursor();
  void scrollDisplayLeft(int charsToScroll, int scrollSpeed);
  void scrollDisplayRight(int charsToScroll, int scrollSpeed);
  void leftToRight();
  void rightToLeft();
  void autoscroll();
  void noAutoscroll();

  void setBacklight(uint8_t brightness);
  
  void createChar(uint8_t, uint8_t[]);
  void setCursor(uint8_t col, uint8_t row);
  void selectLine(uint8_t line);

  virtual size_t write(uint8_t);
  using Print::write;

private:
  // low level functions
  void _command(uint8_t);
  void _send(uint8_t value, uint8_t mode);
  void _sendNibble(uint8_t halfByte, uint8_t mode);
  void _write2Wire(uint8_t halfByte, uint8_t mode, uint8_t enable);

// NEW:
  uint8_t _Addr;        ///< Wire Address of the LCD
  uint8_t _backlight;   ///< the backlight intensity 

  uint8_t _displayfunction; ///< lines and dots mode
  uint8_t _displaycontrol;  ///< cursor, display, blink flags
  uint8_t _displaymode;     ///< left2right, autoscroll

  uint8_t _numlines;        ///< The number of rows the display supports.
};

#endif
