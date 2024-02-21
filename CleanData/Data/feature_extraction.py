import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# load data set from the csv file
try:
    df = pd.read_csv('Instant_datasets/11_data.csv')
except Exception as e:
    print(e)

def filter_respect_to_value(value , column , df = df):
    # filter the data with respect to the target
    df = df[df[f'{column}'] == value]
    shape = df.shape
    return df , shape


def chunk_data(df , chunk_size = 100):
    # chunk the data
    chunks = [df[i:i+chunk_size] for i in range(0,df.shape[0],chunk_size)]
    return chunks


column_keys = [
    "gyroX_mean", "gyroY_mean", "gyroZ_mean",
    "accelX_mean", "accelY_mean", "accelZ_mean",
    "gyroX_std", "gyroY_std", "gyroZ_std",
    "accelX_std", "accelY_std", "accelZ_std",
    "target_column"
]

latters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
local_feature_df = pd.DataFrame(columns = column_keys)
feature_df = pd.DataFrame(columns = column_keys)

for i in range(len(latters)):
    # filter the data with respect to the target
    df , shape = filter_respect_to_value(latters[i] , 'latter')
    # chunk the data
    chunks = chunk_data(df , 3)
    for i, chunk in enumerate(chunks, start=1):
        # Her bir alt DataFrame için istatistiksel özellikleri hesaplayın
        mean_values = chunk[['gyroX', 'gyroY', 'gyroZ', 'accelX', 'accelY', 'accelZ']].mean()
        std_values = chunk[['gyroX', 'gyroY', 'gyroZ', 'accelX', 'accelY', 'accelZ']].std()

        # Yeni satır verilerini oluşturun
        new_row_data = {
            "gyroX_mean": mean_values["gyroX"],
            "gyroY_mean": mean_values["gyroY"],
            "gyroZ_mean": mean_values["gyroZ"],
            "accelX_mean": mean_values["accelX"],
            "accelY_mean": mean_values["accelY"],
            "accelZ_mean": mean_values["accelZ"],
            "gyroX_std": std_values["gyroX"],
            "gyroY_std": std_values["gyroY"],
            "gyroZ_std": std_values["gyroZ"],
            "accelX_std": std_values["accelX"],
            "accelY_std": std_values["accelY"],
            "accelZ_std": std_values["accelZ"],
            "target_column": df.iloc[1, 1]  # Burada df yerine chunk kullanmanız gerekebilir
        }

        # Yeni satırı DataFrame'e ekleyin
        feature_df = pd.concat([feature_df, pd.DataFrame([new_row_data])], ignore_index=True)

feature_df.to_csv('Instant_datasets/feature.csv', index=False)


