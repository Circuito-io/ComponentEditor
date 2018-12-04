/**********************************************
 * 
 * Based on SparkFun's Library
 * 
 * Graphic Serial LCD Libary Main File
 * Joel Bartlett
 * SparkFun Electronics 
 * 9-25-13
 * 
 * SparkFun's license:
 * This product is open source!
 * 
 * The code is beerware; if you see me (or any other SparkFun employee) at the local, and you've found our code helpful, please buy us a round!
 * 
 * Please use, reuse, and modify these files as you see fit. Please maintain attribution to SparkFun Electronics and release anything derivative under the same license.
 * 
 * Distributed as-is; no warranty is given.
 * 
 * Your friends at SparkFun.
**********************************************/

#ifndef _LCD_H_
#define _LCD_H_

#include <Arduino.h>
#include <SoftwareSerial.h>

const byte PIXEL_ON     = 0x01;
const byte PIXEL_OFF    = 0x00;

class GraphicLCD
{
  public:
    GraphicLCD(const int rxPin, const int txPin);
    
    void print(char *Str);
    void print(int8_t num);
    void println(char *Str);
    void println(int8_t num);
    
    void clear();
    void toggleReverseMode();
    void toggleSplash();
    void setBacklight(byte duty);
    void setBaud(byte baud);
    void restoreDefaultBaud();
    void demo();
    
    void setHome();
    void setX(byte posX);
    void setY(byte posY);

    void drawPixel (byte x , byte y , byte set = PIXEL_ON);
    void drawLine  (byte x1, byte y1, byte x2, byte y2);
    void drawBox   (byte x1, byte y1, byte x2, byte y2);
    void drawCircle(byte x , byte y , byte rad        );
    void clearBlock(byte x1, byte y1, byte x2, byte y2);
  
  
  private:
    SoftwareSerial m_serial;
};


#endif // _LCD_H_

