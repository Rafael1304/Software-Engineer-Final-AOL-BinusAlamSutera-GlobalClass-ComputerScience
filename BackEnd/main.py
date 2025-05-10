from fastapi.responses import StreamingResponse, JSONResponse
from fastapi import FastAPI, UploadFile, File
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

last_summary = {}

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    global last_summary

    df = pd.read_csv(file.file)
    numeric_data = df.select_dtypes(include='number')
    scaler = StandardScaler()
    scaled = scaler.fit_transform(numeric_data)

    model = IsolationForest(n_estimators=100, contamination=0.1)
    df['anomaly'] = model.fit_predict(scaled)
    df['anomaly'] = df['anomaly'].map({1: 0, -1: 1})

    total_rows = int(len(df))
    anomaly_count = int(df['anomaly'].sum())
    percent = float(round((anomaly_count / total_rows) * 100, 2))

    last_summary = {
        "total_rows": total_rows,
        "anomalies": anomaly_count,
        "normals": int(total_rows - anomaly_count),
        "percent": percent,
        "message": f"{anomaly_count} anomalies out of {total_rows} entries."
    }

    plt.figure()
    sns.barplot(x=df['anomaly'].value_counts().index, y=df['anomaly'].value_counts().values)
    buf = BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    plt.close()

    return StreamingResponse(buf, media_type="image/png")

@app.get("/summary")
def get_summary():
    global last_summary
    if not last_summary:
        return JSONResponse(content={"message": "No data has been analyzed yet."}, status_code=404)
    return last_summary

@app.get("/reset")
def reset_analysis():
    global last_summary
    last_summary = {}
    return {"message": "Analysis reset."}
