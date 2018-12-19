/** \addtogroup RGBLed
 *  @{
 */

#ifndef RGBLED_H
#define RGBLED_H

#define COMMON_ANODE 0
#define COMMON_CATHODE 1

class RGBLed
{
	public:
		RGBLed(int redPin, int greenPin, int bluePin, bool type = COMMON_ANODE);
		void setRGB(int R, int G, int B);             
		void turnOff();  
	private:
		const int rPin,gPin,bPin;
    bool TYPE;
};
#endif //__RGBLED_H

 /** @}*/