import paho.mqtt.client as paho
import random
broker="localhost"
port=1883 
pub_topic="news/stream" 

def on_publish(client,userdata,result):             #create function for callback
    print("Message published!")

client1 = paho.Client("publisher{0}".format(random.randint(0,99999999)))                           #create client object
#client1.on_publish = on_publish                          #assign function to callback
if(not client1.connect(broker,port)):                              #establish connection
    print("Connected.")



import time
import random
import feedparser
import json

authors = ['Asdrubal', 'Luizadino','Yarapy']
approved = [True, False, False, False, False]

print("publishing...")

while(True):
    d = feedparser.parse('http://rss.uol.com.br/feed/noticias.xml')
    for post in d.entries:
        item ={
               'title':    post.title,
               'summary':  post.summary,
               'link':     post.link,
               'source':   'uol',
               'author':   random.choice (authors),
               'approved': random.choice (approved)
              }

        client1.publish(pub_topic,json.dumps(item)) 
        time.sleep(random.randint(3,7))
print("Finished publishing!")
