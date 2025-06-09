from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from faker import Faker

app = FastAPI()
fake = Faker()

app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)


def data_generator(total_data: int):
    data = []
    for id in range(0, total_data):
        item = {
            "id": id,
            "name": fake.name(),
            "email": fake.free_email(),
            "role": "Admin",
            "status": "Active",
            "created_at": "2024-01-12",
        }
        data.append(item)
    return data


@app.get("/ping")
def ping():
    return {"status": "Hello"}


@app.get("/data")
def data(page: int, limit: int, search: str = ""):
    data = data_generator(100)

    data = [
        item
        for item in data
        if search in item["email"] or search in item["name"] or len(search) == 0
    ]

    start = (page - 1) * limit
    end = start + limit
    return {
        "page": page,
        "total": len(data),
        "limit": limit,
        "data": data[start:end],
    }
