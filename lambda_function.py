import pandas as pd
import psycopg2
from psycopg2.extras import RealDictCursor
import json


host = 'databsei2.cfm0y80wmkly.ap-south-1.rds.amazonaws.com'
username ="postgres"
password = "postgres"
database ="Books"

conn = psycopg2.connect(
    host = host,
    database = database,
    user = username,
    password = password
)

def lambda_handler():
    
    df = pd.read_csv('C:\\Users\\Suvetha Devi\\PycharmProjects\\AULib\Python_Amazon-rds\\aws-lambda-python-main\\input\\users_aulib.csv')
    
    cur = conn.cursor(cursor_factory = RealDictCursor)
    for i in range(len(df)):
        cur.execute("INSERT INTO Student (studentname, studentemail, studentpassword, regno, department) VALUES(%s,%s,%s,%s,%s)",(df['Name'][i],df['email'][i],df['password'][i],str(df['RegNo'][i]),df['Department'][i]))

    conn.commit()
    cur.execute("select * from Student")
    results = cur.fetchall()
    json_result = json.dumps(results)


    print(json_result)
    return json_result
    

"Other works:"
# Download format csv to be uploaded
# Accepting and inserting any kind of columns present in csv into db
# optimizing the loop for bulk uploads of columns
# delete csv after inserting done (or) add an id to filename for identifying which file has been processed
