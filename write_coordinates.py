import pandas as pd
from os import path, listdir


dir_name = "drawing_csv"
files = listdir(dir_name)

if len(files) > 1:
    print('Error: Make sure there is only one file in the directory "drawing_csv"')
    exit()

csv_file_path = path.join(dir_name, files[0])
df = pd.read_csv(csv_file_path)

write_file_path = 'src/drawing.js'

if path.exists(write_file_path):
    print('There is already a vector path that is generated.')

    decision = input('Overwrite the file? (y/n): ')

    if decision.lower() == "y":
        # Empties the content of the file
        open(write_file_path, 'w').close()

    elif decision.lower() == "n":
        print('quitting...')
        exit()

print('Processing coordinates...')

writeFile = open(write_file_path, 'w')
writeFile.writelines("let drawing = [\n")
toWrite = []

for index, row in df.iterrows():
    x, y = list(row)
    toWrite.append(f"{{ x: {x}, y: {y} }},\n")

for line in toWrite:
    writeFile.writelines(line)

writeFile.writelines("]")

print('Success!')
