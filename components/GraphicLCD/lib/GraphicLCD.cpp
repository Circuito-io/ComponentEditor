/**********************************************
 * 
 * Based on SparkFun's Library
 * 
 * Graphic m_serial LCD Libary Main File
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

#include "GraphicLCD.h"

const byte CONTROL      = 0x7C;
const byte CLEAR_SCREEN = 0x00;
const byte REVERSE_MODE = 0x12;
const byte SPLASH       = 0x13;
const byte BACK_LIGHT   = 0x02;
const byte DEMO         = 0x04;

//initialize an instance of the Softwarem_serial library 
GraphicLCD::GraphicLCD(const int rxPin, const int txPin) :
  m_serial(txPin,rxPin) // Swapping pin orders to Arduino's perspectiv (rx->tx, tx->rx)
{
  m_serial.begin(115200);
  clear();
}

void GraphicLCD::print(char *str)
{
  m_serial.print(str);
}


void GraphicLCD::print(int8_t num)
{
  m_serial.print(num);
}

void GraphicLCD::println(char *str)
{
  m_serial.println(str);
}


void GraphicLCD::println(int8_t num)
{
  m_serial.println(num);
}


void GraphicLCD::clear()
{
  m_serial.write(CONTROL);
  m_serial.write(CLEAR_SCREEN);
}
//-------------------------------------------------------------------------------------------
void GraphicLCD::toggleReverseMode()
{
  //Everything that was black is now white and vise versa
  m_serial.write(CONTROL);
  m_serial.write(REVERSE_MODE);
}
//-------------------------------------------------------------------------------------------
void GraphicLCD::toggleSplash()
{
  //turns the splash screen on and off, the 1 second delay at startup stays either way.
  m_serial.write(CONTROL);
  m_serial.write(SPLASH);
}
//-------------------------------------------------------------------------------------------
void GraphicLCD::setBacklight(byte duty)
{
  //changes the back light intensity, range is 0-100.
  m_serial.write(CONTROL);
  m_serial.write(BACK_LIGHT); //CTRL b
  m_serial.write(duty); //send a value of 0 - 100
}
//-------------------------------------------------------------------------------------------
void GraphicLCD::setBaud(byte baud)
{
  //changes the baud rate.
  m_serial.write(CONTROL);
  m_serial.write(0x07); //CTRL g
  m_serial.write(baud); //send a value of 49 - 54
  delay(100);

/*
“1” = 4800bps - 0x31 = 49
“2” = 9600bps - 0x32 = 50
“3” = 19,200bps - 0x33 = 51
“4” = 38,400bps - 0x34 = 52
“5” = 57,600bps - 0x35 = 53
“6” = 115,200bps - 0x36 = 54
*/

  //these statements change the Softwarem_serial baud rate to match the baud rate of the LCD. 
  if(baud == 49)
  {
  m_serial.end();
  m_serial.begin(4800);
  }
  if(baud == 50)
  {
  m_serial.end();
  m_serial.begin(9600);
  }
  if(baud == 51)
  {
  m_serial.end();
  m_serial.begin(19200);
  }
  if(baud == 52)
  {
  m_serial.end();
  m_serial.begin(38400);
  }
  if(baud == 53)
  {
  m_serial.end();
  m_serial.begin(57600);
  }
  if(baud == 54)
  {
  m_serial.end();
  m_serial.begin(115200);
  }
}
//-------------------------------------------------------------------------------------------
void GraphicLCD::restoreDefaultBaud()
{
  //This function is used to restore the default baud rate in case you change it 
  //and forget to which rate it was changed. 
  
  
  m_serial.end();//end the transmission at whatever the current baud rate is
  
  //cycle through every other possible buad rate and attemp to change the rate back to 115200
  m_serial.begin(4800);
  m_serial.write(CONTROL);
  m_serial.write(0x07);
  m_serial.write(54);//set back to 115200
  m_serial.end();
  
  m_serial.begin(9600);
  m_serial.write(CONTROL);
  m_serial.write(0x07);
  m_serial.write(54);//set back to 115200
  m_serial.end();
  
  m_serial.begin(19200);
  m_serial.write(CONTROL);
  m_serial.write(0x07);
  m_serial.write(54);//set back to 115200
  m_serial.end();
  
  m_serial.begin(38400);
  m_serial.write(CONTROL);
  m_serial.write(0x07);
  m_serial.write(54);//set back to 115200
  m_serial.end();
  
  m_serial.begin(57600);
  m_serial.write(CONTROL);
  m_serial.write(0x07);
  m_serial.write(54);//set back to 115200
  m_serial.end();
  
  m_serial.begin(115200);
  delay(10);
  m_serial.write(CONTROL);
  m_serial.write((byte)0); //clearScreen
  m_serial.print("Baud restored to 115200!");
  delay(5000);

}
//-------------------------------------------------------------------------------------------
void GraphicLCD::demo()
{
  //Demonstartes all the capabilities of the LCD
  m_serial.write(CONTROL);
  m_serial.write(DEMO);//CTRL d
}
//-------------------------------------------------------------------------------------------
void GraphicLCD::setX(byte posX) //0-127 or 0-159 pixels
{
  //Set the X position 
  m_serial.write(CONTROL);
  m_serial.write(0x18);//CTRL x
  m_serial.write(posX);

//characters are 8 pixels tall x 6 pixels wide
//The top left corner of a char is where the x/y value will start its print
//For example, if you print a char at position 1,1, the bottom right of your char will be at position 7,9.
//Therefore, to print a character in the very bottom right corner, you would need to print at the coordinates 
//x = 154 , y = 120. You should never exceed these values.


// Here we have an example using an upper case 'B'. The star is where the character starts, given a set 
//of x,y coordinates. # represents the blocks that make up the character, and _ represnets the remaining 
//unused bits in the char space. 
//    *###__
//    #   #_
//    #   #_
//    ####__
//    #   #_
//    #   #_
//    ####__
//    ______
}
//-------------------------------------------------------------------------------------------
void GraphicLCD::setY(byte posY)//0-63 or 0-127 pixels
{
  //Set the y position 
  m_serial.write(CONTROL);
  m_serial.write(0x19);//CTRL y
  m_serial.write(posY);
  
}
//-------------------------------------------------------------------------------------------
void GraphicLCD::setHome()
{
  m_serial.write(CONTROL);
  m_serial.write(0x18); 
  m_serial.write((byte)0);//set x back to 0
  
  m_serial.write(CONTROL);
  m_serial.write(0x19); 
  m_serial.write((byte)0);//set y back to 0
}
//-------------------------------------------------------------------------------------------
void GraphicLCD::drawPixel(byte x, byte y, byte set)
{
  m_serial.write(CONTROL);
  m_serial.write(0x10);//CTRL p
  m_serial.write(x);
  m_serial.write(y);
  m_serial.write(set);
  delay(10);
}
//-------------------------------------------------------------------------------------------
void GraphicLCD::drawLine(byte x1, byte y1, byte x2, byte y2)
{
  //draws a line from two given points.
  m_serial.write(CONTROL);
  m_serial.write(0x0C);//CTRL l 
  m_serial.write(x1);
  m_serial.write(y1);
  m_serial.write(x2);
  m_serial.write(y2);
  m_serial.write(PIXEL_ON);
  delay(10);
  
}
//-------------------------------------------------------------------------------------------
void GraphicLCD::drawBox(byte x1, byte y1, byte x2, byte y2)
{
  //draws a box from two given points.
  m_serial.write(CONTROL);
  m_serial.write(0x0F);//CTRL o 
  m_serial.write(x1);
  m_serial.write(y1);
  m_serial.write(x2);
  m_serial.write(y2);
  m_serial.write(PIXEL_ON);
  delay(10);
  
}
//-------------------------------------------------------------------------------------------
void GraphicLCD::drawCircle(byte x, byte y, byte rad)
{
//draws a circle from a point x,y with a radius of rad. 
//Circles can be drawn off-grid, but only those pixels that fall within the 
//display boundaries will be written.
  m_serial.write(CONTROL);
  m_serial.write(0x03);//CTRL c 
  m_serial.write(x);
  m_serial.write(y);
  m_serial.write(rad);
  m_serial.write(PIXEL_ON);
  delay(10);
  
}
//-------------------------------------------------------------------------------------------
void GraphicLCD::clearBlock(byte x1, byte y1, byte x2, byte y2)
{
  //This is just like the draw box command, except the contents of the box are erased to the background color
  m_serial.write(CONTROL);
  m_serial.write(0x05);//CTRL e 
  m_serial.write(x1);
  m_serial.write(y1);
  m_serial.write(x2);
  m_serial.write(y2);
  delay(10);
  
}
