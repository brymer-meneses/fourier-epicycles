import pandas as pd
import numpy as np
from os import path, listdir
from tqdm import tqdm


def get_CoM(df):
    N = df.shape[0]

    com_x, com_y = np.sum(df["x"])/N, np.sum(df["y"])/N

    return np.array([com_x, com_y])


dir_name = "drawing_csv"
files = listdir(dir_name)


# <============================ FILE CHECKING ======================================>
file_dir = None
if len(files) > 1:

    print("\nThere are many files in the directory: drawing_csv!")
    for file in files:
        print(f"\t- {file}")

    print("\t- Enter Q to exit the program.")
    while True:
        file = input("\nPlease type the name of the file you want to choose: ")

        file_dir = path.join(dir_name, file)

        if not(path.isfile(file_dir)):
            print("Invalid file name chose. Please try again.")
            continue
        elif file.lower() == "q":
            print("Quitting...")
        else:
            print(f"\t- Chosen File: {file}")
            break


df = pd.read_csv(file_dir)


# <============================ FILE CHECKING ======================================>

# <======================== COORDINATE TRANSLATION =================================>
translate = input('\nDo you want to translate the coordinates (y/n): ')

if translate.lower() == "y":
    CoM = get_CoM(df)
    processed_df = pd.DataFrame(columns=("x", "y"))
    temp_x = []
    temp_y = []

    print("\t- Translating Coordinates...")

    for index, row in df.iterrows():
        trans_cords = np.array(row) - CoM
        temp_x.append(trans_cords[0])
        temp_y.append(trans_cords[1])

    processed_df["x"] = temp_x
    processed_df["y"] = temp_y

    print("\t- Successfully translated the coordinates to the origin")

elif translate.lower() == "n":
    processed_df = df
# <======================== COORDINATE TRANSLATION =================================>


write_file_path = 'src/drawing.js'

if path.exists(write_file_path):
    print('\nThere is already a vector path that is generated.')

    decision = input('Overwrite the file? (y/n): ')

    if decision.lower() == "y":
        # Empties the content of the file
        print("\t- Deleting the content of drawing.js")
        open(write_file_path, 'w').close()

    elif decision.lower() == "n":
        print('\t- Quitting...')
        exit()

print('\t- Writing the coordinates...')
writeFile = open(write_file_path, 'w')

writeFile.writelines("let drawing = [\n")

for index, row in processed_df.iterrows():
    x, y = row
    line = f"{{ x: {x}, y: {y} }},\n"
    writeFile.writelines(line)
writeFile.writelines("]\n")

print('\t- Success!')

print("Path is ready to be displayed.")
