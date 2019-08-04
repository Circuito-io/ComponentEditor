#include "U8glib.h"

#define DELAY_TIMEOUT 1500

U8GLIB_ST7920_128X64_1X u8g(13,11, 10);


int ir_right_pin = 6;
int ir_left_pin = 7;

int ir_right_state = 0;
int ir_left_state  = 0;

int ir_right_state_last = -1;
int ir_left_state_last  = -1;

int in_counter = 0;
int out_counter = 0;

bool bWalkIn = false;
bool bWalkOut = false;
unsigned long tm;

// for display integer value
enum {BufSize=8}; // If a is short use a smaller number, eg 5 or 6
char buf[BufSize];


void draw(void) {
  // graphic commands to redraw the complete screen should be placed here
  u8g.setFont(u8g_font_fub20);
  u8g.drawStr( 10, 25, "IN");
  u8g.drawStr( 65, 25, "OUT");

  u8g.setFont(u8g_font_timB24);

  if( in_counter < 10){
      snprintf (buf, BufSize, "00%d", in_counter);
  }
  else if( in_counter < 100){
      snprintf (buf, BufSize, "0%d", in_counter);
  }

  u8g.drawStr( 5, 60, buf);

  if( out_counter < 10){
      snprintf (buf, BufSize, "00%d", out_counter);
  }
  else if( out_counter < 100){
      snprintf (buf, BufSize, "0%d", out_counter);
  }


  u8g.drawStr( 70, 60, buf);

  u8g.drawLine(60,0,60,63);
}

void setup(void) {

   Serial.begin(9600);
   pinMode( ir_right_pin, INPUT);
   pinMode( ir_left_pin , INPUT);

  // flip screen, if required
  // u8g.setRot180();

  // set SPI backup if required
  //u8g.setHardwareBackup(u8g_backup_avr_spi);

  // assign default color value
  if ( u8g.getMode() == U8G_MODE_R3G3B2 ) {
    u8g.setColorIndex(255);     // white
  }
  else if ( u8g.getMode() == U8G_MODE_GRAY2BIT ) {
    u8g.setColorIndex(3);         // max intensity
  }
  else if ( u8g.getMode() == U8G_MODE_BW ) {
    u8g.setColorIndex(1);         // pixel on
  }
  else if ( u8g.getMode() == U8G_MODE_HICOLOR ) {
    u8g.setHiColorByRGB(255,255,255);
  }

  updateLCD();
}

void loop(void) {

     ir_right_state = digitalRead( ir_right_pin );
     ir_left_state =  digitalRead( ir_left_pin );

     Serial.print( ir_left_state );
     Serial.print( " " );
     Serial.println( ir_right_state );

     checkWalkIn();
     checkWalkOUT();


}
void checkWalkIn(){

    if( ir_right_state != ir_right_state_last ){

         ir_right_state_last = ir_right_state;
         if( (bWalkIn == false) && ( ir_right_state == LOW ) ){
              bWalkIn = true;
              tm = millis();
         }
     }

     if( (millis() - tm) > DELAY_TIMEOUT ){
          bWalkIn = false;
     }

     if( bWalkIn && (ir_left_state == LOW) && (ir_right_state == HIGH) ){
          bWalkIn = false;
          in_counter++;
          updateLCD();
     }

}
void checkWalkOUT(){

    if( ir_left_state != ir_left_state_last ){

         ir_left_state_last = ir_left_state;
         if( (bWalkOut == false) && ( ir_left_state == LOW ) ){
              bWalkOut = true;
              tm = millis();
         }
     }

     if( (millis() - tm) > DELAY_TIMEOUT ){
          bWalkOut = false;
     }

     if( bWalkOut && (ir_right_state == LOW) && (ir_left_state == HIGH) ){
          bWalkOut = false;
          out_counter++;
          updateLCD();
     }


}
void updateLCD(){
   u8g.firstPage();
  do {
    draw();
  } while( u8g.nextPage() );
}

