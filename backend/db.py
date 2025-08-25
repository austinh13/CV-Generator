import sqlite3

conn = sqlite3.connect("jobData.db")
cursor = conn.cursor()

with open("jobs.sql","r") as f:
    sql_script = f.read()

cursor.executescript(sql_script)

conn.commit()
conn.close()