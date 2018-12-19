#ifndef _SWITCHABLE_H_
#define _SWITCHABLE_H_

//Base class for output that can be switched on/off via single digital pin:
class Switchable  
{
	public:

		// Consturcutor accepts pin number for output
	    Switchable(const int pin);
		
		// Turn pin on
		void on();
	    
	    // Turn pin off
		void off();
		
		// Toggle pin
		void toggle();
		
		// dim pin
		void dim(int dimVal);
		
		// Get current state
		bool getState();
		
		// Set state with bool variable
		void setState(bool state);
	
	private:
	
		const int m_pin; 	//output pin
		bool m_state;		//current state
};

#endif // _SWITCHABLE_H_
 