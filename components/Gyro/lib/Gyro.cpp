/*
https://github.com/sparkfun/ITG-3200_Breakout
Original Author:
Basic Example Sketch for the ITG-3200 (http://www.sparkfun.com/products/9801)
SparkFun Electronics 2011
Ryan Owens
3/16/11
Updtaed for Arduino 1.0 and beyond:
Joel Bartlett 
SparkFun Electronics
10/16/13
This code is public domain buy you buy me a beer if you use this and we meet someday (Beerware license).

Modified by Circuito

*/

#include "Gyro.h"
#include <Arduino.h>
#include <Wire.h>

//This is a list of registers in the ITG-3200. Registers are parameters that determine how the sensor will behave, or they can hold data that represent the
//sensors current status.
//To learn more about the registers on the ITG-3200, download and read the datasheet.
const unsigned char WHO_AM_I    = 0x00;
const unsigned char SMPLRT_DIV  = 0x15;
const unsigned char DLPF_FS     = 0x16;
const unsigned char GYRO_XOUT_H = 0x1D;
const unsigned char GYRO_XOUT_L = 0x1E;
const unsigned char GYRO_YOUT_H = 0x1F;
const unsigned char GYRO_YOUT_L = 0x20;
const unsigned char GYRO_ZOUT_H = 0x21;
const unsigned char GYRO_ZOUT_L = 0x22;

//This is a list of settings that can be loaded into the registers.
//DLPF, Full Scale Register Bits
//FS_SEL must be set to 3 for proper operation
//Set DLPF_CFG to 3 for 1kHz Fint and 42 Hz Low Pass Filter
const unsigned char DLPF_CFG_0    = (1<<0);
const unsigned char DLPF_CFG_1    = (1<<1);
const unsigned char DLPF_CFG_2    = (1<<2);
const unsigned char DLPF_FS_SEL_0 = (1<<3);
const unsigned char DLPF_FS_SEL_1 = (1<<4);

const unsigned char SAMPLE_100HZ  = 9;

Gyro::Gyro()
{
  //Initialize the I2C communication. This will set the Arduino up as the 'Master' device.
  Wire.begin();
}

char Gyro::Setup()
{
  //Read the WHO_AM_I register and print the result
  char id=0; 
  id = regRead(WHO_AM_I);  
  
  //Configure the gyroscope
  //Set the gyroscope scale for the outputs to +/-2000 degrees per second
  regWrite(DLPF_FS, (DLPF_FS_SEL_0 |
                     DLPF_FS_SEL_1 | 
                     DLPF_CFG_0     ));
  
  //Set the sample rate to 100 hz
  regWrite(SMPLRT_DIV, SAMPLE_100HZ);
  
  return id;
}



//This function will write a value to a register on the itg-3200.
//Parameters:
//  char address: The I2C address of the sensor. For the ITG-3200 breakout the address is 0x69.
//  char registerAddress: The address of the register on the sensor that should be written to.
//  char data: The value to be written to the specified register.
void Gyro::regWrite(char registerAddress, char data)
{
  //Initiate a communication sequence with the desired i2c device
  Wire.beginTransmission(ITGAddress);
  //Tell the I2C address which register we are writing to
  Wire.write(registerAddress);
  //Send the value to write to the specified register
  Wire.write(data);
  //End the communication sequence
  Wire.endTransmission();
}

//This function will read the data from a specified register on the ITG-3200 and return the value.
//Parameters:
//  char address: The I2C address of the sensor. For the ITG-3200 breakout the address is 0x69.
//  char registerAddress: The address of the register on the sensor that should be read
//Return:
//  unsigned char: The value currently residing in the specified register
unsigned char Gyro::regRead(char registerAddress)
{
  //This variable will hold the contents read from the i2c device.
  unsigned char data=0;
  
  //Send the register address to be read.
  Wire.beginTransmission(ITGAddress);
  //Send the Register Address
  Wire.write(registerAddress);
  //End the communication sequence.
  Wire.endTransmission();
  
  //Ask the I2C device for data
  Wire.beginTransmission(ITGAddress);
  Wire.requestFrom(ITGAddress, 1);
  
  //Wait for a response from the I2C device
  if(Wire.available()){
    //Save the data sent from the I2C device
    data = Wire.read();
  }
  
  //End the communication sequence.
  Wire.endTransmission();
  
  //Return the data read during the operation
  return data;
}

//This function is used to read the X-Axis rate of the gyroscope. The function returns the ADC value from the Gyroscope
//NOTE: This value is NOT in degrees per second. 
int Gyro::getX()
{
  int data=0;
  data =  regRead(GYRO_XOUT_H)<<8;
  data |= regRead(GYRO_XOUT_L);  
  
  return data;
}

//This function is used to read the Y-Axis rate of the gyroscope. The function returns the ADC value from the Gyroscope
//NOTE: This value is NOT in degrees per second. 
//Usage: int yRate = readY();
int Gyro::getY()
{
  int data=0;
  data =  regRead(GYRO_YOUT_H)<<8;
  data |= regRead(GYRO_YOUT_L);  
  
  return data;
}

//This function is used to read the Z-Axis rate of the gyroscope. The function returns the ADC value from the Gyroscope
//NOTE: This value is NOT in degrees per second. 
//Usage: int zRate = readZ();
int Gyro::getZ()
{
  int data=0;
  data =  regRead(GYRO_ZOUT_H)<<8;
  data |= regRead(GYRO_ZOUT_L);  
  
  return data;
}