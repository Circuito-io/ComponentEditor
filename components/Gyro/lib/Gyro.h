/** \addtogroup Gyro
 *  @{
 */
 
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

#ifndef _GYRO_H_
#define _GYRO_H_

class Gyro  {

	public:

	/**
	* Constructor that sets pin 6 output for controlling the Gyro.
	*/
	Gyro();
	
	/**This function is used to setup gyro
	* Usage: 
	*/
	char Setup();
	
		
	/**This function will read the data from a specified register on the ITG-3200 and return the value.
	*Parameters:
	*  char registerAddress: The address of the register on the sensor that should be read
	*Return:
	*  unsigned char: The value currently residing in the specified register
	*/
	unsigned char regRead(char registerAddress);

	/**This function will write a value to a register on the itg-3200.
	*Parameters:
	*  char registerAddress: The address of the register on the sensor that should be written to.
	*  char data: The value to be written to the specified register.
	*/
	void regWrite(char registerAddress, char data);


	/**This function is used to read the X-Axis rate of the gyroscope. The function returns the ADC value from the Gyroscope
	* NOTE: This value is NOT in degrees per second. 
	*/
	int getX(void);

	/**This function is used to read the Y-Axis rate of the gyroscope. The function returns the ADC value from the Gyroscope
	*NOTE: This value is NOT in degrees per second. 
	*/
	int getY(void);

	/**This function is used to read the Z-Axis rate of the gyroscope. The function returns the ADC value from the Gyroscope
	*NOTE: This value is NOT in degrees per second. 
	*/
	int getZ(void);

	
	private:
	//I2C devices each have an address. The address is defined in the datasheet for the device. The ITG-3200 breakout board can have different address depending on how
	//the jumper on top of the board is configured. By default, the jumper is connected to the VDD pin. When the jumper is connected to the VDD pin the I2C address
	//is 0x69.
	const char ITGAddress = 0x69;

};

#endif // _GYRO_H_
 /** @}*/