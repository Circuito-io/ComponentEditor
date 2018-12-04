#ifndef _ULTRASONIC_H_
#define _ULTRASONIC_H_

class UltraSonic  {

	public:

	/**
	* Constructor that sets the PWM input.
	*/
	UltraSonic(const int PWMPin);
	
	/**
	 * Read distance in inches
	 *
	 * Read distance in inches from pwm by converting micro second to inches.
	 *
	 * @return value in inches
	 */
	float  getInches();
	
	 /**
	 * Read distance in cm
	 *
	 * Read distance in cm from pwm by converting inches to cm.
	 *
	 * @return value in cm
	 */
	float  getCms();
	
	
	 /**
	 * Read distance in cm
	 *
	 * Read distance in cm from pwm by converting inches to cm.
	 *
	 * @return value in cm
	 */
	float  read();

	private:
	
	const int m_PWMPin;

};

#endif // _ULTRASONIC_H_
