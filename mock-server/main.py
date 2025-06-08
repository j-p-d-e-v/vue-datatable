from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()


app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)


@app.get("/ping")
def ping():
    return {"status": "Hello"}


@app.get("/data")
def data(page: int, limit: int):
    data = []
    with open("storage/test-data.json") as f:
        data = json.loads(f.read())

    start = (page - 1) * limit
    end = start + limit
    return {
        "page": page,
        "total": len(data),
        "limit": limit,
        "data": data[start:end],
    }
