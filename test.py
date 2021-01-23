import pandas as pd
import os.path as path
print('processing coordinates')
fileName = "drawing.js"
df = pd.read_csv('drawing.csv')

if path.exists(fileName):

    # Empties the content of the file
    open(fileName, 'w').close()


writeFile = open(fileName, 'w')
writeFile.writelines("let drawing = [\n")
toWrite = []

for index, row in df.iterrows():
    x, y = list(row)
    toWrite.append(f"{{ x: {x}, y: {y} }},\n")

for line in toWrite:
    writeFile.writelines(line)

writeFile.writelines("]")
print('Success!')
