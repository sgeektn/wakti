import imaplib, email 
import emails.loader
import base64
import json


def get_body(msg): 
    if msg.is_multipart(): 
        return get_body(msg.get_payload(0)) 
    else: 
        return msg.get_payload(None, True) 
  
def search(key, value, con):  
    result, data = con.search(None, key, '"{}"'.format(value)) 
    return data 
  
def get_emails(con,result_bytes): 
    msgs = [] # all the email data are pushed inside an array 
    for num in result_bytes[0].split(): 
        typ, data = con.fetch(num, '(RFC822)') 
        msgs.append(data) 
  
    return msgs 
  

def check_folder(folder,con,user,password,imap,to_adress): #Inbox  
    con.select(folder)  
    result=[]
    #print(con.list())
    #msgs = get_emails(search('TO', to_adress, con)) 
    msgs = get_emails(con,search('TO', to_adress, con)) 
     
    for msg in msgs[::-1]:  
        for sent in msg: 
            if type(sent) is tuple:  
      
                # encoding set as utf-8 
                content = str(sent[1], 'utf-8')  
                data = str(content) 
                mail_number=(str(sent[0])[2:str(sent[0]).find('(')-1])
               
                # Handling errors related to unicodenecode 
                try:  
                    indexstart = data.find("ltr") 
                    data2 = data[indexstart + 5: len(data)] 
                    indexend = data2.find("</div>") 
                    #Deleting email
                    con.store(mail_number, '+FLAGS', r'(\Deleted)')
                    con.expunge()
                    # printtng the required content which we need 
                    # to extract from our email i.e our body 
                    mail_data=data2[0: indexend]
                    
                    msg = email.message_from_string(mail_data)
                    #print(msg)
                    mail_result={}
                    mail_result["from_adress"]=msg['From']
                    mail_result["to_adress"]=to_adress
                    mail_result["subject"]=msg['Subject']
                    
                    message = emails.loader.from_rfc822(mail_data)
                    if msg.get_content_type().find("text")!=-1:
                        content=message.text
                    else:
                        content=message.html

                    mail_result["content"]=base64.b64encode(content.encode('ascii'))    
                    result.append(mail_result)
                except UnicodeEncodeError as e: 
                    pass
    return result
def main(user,password,imap_url,to_adress):
    con = imaplib.IMAP4_SSL(imap_url)  
    con.login(user, password)  
    #con.close()
    return (check_folder("Inbox", con,user,password,imap_url,to_adress)+check_folder("[Gmail]/Spam", con,user,password,imap_url,to_adress))
    

if __name__ == "__main__": 
    print(main("garvacht@gmail.com", "001001Az", "imap.gmail.com", "samifakhfzkh@invoice.fund"))
