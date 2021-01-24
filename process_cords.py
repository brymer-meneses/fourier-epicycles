import pandas as pd
import numpy as np
from os import path, listdir


def get_CoM(df):
    N = df.shape[0]

    com_x, com_y = np.sum(df["x"])/N, np.sum(df["y"])/N

    return np.array([com_x, com_y])


dir_name = "drawing_csv"
files = listdir(dir_name)


# <============================ FILE CHECKING ======================================>

file_dir = None
if len(files) > 1:

    print("There are many files!\n")
    for file in files:
        print(file)

    while True:
        file = input("\nPlease type the name of the file you want to choose: ")
        file_dir = path.join(dir_name, file)

        if not(path.isfile(file_dir)):
            continue
        else:
            print(f"Chosen File: {file_dir}")
            break


df = pd.read_csv(file_dir)
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

# <============================ FILE CHECKING ======================================>


print('Translating and Writing the coordinates...')

writeFile = open(write_file_path, 'w')
CoM = get_CoM(df)

writeFile.writelines("let drawing = [\n")

for index, row in df.iterrows():
    # Coordinates Translation
    trans_cords = np.array(row) - CoM
    x, y = trans_cords
    # File Writing
    line = f"{{ x: {x}, y: {y} }},\n"
    writeFile.writelines(line)


writeFile.writelines("]\n")

print('Success!')
