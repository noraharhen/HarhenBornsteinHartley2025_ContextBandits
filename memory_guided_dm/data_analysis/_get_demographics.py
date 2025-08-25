import numpy as np
import pandas as pd
import scipy.stats as stats
from glob import glob

def get_demographics(participants_to_include):
    dataframe = pd.read_csv("demographics.csv")
    dataframe = dataframe.query("participant_id in @participants_to_include")
    return dataframe

def get_age(participant_id):
    demo_df = pd.read_csv("demographics.csv")
    return demo_df.query("participant_id == @participant_id").Age.values[0]

def label_age_group (row):
    try:
        age = float(row['Age'])
        if age < 13:
            return 'child'
        elif age < 18:
            return 'adolescent'
        else:
            return 'adult'
    except:
        return np.nan


def get_group_stats(dataframe):
    return np.mean(dataframe.Age), np.min(dataframe.Age), np.max(dataframe.Age), dataframe.Gender.value_counts(), dataframe.Race.value_counts(), dataframe.Hispanic.value_counts()






