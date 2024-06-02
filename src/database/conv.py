import csv
import json

# Replace 'your_json_file.json' with the actual filename
with open('db.json', 'r') as json_file:
    data = json.load(json_file)

# Replace 'output.csv' with your desired output filename
with open('output.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    # Assuming your JSON data has a list of dictionaries, iterate through them
    for item in data:
        # Example: Write each dictionary's keys and values as separate rows
        writer.writerow(item.keys())
        writer.writerow(item.values())

print("JSON converted to CSV successfully!")
