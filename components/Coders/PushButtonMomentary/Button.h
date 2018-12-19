#ifndef _BUTTON_H_
#define _BUTTON_H_


//button  class:
class Button {
  public:
    Button(const int pin);
    //initialize button instance
    void init();
    //Read button state - without debounce
    bool read();
    //return True on both button events, Press or Release
    bool onChange();
    //return True only on Press
    bool onPress();
    //return True only on Release
    bool onRelease();
    

  private:
    const int m_pin;
    bool m_lastButtonState; //state variables
    long m_lastDebounceTime = 0;  // the last time the output pin was toggled
    const int m_debounceDelay = 50;    // the debounce time; increase if the output flickers
    bool m_pressFlag = 0;

};

#endif //_BUTTON_H_
