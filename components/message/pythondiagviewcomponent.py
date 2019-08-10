from ipywidgets import interact, interactive, fixed, interact_manual, Button, HBox, VBox, Layout
import ipywidgets as widgets
from datetime import date, timedelta, datetime
import time
import random
import paho.mqtt.client as paho

broker="localhost"
port=1883
def on_publish(client,userdata,result):             #create function for callback
    print("data published \n")
    pass
client1= paho.Client("view1")                           #create client object
client1.on_publish = on_publish                          #assign function to callback
client1.connect(broker,port)                                 #establish connection


options={"Yes":"t", "No":"f"}
w_output                  = widgets.Label(        description='', value="...") 
w_zombie_name             = widgets.Text(          description='Zombie Name: ',    value  ='Kritys',     disabled=False )
w_char_paralysis          = widgets.Dropdown(      description='Paralysis: ',      options=options    ,continuous_update=False, layout=Layout(width='50%'))
w_char_yellow_tong        = widgets.Dropdown(      description='Yellow Tong: ',    options=options    ,continuous_update=False, layout=Layout(width='50%'))
w_char_member_loss        = widgets.Dropdown(      description='Member Loss: ',    options=options    ,continuous_update=False, layout=Layout(width='50%'))
w_char_chest_pain         = widgets.Dropdown(      description='Chest Pain: ',    options=options    ,continuous_update=False, layout=Layout(width='50%'))
w_char_trembling_finger   = widgets.Dropdown(      description='Trembling Finger: ',    options=options    ,continuous_update=False, layout=Layout(width='50%'))
w_char_severe_anger       = widgets.Dropdown(      description='Severe Anger: ',    options=options    ,continuous_update=False, layout=Layout(width='50%'))
w_char_history_bacteria   = widgets.Dropdown(      description='History Bacteria: ',    options=options    ,continuous_update=False, layout=Layout(width='50%'))
w_bt_load                 = widgets.Button(       description='Diagnosis!'  )
 
def generate_output(x):
    output = "{0},{1},{2},{3},{4},{5},{6},{7}".format(w_char_paralysis.value,w_char_yellow_tong.value,w_char_member_loss.value,w_char_chest_pain.value,w_char_trembling_finger.value,w_char_severe_anger.value,w_char_history_bacteria.value,w_zombie_name.value)
    w_output.value = output
    ret= client1.publish("/zombieclinic/diagnosis/request",output)  
w_bt_load.on_click(generate_output)

image = widgets.HTML(value='<img src="https://www.shareicon.net/data/256x256/2016/09/13/828573_avatar_512x512.png" >')
hbox1 = widgets.HBox([w_zombie_name,w_bt_load],layout=Layout(width='100%'))
hbox2 = widgets.VBox([w_char_paralysis,w_char_yellow_tong,w_char_member_loss,w_char_chest_pain,w_char_trembling_finger,w_char_severe_anger,w_char_history_bacteria],layout=Layout(width='100%'))
hbox3 = widgets.HBox(children=[image, hbox2], layout=Layout(width='100%'))
display( hbox3 )
display( hbox1 )
display(w_output)




